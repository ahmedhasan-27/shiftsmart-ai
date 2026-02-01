from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app import models, schemas, security

router = APIRouter()

@router.get("/kpi", response_model=schemas.KPIMetrics)
async def get_kpi_metrics(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Get KPI metrics for dashboard
    """
    # In production, these would be calculated from actual data
    # For now, return simulated metrics matching the spec
    return schemas.KPIMetrics(
        monthly_overtime_hours=900.0,
        overtime_cost=135000.0,
        staff_satisfaction_score=4.0,
        coverage_rate=98.0,
        schedule_rework_rate=10.0
    )

@router.get("/comparison")
async def get_before_after_comparison(
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Get before/after comparison metrics
    """
    return {
        "metrics": [
            {
                "metric": "Monthly Overtime Hours",
                "before": "1,200 hrs",
                "after": "900 hrs",
                "improvement": "-25%"
            },
            {
                "metric": "Overtime Cost/Month",
                "before": "$180,000",
                "after": "$135,000",
                "improvement": "-$45,000"
            },
            {
                "metric": "Staff Satisfaction Score",
                "before": "3.2 / 5",
                "after": "4.0 / 5",
                "improvement": "+25%"
            },
            {
                "metric": "Schedule Rework Rate",
                "before": "30%",
                "after": "10%",
                "improvement": "-67%"
            },
            {
                "metric": "Patient Coverage Gaps",
                "before": "Frequent",
                "after": "Rare",
                "improvement": "95% coverage"
            }
        ]
    }
