import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import api from '../services/api';

const Dashboard = ({ currentUser }) => {
  const [kpiMetrics, setKpiMetrics] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    try {
      const [kpi, comp] = await Promise.all([
        api.getKPIMetrics(),
        api.getBeforeAfterComparison()
      ]);
      setKpiMetrics(kpi);
      setComparison(comp);
    } catch (err) {
      console.error('Failed to load metrics:', err);
      // Use default values
      setKpiMetrics({
        monthly_overtime_hours: 900,
        overtime_cost: 135000,
        staff_satisfaction_score: 4.0,
        coverage_rate: 98,
        schedule_rework_rate: 10
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="space-y-6">
      {/* Role-based welcome message */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {currentUser.name.split(' ')[0]}!</h2>
        <p className="opacity-90">Role: {currentUser.role}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {currentUser.permissions.map(perm => (
            <span key={perm} className="bg-white bg-opacity-20 px-3 py-1 rounded text-sm">
              {perm.replace('_', ' ').toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Monthly Overtime</p>
              <p className="text-2xl font-bold text-gray-800">900 hrs</p>
              <p className="text-green-600 text-sm">↓ 25% reduction</p>
            </div>
            <Clock className="text-indigo-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Cost Savings</p>
              <p className="text-2xl font-bold text-gray-800">$45K</p>
              <p className="text-green-600 text-sm">vs manual scheduling</p>
            </div>
            <DollarSign className="text-green-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Staff Satisfaction</p>
              <p className="text-2xl font-bold text-gray-800">4.0 / 5</p>
              <p className="text-green-600 text-sm">↑ 20% improvement</p>
            </div>
            <TrendingUp className="text-blue-600" size={32} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Coverage Rate</p>
              <p className="text-2xl font-bold text-gray-800">98%</p>
              <p className="text-green-600 text-sm">Safe ratios maintained</p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Before vs After AI Implementation</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Metric</th>
                <th className="text-left p-3">Before AI</th>
                <th className="text-left p-3">After ShiftSmart AI</th>
                <th className="text-left p-3">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {comparison?.metrics ? (
                comparison.metrics.map((metric, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{metric.metric}</td>
                    <td className="p-3">{metric.before}</td>
                    <td className="p-3 text-green-600 font-semibold">{metric.after}</td>
                    <td className="p-3 text-green-600">{metric.improvement}</td>
                  </tr>
                ))
              ) : (
                <>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">Monthly Overtime Hours</td>
                    <td className="p-3">1,200 hrs</td>
                    <td className="p-3 text-green-600 font-semibold">900 hrs</td>
                    <td className="p-3 text-green-600">-25%</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">Overtime Cost/Month</td>
                    <td className="p-3">$180,000</td>
                    <td className="p-3 text-green-600 font-semibold">$135,000</td>
                    <td className="p-3 text-green-600">-$45,000</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">Staff Satisfaction Score</td>
                    <td className="p-3">3.2 / 5</td>
                    <td className="p-3 text-green-600 font-semibold">4.0 / 5</td>
                    <td className="p-3 text-green-600">+25%</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">Schedule Rework Rate</td>
                    <td className="p-3">30%</td>
                    <td className="p-3 text-green-600 font-semibold">10%</td>
                    <td className="p-3 text-green-600">-67%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">Patient Coverage Gaps</td>
                    <td className="p-3">Frequent</td>
                    <td className="p-3 text-green-600 font-semibold">Rare</td>
                    <td className="p-3 text-green-600">95% coverage</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
