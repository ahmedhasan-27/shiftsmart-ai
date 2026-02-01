from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str
    permissions: List[str] = []

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginRequest(BaseModel):
    email: str
    password: str

# Staff Schemas
class StaffMemberBase(BaseModel):
    name: str
    role: str
    max_hours: int = 40
    preferences: List[str] = []

class StaffMemberCreate(StaffMemberBase):
    pass

class StaffMemberResponse(StaffMemberBase):
    id: int
    is_active: bool
    
    class Config:
        from_attributes = True

# Forecast Schemas
class ForecastRequest(BaseModel):
    start_date: datetime
    end_date: datetime

class ForecastResponse(BaseModel):
    forecast_date: datetime
    predicted_patient_volume: int
    confidence_interval: Dict[str, int]
    predicted_rn_needed: int
    predicted_lpn_needed: int
    predicted_cna_needed: int
    confidence_score: float

# Schedule Schemas
class ShiftAssignment(BaseModel):
    shift_type: str
    shift_time: str
    rn_assignments: List[int]
    lpn_assignments: List[int]
    cna_assignments: List[int]

class ScheduleGenerateRequest(BaseModel):
    schedule_date: datetime
    target_compliance_score: float = 95.0

class ScheduleResponse(BaseModel):
    id: int
    schedule_date: datetime
    status: str
    compliance_score: float
    total_staff_scheduled: int
    shifts: List[ShiftAssignment]
    created_at: datetime

class ScheduleApproveRequest(BaseModel):
    schedule_id: int
    approved: bool
    notes: Optional[str] = None

# Analytics Schemas
class AnalyticsResponse(BaseModel):
    metric_name: str
    metric_value: float
    metric_type: str
    period_start: datetime
    period_end: datetime

class KPIMetrics(BaseModel):
    monthly_overtime_hours: float
    overtime_cost: float
    staff_satisfaction_score: float
    coverage_rate: float
    schedule_rework_rate: float
