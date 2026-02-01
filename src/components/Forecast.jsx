import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Forecast = () => {
  const [forecasts, setForecasts] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadForecasts();
  }, []);

  const loadForecasts = async () => {
    try {
      setLoading(true);
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      
      const forecastData = await api.getForecast(startDate.toISOString(), endDate.toISOString());
      setForecasts(forecastData);
      
      const insightsData = await api.getForecastInsights(startDate, endDate);
      setInsights(insightsData);
    } catch (err) {
      console.error('Failed to load forecasts:', err);
      setError(err.message);
      // Fallback to demo data
      setForecasts([
        {
          forecast_date: new Date().toISOString(),
          predicted_patient_volume: 285,
          confidence_interval: { lower: 270, upper: 300 },
          predicted_rn_needed: 12,
          predicted_lpn_needed: 6,
          predicted_cna_needed: 8,
          confidence_score: 92
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const getBackgroundColor = (volume, avgVolume = 285) => {
    if (volume > avgVolume * 1.05) return 'bg-yellow-50';
    if (volume < avgVolume * 0.95) return 'bg-gray-50';
    return 'bg-blue-50';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p>Loading forecasts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">7-Day Demand Forecast</h3>
        <p className="text-gray-600 mb-6">ML-powered prediction using XGBoost analysis of historical patient volume, seasonal trends, and staffing patterns</p>
        
        {error && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
            Note: Using demo data. Backend API not available.
          </div>
        )}
        
        <div className="space-y-4">
          {forecasts.map((forecast, idx) => {
            const avgVolume = insights?.average_volume || 285;
            const bgColor = getBackgroundColor(forecast.predicted_patient_volume, avgVolume);
            const isHighDemand = forecast.predicted_patient_volume > avgVolume * 1.05;
            
            return (
              <div key={idx} className={`flex items-center justify-between p-4 ${bgColor} rounded`}>
                <div>
                  <p className="font-semibold">{formatDate(forecast.forecast_date)}</p>
                  <p className="text-sm text-gray-600">
                    Expected Patient Volume: {forecast.predicted_patient_volume} ± {Math.round((forecast.confidence_interval.upper - forecast.confidence_interval.lower) / 2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isHighDemand ? 'text-orange-600' : 'text-indigo-600'}`}>
                    RN: {forecast.predicted_rn_needed} | LPN: {forecast.predicted_lpn_needed} | CNA: {forecast.predicted_cna_needed}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isHighDemand && '⚠ Higher than avg | '}Confidence: {Math.round(forecast.confidence_score)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {insights && (
          <div className="mt-6 p-4 bg-indigo-50 rounded">
            <h4 className="font-semibold mb-2">Forecast Insights</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              {insights.recommendations?.map((rec, idx) => (
                <li key={idx}>• {rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast;
