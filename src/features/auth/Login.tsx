import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api/auth';
import type { LoginData, LoginResponse } from '../../types/user';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginData>();
  const { setToken } = useAuth();

  const onSubmit = async (loginData: LoginData) => {
    login(loginData).then((res: { data: LoginResponse }) => {
      setToken(res.data.access_token);
      navigate('/dashboard');
    }).catch((error: any) => {
    });
  };

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
