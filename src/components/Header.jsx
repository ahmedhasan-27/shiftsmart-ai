import React from 'react';
import { Users, LogOut } from 'lucide-react';

const Header = ({ currentUser, onLogout }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-3 rounded-lg">
            <Users className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">ShiftSmart AI</h1>
            <p className="text-gray-600">Healthcare Workforce Optimization Platform</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.role}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
            >
              <LogOut size={16} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
          <p className="text-sm text-gray-500">Active: Nursing Unit 3B</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
