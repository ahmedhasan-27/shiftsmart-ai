# 🚀 Quick Start Guide - ShiftSmart AI

## Frontend Development Server

The development server is now running! Here's what you need to know:

### ✅ Server Status
The Vite development server should be starting up. Once ready, you can access the application at:

**🌐 http://localhost:5173**

### 📋 Manual Start Instructions

If you need to start the server manually in the future:

```bash
# Navigate to project directory
cd C:\Users\syeda\shiftsmart-ai

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

### 🎯 What to Expect

1. **Login Screen**: You'll see the ShiftSmart AI login page
2. **Demo Accounts**: Use the quick login buttons or enter credentials:
   - **Operations Manager**: patricia.martinez@hospital.com / admin123
   - **Nurse Manager**: jennifer.thompson@hospital.com / nurse123
   - **Clinical Staff**: michael.rodriguez@hospital.com / staff123

3. **Features Available**:
   - ✅ Dashboard with KPI metrics
   - ✅ Demand Forecast (7-day predictions)
   - ✅ Schedule Generator (AI-optimized)
   - ✅ Approval Workflow

### 🔧 Troubleshooting

**If the server doesn't start:**
```bash
# Make sure dependencies are installed
npm install

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Then start again
npm run dev
```

**If you see port conflicts:**
- Vite will automatically try the next available port (5174, 5175, etc.)
- Check the terminal output for the actual URL

### 🌐 Backend (Optional)

The frontend works standalone with demo data. To run the full-stack application:

```bash
# Terminal 1: Frontend (already running)
npm run dev

# Terminal 2: Backend
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python scripts/init_db.py
uvicorn app.main:app --reload
```

Backend API will be at: **http://localhost:8000**

### 📱 Testing the Application

1. **Login**: Use any of the demo accounts
2. **Dashboard**: View metrics and comparisons
3. **Forecast**: See 7-day demand predictions
4. **Schedule Generator**: Generate AI-optimized schedules
5. **Approval**: Review and approve generated schedules

### 🛑 Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

---

**Note**: The application works in demo mode without the backend. All features are functional with simulated data.
