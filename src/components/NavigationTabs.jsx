import React from 'react';
import { hasPermission } from '../utils/permissions';

const NavigationTabs = ({ activeTab, setActiveTab, currentUser }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg mb-6">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-6 py-3 font-medium ${activeTab === 'dashboard' 
            ? 'text-indigo-600 border-b-2 border-indigo-600' 
            : 'text-gray-600 hover:text-indigo-600'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('forecast')}
          className={`px-6 py-3 font-medium ${activeTab === 'forecast' 
            ? 'text-indigo-600 border-b-2 border-indigo-600' 
            : 'text-gray-600 hover:text-indigo-600'}`}
        >
          Demand Forecast
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          disabled={!hasPermission(currentUser, 'generate_schedules')}
          className={`px-6 py-3 font-medium ${
            !hasPermission(currentUser, 'generate_schedules') 
              ? 'text-gray-400 cursor-not-allowed' 
              : activeTab === 'schedule' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600'
          }`}
        >
          Schedule Generator
          {!hasPermission(currentUser, 'generate_schedules') && <span className="ml-2 text-xs">🔒</span>}
        </button>
        <button
          onClick={() => setActiveTab('approval')}
          disabled={!hasPermission(currentUser, 'approve_schedules')}
          className={`px-6 py-3 font-medium ${
            !hasPermission(currentUser, 'approve_schedules') 
              ? 'text-gray-400 cursor-not-allowed' 
              : activeTab === 'approval' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-600 hover:text-indigo-600'
          }`}
        >
          Review & Approve
          {!hasPermission(currentUser, 'approve_schedules') && <span className="ml-2 text-xs">🔒</span>}
        </button>
      </div>
    </div>
  );
};

export default NavigationTabs;
