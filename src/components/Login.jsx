import React, { useState } from 'react';
import { Users, Shield } from 'lucide-react';

const Login = ({ onLogin, onQuickLogin }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    const result = onLogin(loginEmail, loginPassword);
    
    if (!result.success) {
      setLoginError(result.error);
    } else {
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 p-4 rounded-full inline-block mb-4">
            <Users className="text-white" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ShiftSmart AI</h1>
          <p className="text-gray-600">Healthcare Workforce Optimization</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
          <p className="font-semibold mb-1">💡 Manual Login Tip:</p>
          <p>Copy and paste the credentials exactly as shown, or use the quick login buttons below for instant access.</p>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-3">Demo Accounts - Click to Login:</p>
          <div className="space-y-2 text-xs text-gray-600">
            <button
              onClick={() => onQuickLogin(0)}
              className="w-full bg-white p-3 rounded hover:bg-indigo-50 hover:border-indigo-300 border border-gray-200 text-left transition"
            >
              <p className="font-medium text-gray-800">Operations Manager</p>
              <p className="text-gray-600">patricia.martinez@hospital.com / admin123</p>
            </button>
            <button
              onClick={() => onQuickLogin(1)}
              className="w-full bg-white p-3 rounded hover:bg-indigo-50 hover:border-indigo-300 border border-gray-200 text-left transition"
            >
              <p className="font-medium text-gray-800">Nurse Manager</p>
              <p className="text-gray-600">jennifer.thompson@hospital.com / nurse123</p>
            </button>
            <button
              onClick={() => onQuickLogin(2)}
              className="w-full bg-white p-3 rounded hover:bg-indigo-50 hover:border-indigo-300 border border-gray-200 text-left transition"
            >
              <p className="font-medium text-gray-800">Clinical Staff (View Only)</p>
              <p className="text-gray-600">michael.rodriguez@hospital.com / staff123</p>
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Shield size={16} />
          <p>HIPAA Compliant • Encrypted Connection</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
