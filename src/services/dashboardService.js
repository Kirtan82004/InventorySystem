import api from './axios';

// GET dashboard stats
const getDashboardStats = async () => {
  try {
    const res = await api.get('/dashboard');
    return res.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error('Failed to fetch dashboard data');
  }
};

export { getDashboardStats };
