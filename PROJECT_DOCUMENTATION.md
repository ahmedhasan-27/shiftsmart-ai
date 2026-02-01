# ShiftSmart AI - Complete Project Documentation

## Executive Summary

ShiftSmart AI is a healthcare workforce optimization platform designed to address inefficiencies in staff scheduling within mid-sized hospitals (100-500 beds). The platform uses machine learning to forecast staffing demand and optimization techniques to generate schedules that balance patient safety, labor regulations, and staff preferences.

## Project Structure

```
shiftsmart-ai/
├── frontend/ (React)
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── services/     # API integration
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── data/          # Static data
│   ├── package.json
│   └── vite.config.js
│
├── backend/ (FastAPI)
│   ├── app/
│   │   ├── routers/       # API endpoints
│   │   ├── services/      # Business logic (ML, optimization)
│   │   ├── models.py      # Database models
│   │   ├── schemas.py     # Pydantic schemas
│   │   └── security.py    # Authentication
│   ├── scripts/
│   │   └── init_db.py     # Database initialization
│   ├── requirements.txt
│   └── Dockerfile
│
└── docs/                   # Additional documentation
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons

### Backend
- **Python 3.11** - Programming language
- **FastAPI** - Web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching (optional)
- **XGBoost** - ML forecasting (simulated)
- **OR-Tools** - Schedule optimization (simulated)

### Infrastructure
- **Docker** - Containerization
- **AWS** - Cloud deployment (ECS, RDS)
- **CloudWatch** - Monitoring

## Features

### MVP Features
1. **Staff Demand Forecasting**
   - 7-day demand prediction
   - ML-powered using XGBoost
   - Confidence intervals and insights

2. **Automated Schedule Generation**
   - AI-optimized shift assignments
   - Compliance rule enforcement
   - Staff preference consideration

3. **Manual Override & Approval**
   - Review generated schedules
   - Approve/reject workflow
   - Manager oversight

4. **Compliance Enforcement**
   - California Title 22 ratios
   - Maximum hours per week
   - Minimum rest periods
   - Skill mix requirements

5. **Analytics Dashboard**
   - KPI metrics
   - Before/after comparisons
   - Performance tracking

### Excluded from MVP
- Mobile app
- Real-time shift swapping
- Payroll integration
- Multi-hospital support

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Forecasting
- `POST /api/forecasting/predict` - Generate demand forecasts
- `GET /api/forecasting/insights` - Get forecast insights

### Scheduling
- `POST /api/scheduling/generate` - Generate optimized schedule
- `POST /api/scheduling/approve` - Approve/reject schedule
- `GET /api/scheduling/` - List schedules
- `GET /api/scheduling/compliance-rules` - Get compliance rules

### Analytics
- `GET /api/analytics/kpi` - Get KPI metrics
- `GET /api/analytics/comparison` - Get before/after comparison

## Database Schema

### Tables
- `users` - User accounts and permissions
- `staff_members` - Staff pool information
- `historical_data` - Historical patient/staffing data
- `forecasts` - Generated forecasts
- `schedules` - Generated schedules
- `shifts` - Individual shift assignments
- `analytics` - Performance metrics

## Installation & Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+ (optional, SQLite for dev)
- Docker (optional)

### Frontend Setup
```bash
cd shiftsmart-ai
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Initialize database
python scripts/init_db.py

# Run server
uvicorn app.main:app --reload
```

### Docker Setup
```bash
cd backend
docker-compose up -d
```

## Configuration

### Environment Variables

**Frontend (.env)**
```
VITE_API_URL=http://localhost:8000/api
```

**Backend (.env)**
```
DATABASE_URL=sqlite:///./shiftsmart.db
SECRET_KEY=your-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Success Metrics

### Target KPIs
- **Overtime Reduction**: 15% within 6 months
- **Staff Satisfaction**: 20% improvement
- **Coverage Rate**: 95% safe ratios maintained
- **Forecast Accuracy**: ±10% patient demand
- **Schedule Approval Rate**: 90%
- **System Uptime**: 99.5%

### Current Performance (Simulated)
- Monthly Overtime: 900 hrs (down from 1,200 hrs)
- Overtime Cost: $135,000/month (down from $180,000)
- Staff Satisfaction: 4.0/5 (up from 3.2/5)
- Coverage Rate: 98%
- Schedule Rework Rate: 10% (down from 30%)

## Security & Compliance

### HIPAA Considerations
- Encrypted data at rest and in transit
- Role-based access control (RBAC)
- Audit logging
- Secure authentication (JWT)

### Compliance Rules
- California Title 22 nurse-to-patient ratios
- Maximum 40-hour work week
- Minimum 8-hour rest between shifts
- Required skill mix per shift

## Deployment

### Development
- Frontend: `npm run dev` (Vite dev server)
- Backend: `uvicorn app.main:app --reload`

### Production (AWS)
1. **Frontend**: Build and deploy to S3 + CloudFront
2. **Backend**: Deploy to ECS (Fargate)
3. **Database**: RDS PostgreSQL
4. **Caching**: ElastiCache (Redis)
5. **Monitoring**: CloudWatch

### Scaling Plan
- **Phase 1**: 100 users (single hospital)
- **Phase 2**: 1,000 users (multi-department)
- **Phase 3**: 10,000 users (multi-hospital)

## Testing

### Methodology
- Historical backtesting (12 months of data)
- A/B testing AI vs manual schedules
- Pilot with 2 hospital departments
- Load testing for performance

### Test Coverage
- API endpoint testing
- Component unit tests
- Integration tests
- E2E user flow tests

## Roadmap

### V2 Features (3 Months)
- Staff preference learning
- Real-time schedule adjustments
- Mobile app access
- Enhanced analytics

### 1-Year Roadmap
- Multi-role scheduling
- Predictive burnout detection
- Payroll and HR system integration
- Advanced ML model improvements

## Demo Accounts

1. **Operations Manager**
   - Email: patricia.martinez@hospital.com
   - Password: admin123
   - Permissions: Full access

2. **Nurse Manager**
   - Email: jennifer.thompson@hospital.com
   - Password: nurse123
   - Permissions: Schedule generation and approval

3. **Clinical Staff**
   - Email: michael.rodriguez@hospital.com
   - Password: staff123
   - Permissions: View only

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Proprietary - Healthcare Technology Platform

## Support

For issues and questions, contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: January 2026
