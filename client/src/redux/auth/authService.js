import axios from 'axios';

const register = async (userData) => {
  const response = await axios.post('/api/users/register', userData);

  if (response) {
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
};

const login = async (userData) => {
  const response = await axios.post('/api/users/login', userData);

  if (response) {
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login
};

export default authService;
