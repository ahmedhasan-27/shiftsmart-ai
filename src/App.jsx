import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Login from './components/Login';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import Dashboard from './components/Dashboard';
import Forecast from './components/Forecast';
import ScheduleGenerator from './components/ScheduleGenerator';
import Approval from './components/Approval';

function App() {
  const { isAuthenticated, currentUser, login, quickLogin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scheduleData, setScheduleData] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState({});

  const handleLogin = (email, password) => {
    return login(email, password);
  };

  const handleQuickLogin = (userIndex) => {
    quickLogin(userIndex);
  };

  const handleLogout = () => {
    logout();
    setActiveTab('dashboard');
    setScheduleData(null);
    setApprovalStatus({});
  };

  const handleApprove = (shiftIndex) => {
    setApprovalStatus({...approvalStatus, [shiftIndex]: 'approved'});
  };

  const handleReject = (shiftIndex) => {
    setApprovalStatus({...approvalStatus, [shiftIndex]: 'rejected'});
  };

  // Update scheduleData when it's generated from ScheduleGenerator
  const handleScheduleGenerated = (schedule) => {
    setScheduleData(schedule);
    setApprovalStatus({}); // Reset approval status when new schedule is generated
  };

  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={handleLogin} 
        onQuickLogin={handleQuickLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-6">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        
        <NavigationTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          currentUser={currentUser}
        />

        {activeTab === 'dashboard' && (
          <Dashboard currentUser={currentUser} />
        )}

        {activeTab === 'forecast' && (
          <Forecast />
        )}

        {activeTab === 'schedule' && (
          <ScheduleGenerator onScheduleGenerated={handleScheduleGenerated} />
        )}

        {activeTab === 'approval' && (
          <Approval 
            scheduleData={scheduleData}
            approvalStatus={approvalStatus}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}
      </div>
    </div>
  );
}

export default App;
