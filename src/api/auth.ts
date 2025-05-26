import axios from './axios';

export const login = (data: { email: string; password: string }) =>
  axios.post('/auth/login', data);

export const registerUser = (data: {
  email: string;
  phone: string;
  password: string;
}) => axios.post('/auth/register', data);
