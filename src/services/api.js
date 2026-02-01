/**
 * API Service for ShiftSmart AI
 * Handles all backend API calls
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('access_token');
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (this.token) {
      config.headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          this.setToken(null);
          throw new Error('Authentication failed');
        }
        const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Login failed' }));
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    this.setToken(data.access_token);
    return data;
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Forecasting endpoints
  async getForecast(startDate, endDate) {
    return this.request('/forecasting/predict', {
      method: 'POST',
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate,
      }),
    });
  }

  async getForecastInsights(startDate, endDate) {
    const params = new URLSearchParams({
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    });
    return this.request(`/forecasting/insights?${params}`);
  }

  // Scheduling endpoints
  async generateSchedule(scheduleDate, targetComplianceScore = 95.0) {
    return this.request('/scheduling/generate', {
      method: 'POST',
      body: JSON.stringify({
        schedule_date: scheduleDate,
        target_compliance_score: targetComplianceScore,
      }),
    });
  }

  async approveSchedule(scheduleId, approved, notes = null) {
    return this.request('/scheduling/approve', {
      method: 'POST',
      body: JSON.stringify({
        schedule_id: scheduleId,
        approved,
        notes,
      }),
    });
  }

  async getSchedules(skip = 0, limit = 100) {
    const params = new URLSearchParams({ skip, limit });
    return this.request(`/scheduling/?${params}`);
  }

  async getComplianceRules() {
    return this.request('/scheduling/compliance-rules');
  }

  // Analytics endpoints
  async getKPIMetrics() {
    return this.request('/analytics/kpi');
  }

  async getBeforeAfterComparison() {
    return this.request('/analytics/comparison');
  }
}

export default new ApiService();
