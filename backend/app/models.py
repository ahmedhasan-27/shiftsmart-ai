from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    permissions = Column(JSON, default=list)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class StaffMember(Base):
    __tablename__ = "staff_members"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)  # RN, LPN, CNA
    max_hours = Column(Integer, default=40)
    preferences = Column(JSON, default=list)  # ['day', 'evening', 'night']
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class HistoricalData(Base):
    __tablename__ = "historical_data"
    
    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime(timezone=True), nullable=False)
    patient_volume = Column(Integer, nullable=False)
    rn_count = Column(Integer)
    lpn_count = Column(Integer)
    cna_count = Column(Integer)
    overtime_hours = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Forecast(Base):
    __tablename__ = "forecasts"
    
    id = Column(Integer, primary_key=True, index=True)
    forecast_date = Column(DateTime(timezone=True), nullable=False)
    predicted_patient_volume = Column(Integer, nullable=False)
    confidence_interval = Column(JSON)  # {"lower": 270, "upper": 300}
    predicted_rn_needed = Column(Integer)
    predicted_lpn_needed = Column(Integer)
    predicted_cna_needed = Column(Integer)
    confidence_score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Schedule(Base):
    __tablename__ = "schedules"
    
    id = Column(Integer, primary_key=True, index=True)
    schedule_date = Column(DateTime(timezone=True), nullable=False)
    status = Column(String, default="pending")  # pending, approved, rejected
    compliance_score = Column(Float)
    total_staff_scheduled = Column(Integer)
    created_by = Column(Integer, ForeignKey("users.id"))
    approved_by = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    shifts = relationship("Shift", back_populates="schedule")

class Shift(Base):
    __tablename__ = "shifts"
    
    id = Column(Integer, primary_key=True, index=True)
    schedule_id = Column(Integer, ForeignKey("schedules.id"), nullable=False)
    shift_type = Column(String, nullable=False)  # Day, Evening, Night
    shift_time = Column(String)  # "7AM-3PM"
    rn_assignments = Column(JSON)  # List of staff IDs
    lpn_assignments = Column(JSON)
    cna_assignments = Column(JSON)
    
    schedule = relationship("Schedule", back_populates="shifts")

class Analytics(Base):
    __tablename__ = "analytics"
    
    id = Column(Integer, primary_key=True, index=True)
    metric_name = Column(String, nullable=False)
    metric_value = Column(Float, nullable=False)
    metric_type = Column(String)  # overtime, satisfaction, coverage, cost
    period_start = Column(DateTime(timezone=True))
    period_end = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
