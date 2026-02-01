"""
Initialize database with sample data
"""
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app import models, security

# Create tables
Base.metadata.create_all(bind=engine)

def init_db():
    db = SessionLocal()
    
    try:
        # Create default users
        users_data = [
            {
                "email": "patricia.martinez@hospital.com",
                "password": "admin123",
                "name": "Dr. Patricia Martinez",
                "role": "Hospital Operations Manager",
                "permissions": ["view_all", "approve_schedules", "generate_schedules", "view_analytics"]
            },
            {
                "email": "jennifer.thompson@hospital.com",
                "password": "nurse123",
                "name": "Jennifer Thompson, RN",
                "role": "Nurse Manager",
                "permissions": ["view_schedules", "approve_schedules", "generate_schedules"]
            },
            {
                "email": "michael.rodriguez@hospital.com",
                "password": "staff123",
                "name": "Michael Rodriguez",
                "role": "Clinical Staff",
                "permissions": ["view_schedules"]
            }
        ]
        
        for user_data in users_data:
            existing_user = db.query(models.User).filter(
                models.User.email == user_data["email"]
            ).first()
            
            if not existing_user:
                hashed_password = security.get_password_hash(user_data["password"])
                user = models.User(
                    email=user_data["email"],
                    hashed_password=hashed_password,
                    name=user_data["name"],
                    role=user_data["role"],
                    permissions=user_data["permissions"]
                )
                db.add(user)
        
        # Create sample staff members
        staff_data = [
            {"name": "Sarah Johnson", "role": "RN", "max_hours": 40, "preferences": ["day", "evening"]},
            {"name": "Michael Chen", "role": "RN", "max_hours": 36, "preferences": ["night"]},
            {"name": "Emily Davis", "role": "RN", "max_hours": 40, "preferences": ["day"]},
            {"name": "James Wilson", "role": "LPN", "max_hours": 40, "preferences": ["evening"]},
            {"name": "Maria Garcia", "role": "LPN", "max_hours": 32, "preferences": ["day", "evening"]},
            {"name": "David Brown", "role": "CNA", "max_hours": 40, "preferences": ["day"]},
            {"name": "Lisa Anderson", "role": "CNA", "max_hours": 40, "preferences": ["night"]},
            {"name": "Robert Taylor", "role": "RN", "max_hours": 40, "preferences": ["evening", "night"]},
        ]
        
        for staff_info in staff_data:
            existing_staff = db.query(models.StaffMember).filter(
                models.StaffMember.name == staff_info["name"]
            ).first()
            
            if not existing_staff:
                staff = models.StaffMember(**staff_info)
                db.add(staff)
        
        db.commit()
        print("Database initialized successfully!")
        
    except Exception as e:
        db.rollback()
        print(f"Error initializing database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
