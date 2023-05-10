import axios from 'axios';

const API_URL = 'https://ice-delivery.fly.dev/api/auth/';

export const login = (email: string, password: string) => {
  return axios.get(API_URL + `user/login/${email}/${password}`).then((response) => {
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};
