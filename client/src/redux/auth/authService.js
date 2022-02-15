import axios from 'axios';

const register = async (userData) => {
  const response = await axios.post('/api/users/register', userData);

  if (response) {
    localStorage.setItem('user', JSON.stringify(response.user));
  }

  return response;
};

const authService = {
  register
};

export default authService;
