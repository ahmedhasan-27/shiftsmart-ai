from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List
from app.database import get_db
from app import models, schemas, security
from app.services.forecasting_service import forecasting_service

router = APIRouter()

@router.post("/predict", response_model=List[schemas.ForecastResponse])
async def predict_demand(
    forecast_request: schemas.ForecastRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Generate demand forecasts for the specified date range
    """
    try:
        forecasts = forecasting_service.predict_demand(
            start_date=forecast_request.start_date,
            end_date=forecast_request.end_date
        )
        
        # Optionally save forecasts to database
        for forecast in forecasts:
            db_forecast = models.Forecast(
                forecast_date=forecast.forecast_date,
                predicted_patient_volume=forecast.predicted_patient_volume,
                confidence_interval=forecast.confidence_interval,
                predicted_rn_needed=forecast.predicted_rn_needed,
                predicted_lpn_needed=forecast.predicted_lpn_needed,
                predicted_cna_needed=forecast.predicted_cna_needed,
                confidence_score=forecast.confidence_score
            )
            db.add(db_forecast)
        
        db.commit()
        return forecasts
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Forecast generation failed: {str(e)}")

@router.get("/insights")
async def get_forecast_insights(
    start_date: datetime,
    end_date: datetime,
    current_user: models.User = Depends(security.get_current_user)
):
    """
    Get insights and recommendations from forecasts
    """
    forecasts = forecasting_service.predict_demand(start_date, end_date)
    insights = forecasting_service.get_forecast_insights(forecasts)
    return insights
