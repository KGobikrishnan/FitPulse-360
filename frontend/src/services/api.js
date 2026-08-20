import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Bearer Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fitpulse_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Session Expiry globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Session expired or unauthorized. Logging out...');
      localStorage.removeItem('fitpulse_jwt_token');
      localStorage.removeItem('fitpulse_current_user_v3');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Authentication
  login: async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.data && res.data.data && res.data.data.token) {
        localStorage.setItem('fitpulse_jwt_token', res.data.data.token);
      }
      return res.data.data || res.data;
    } catch (e) {
      console.warn('Backend login error:', e);
      return null;
    }
  },

  register: async (userData) => {
    const res = await apiClient.post('/auth/register', userData);
    return res.data;
  },

  // Admin Dashboard Data
  getAdminOverview: async () => {
    try {
      const res = await apiClient.get('/admin/overview');
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },

  getMembersPaged: async (page = 0, size = 20) => {
    try {
      const res = await apiClient.get(`/admin/members?page=${page}&size=${size}`);
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },

  enrollMember: async (memberData) => {
    try {
      const res = await apiClient.post('/admin/members/enroll', memberData);
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },

  updateMemberStatus: async (memberId, status) => {
    try {
      const cleanId = String(memberId).replace('m-', '');
      const res = await apiClient.patch(`/admin/members/${cleanId}/status`, { status });
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },

  recordExpense: async (expenseData) => {
    try {
      const res = await apiClient.post('/admin/expenses', expenseData);
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },

  updateLockerStatus: async (lockerId, status, assignedTo) => {
    try {
      const res = await apiClient.patch(`/admin/lockers/${lockerId}/status`, { status, assignedTo });
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },

  scanGateQR: async (passCode) => {
    try {
      const res = await apiClient.post('/admin/attendance/qr-scan', { passCode });
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },

  // Trainer
  getTrainees: async () => {
    try {
      const res = await apiClient.get('/trainer/trainees');
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },

  createWorkout: async (workoutData) => {
    try {
      const res = await apiClient.post('/trainer/workouts', workoutData);
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },

  assignDiet: async (dietData) => {
    try {
      const res = await apiClient.post('/trainer/diets', dietData);
      return res.data.data || res.data;
    } catch (e) {
      return null;
    }
  },
};
