import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Link as MuiLink, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api/auth';
import type { LoginData, LoginResponse } from '../../types/user';
import { useEffect, useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginData>();
  const { setToken, isAuthenticated } = useAuth();
  const [error, setError] = useState('');

  const onSubmit = async (loginData: LoginData) => {
    login(loginData).then((res: { data: LoginResponse }) => {
      setToken(res.data.access_token);
      navigate('/dashboard');
    }).catch((err) => {
      console.log(err?.response?.data?.detail)
      setError(err?.response?.data?.detail[0].msg || err?.response?.data?.detail || 'Registration failed');
    });
  };

  useEffect(() => {
    if (isAuthenticated)
      navigate('/dashboard');

  }, [isAuthenticated]);

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box width="100%">
          <Typography variant="h5" mb={2} textAlign="center">
            Login or <MuiLink component={Link} to="/register" underline="hover">
              Register
            </MuiLink>
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              {...register('email')}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register('password')}
              margin="normal"
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
