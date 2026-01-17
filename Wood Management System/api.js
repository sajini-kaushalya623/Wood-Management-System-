// API Service for Wood Inventory Management System
// Place this file in: src/services/api.js

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// Authentication Services
// ============================================

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ============================================
// Inventory Services
// ============================================

export const inventoryService = {
  getAll: async (params = {}) => {
    const response = await api.get('/inventory', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/inventory/${id}`);
    return response.data;
  },

  create: async (data, imageFile = null) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await api.post('/inventory', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/inventory/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/inventory/${id}`);
    return response.data;
  },

  getLowStock: async () => {
    const response = await api.get('/inventory', { params: { lowStock: true } });
    return response.data;
  },
};

// ============================================
// Supplier Services
// ============================================

export const supplierService = {
  getAll: async () => {
    const response = await api.get('/suppliers');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/suppliers/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/suppliers', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/suppliers/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/suppliers/${id}`);
    return response.data;
  },
};

// ============================================
// Stock In Services
// ============================================

export const stockInService = {
  getAll: async (params = {}) => {
    const response = await api.get('/stock-in', { params });
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/stock-in', data);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/stock-in/${id}`);
    return response.data;
  },
};

// ============================================
// Stock Out Services
// ============================================

export const stockOutService = {
  getAll: async (params = {}) => {
    const response = await api.get('/stock-out', { params });
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/stock-out', data);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/stock-out/${id}`);
    return response.data;
  },
};

// ============================================
// Dashboard Services
// ============================================

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  getRecentActivity: async () => {
    const response = await api.get('/dashboard/recent-activity');
    return response.data;
  },
};

// ============================================
// Report Services
// ============================================

export const reportService = {
  getStockMovement: async (params = {}) => {
    const response = await api.get('/reports/stock-movement', { params });
    return response.data;
  },

  getSupplierPerformance: async () => {
    const response = await api.get('/reports/supplier-performance');
    return response.data;
  },

  exportPDF: async (reportType, params = {}) => {
    const response = await api.get(`/reports/${reportType}/pdf`, {
      params,
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${reportType}_report_${Date.now()}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  exportExcel: async (reportType, params = {}) => {
    const response = await api.get(`/reports/${reportType}/excel`, {
      params,
      responseType: 'blob',
    });
    
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${reportType}_report_${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};

// ============================================
// Utility Functions
// ============================================

export const calculateVolume = (length, width, thickness) => {
  return (parseFloat(length) * parseFloat(width) * parseFloat(thickness)).toFixed(2);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-LK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export default api;