# ShiftSmart AI

Healthcare Workforce Optimization Platform - A full-stack application for managing and optimizing healthcare staff scheduling using AI/ML.

## 🎯 Overview

ShiftSmart AI addresses inefficiencies in staff scheduling within mid-sized hospitals (100-500 beds) by using machine learning to forecast staffing demand and optimization techniques to generate schedules that balance patient safety, labor regulations, and staff preferences.

## ✨ Features

- **ML-Powered Demand Forecasting**: 7-day predictions using XGBoost simulation
- **AI-Optimized Scheduling**: Constraint-based optimization with OR-Tools simulation
- **Compliance Enforcement**: California Title 22 ratios, work hour limits, rest periods
- **Role-Based Access Control**: Different permissions for Operations Managers, Nurse Managers, and Clinical Staff
- **Analytics Dashboard**: KPI metrics and before/after comparisons
- **Approval Workflow**: Manager review and approval of generated schedules

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **API Integration**: RESTful API client

### Backend (FastAPI)
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL (SQLite for development)
- **Authentication**: JWT tokens
- **ML Services**: XGBoost forecasting, OR-Tools optimization (simulated)
- **API**: RESTful endpoints

## 📁 Project Structure

```
shiftsmart-ai/
├── src/                    # Frontend React app
│   ├── components/         # UI components
│   ├── services/           # API integration
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── data/               # Static data
│
├── backend/                # Backend FastAPI app
│   ├── app/
│   │   ├── routers/        # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── models.py       # Database models
│   │   ├── schemas.py      # Pydantic schemas
│   │   └── security.py     # Authentication
│   ├── scripts/
│   │   └── init_db.py      # Database initialization
│   └── requirements.txt
│
├── index.html
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+ (optional, SQLite for dev)

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database with sample data
python scripts/init_db.py

# Start server
uvicorn app.main:app --reload
```

The backend API will be available at `http://localhost:8000`

### Docker Setup (Optional)

```bash
cd backend
docker-compose up -d
```

## 🔐 Demo Accounts

1. **Operations Manager** (Full Access)
   - Email: `patricia.martinez@hospital.com`
   - Password: `admin123`

2. **Nurse Manager** (Schedule Generation & Approval)
   - Email: `jennifer.thompson@hospital.com`
   - Password: `nurse123`

3. **Clinical Staff** (View Only)
   - Email: `michael.rodriguez@hospital.com`
   - Password: `staff123`

## 📊 Success Metrics

### Target KPIs
- **Overtime Reduction**: 15% within 6 months
- **Staff Satisfaction**: 20% improvement
- **Coverage Rate**: 95% safe ratios maintained
- **Forecast Accuracy**: ±10% patient demand

### Current Performance (Simulated)
- Monthly Overtime: 900 hrs (↓ 25% from 1,200 hrs)
- Overtime Cost: $135,000/month (↓ $45,000 from $180,000)
- Staff Satisfaction: 4.0/5 (↑ from 3.2/5)
- Coverage Rate: 98%
- Schedule Rework Rate: 10% (↓ 67% from 30%)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
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

## 🛠️ Configuration

### Environment Variables

Create `.env` file in the root directory:
```
VITE_API_URL=http://localhost:8000/api
```

Create `backend/.env` file:
```
DATABASE_URL=sqlite:///./shiftsmart.db
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🧪 Testing

The application includes:
- API endpoint testing
- Component unit tests (to be added)
- Integration tests (to be added)

## 📈 Roadmap

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

## 🔒 Security & Compliance

- **HIPAA Considerations**: Encrypted data, RBAC, audit logging
- **Compliance Rules**: California Title 22 ratios, work hour limits
- **Authentication**: JWT-based secure authentication

## 📚 Documentation

See [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md) for complete technical documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

Proprietary - Healthcare Technology Platform

## 🆘 Support

For issues and questions, contact the development team.

---

**Version**: 1.0.0  
**Built with**: React, FastAPI, PostgreSQL, XGBoost, OR-Tools
