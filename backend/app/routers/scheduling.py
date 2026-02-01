from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security
from app.services.optimization_service import optimization_service
from app.services.forecasting_service import forecasting_service
from datetime import datetime

router = APIRouter()

@router.post("/generate", response_model=schemas.ScheduleResponse)
async def generate_schedule(
    request: schemas.ScheduleGenerateRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Generate an optimized schedule for the specified date
    """
    # Check permissions
    if 'generate_schedules' not in current_user.permissions:
        raise HTTPException(
            status_code=403,
            detail="Insufficient permissions to generate schedules"
        )
    
    try:
        # Get staff pool
        staff_members = db.query(models.StaffMember).filter(
            models.StaffMember.is_active == True
        ).all()
        
        staff_pool = [
            {
                "id": s.id,
                "name": s.name,
                "role": s.role,
                "max_hours": s.max_hours,
                "preferences": s.preferences
            }
            for s in staff_members
        ]
        
        # Get forecast for the date
        forecasts = forecasting_service.predict_demand(
            request.schedule_date,
            request.schedule_date
        )
        forecast_data = forecasts[0] if forecasts else None
        
        # Generate optimized schedule
        schedule_data = optimization_service.generate_optimized_schedule(
            schedule_date=request.schedule_date,
            staff_pool=staff_pool,
            forecast_data={
                "predicted_patient_volume": forecast_data.predicted_patient_volume if forecast_data else 285
            } if forecast_data else None,
            target_compliance_score=request.target_compliance_score
        )
        
        # Save to database
        db_schedule = models.Schedule(
            schedule_date=schedule_data["schedule_date"],
            status=schedule_data["status"],
            compliance_score=schedule_data["compliance_score"],
            total_staff_scheduled=schedule_data["total_staff_scheduled"],
            created_by=current_user.id
        )
        db.add(db_schedule)
        db.flush()
        
        # Save shifts
        for shift in schedule_data["shifts"]:
            db_shift = models.Shift(
                schedule_id=db_schedule.id,
                shift_type=shift.shift_type,
                shift_time=shift.shift_time,
                rn_assignments=shift.rn_assignments,
                lpn_assignments=shift.lpn_assignments,
                cna_assignments=shift.cna_assignments
            )
            db.add(db_shift)
        
        db.commit()
        db.refresh(db_schedule)
        
        # Load shifts for response
        shifts = db.query(models.Shift).filter(
            models.Shift.schedule_id == db_schedule.id
        ).all()
        
        shift_assignments = [
            schemas.ShiftAssignment(
                shift_type=s.shift_type,
                shift_time=s.shift_time,
                rn_assignments=s.rn_assignments,
                lpn_assignments=s.lpn_assignments,
                cna_assignments=s.cna_assignments
            )
            for s in shifts
        ]
        
        return schemas.ScheduleResponse(
            id=db_schedule.id,
            schedule_date=db_schedule.schedule_date,
            status=db_schedule.status,
            compliance_score=db_schedule.compliance_score,
            total_staff_scheduled=db_schedule.total_staff_scheduled,
            shifts=shift_assignments,
            created_at=db_schedule.created_at
        )
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Schedule generation failed: {str(e)}")

@router.post("/approve")
async def approve_schedule(
    request: schemas.ScheduleApproveRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Approve or reject a schedule
    """
    if 'approve_schedules' not in current_user.permissions:
        raise HTTPException(
            status_code=403,
            detail="Insufficient permissions to approve schedules"
        )
    
    schedule = db.query(models.Schedule).filter(
        models.Schedule.id == request.schedule_id
    ).first()
    
    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    
    schedule.status = "approved" if request.approved else "rejected"
    schedule.approved_by = current_user.id
    
    db.commit()
    
    return {"message": "Schedule updated successfully", "status": schedule.status}

@router.get("/", response_model=List[schemas.ScheduleResponse])
async def get_schedules(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Get list of schedules
    """
    schedules = db.query(models.Schedule).offset(skip).limit(limit).all()
    
    result = []
    for schedule in schedules:
        shifts = db.query(models.Shift).filter(
            models.Shift.schedule_id == schedule.id
        ).all()
        
        shift_assignments = [
            schemas.ShiftAssignment(
                shift_type=s.shift_type,
                shift_time=s.shift_time,
                rn_assignments=s.rn_assignments,
                lpn_assignments=s.lpn_assignments,
                cna_assignments=s.cna_assignments
            )
            for s in shifts
        ]
        
        result.append(schemas.ScheduleResponse(
            id=schedule.id,
            schedule_date=schedule.schedule_date,
            status=schedule.status,
            compliance_score=schedule.compliance_score,
            total_staff_scheduled=schedule.total_staff_scheduled,
            shifts=shift_assignments,
            created_at=schedule.created_at
        ))
    
    return result

@router.get("/compliance-rules")
async def get_compliance_rules(
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Get list of compliance rules enforced
    """
    return {
        "rules": optimization_service.get_compliance_rules_enforced()
    }
