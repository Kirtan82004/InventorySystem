import api from './axios';

// REGISTER
const signup = async (data) => {
  const res = await api.post('/register', data);

  // agar backend token return karta hai
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }

  return res.data;
};
// LOGIN
const login = async (data) => {
  const res = await api.post('/login', data);

  // token store
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
  }

  return res.data;
};

// LOGOUT
const logout = async () => {
  await api.post('/logout');
  localStorage.removeItem('token');
};

export { login, logout,signup };
