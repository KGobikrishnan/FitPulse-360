const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Authentication
  login: async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await res.json();
    } catch (e) {
      console.warn("Backend offline, falling back to local auth mode", e);
      return null;
    }
  },

  register: async (data) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  },

  // Admin DB Overview
  getAdminOverview: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/overview`);
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  enrollMember: async (memberData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/members/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberData)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  scanGateQR: async (passCode) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/attendance/qr-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passCode })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }
};
