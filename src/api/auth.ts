import axios from './axios';

export const login = (data: { email: string; password: string }) =>
  axios.post('/auth/login', data);

export const registerUser = (data: {
  email: string;
  phone: string;
  password: string;
}, csrf_token: string) => axios.post('/auth/register', data, {
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-Token": csrf_token,
  }
});


export const get_csrf_token = () => axios.get('/auth/csrf-token', {
  withCredentials: true
});

