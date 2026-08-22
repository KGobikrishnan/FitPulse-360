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

// Response Interceptor: Auto Refresh Token on 401
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('fitpulse_refresh_token');

      if (!refreshToken) {
        // No refresh token available, trigger clean logout
        localStorage.removeItem('fitpulse_jwt_token');
        localStorage.removeItem('fitpulse_refresh_token');
        localStorage.removeItem('fitpulse_current_user_v4');
        window.dispatchEvent(new Event('auth:unauthorized'));
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
        const newToken = res.data?.data?.accessToken || res.data?.accessToken;

        if (newToken) {
          localStorage.setItem('fitpulse_jwt_token', newToken);
          apiClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('fitpulse_jwt_token');
        localStorage.removeItem('fitpulse_refresh_token');
        localStorage.removeItem('fitpulse_current_user_v4');
        window.dispatchEvent(new Event('auth:unauthorized'));
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const api = {
  // Authentication
  login: async (email, password) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      const data = res.data.data || res.data;
      if (data && data.token) {
        localStorage.setItem('fitpulse_jwt_token', data.token);
      }
      if (data && data.refreshToken) {
        localStorage.setItem('fitpulse_refresh_token', data.refreshToken);
      }
      return data;
    } catch (e) {
      console.warn('Backend login error:', e);
      return null;
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (e) {
      console.warn('Backend logout error:', e);
    } finally {
      localStorage.removeItem('fitpulse_jwt_token');
      localStorage.removeItem('fitpulse_refresh_token');
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
