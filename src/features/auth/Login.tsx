import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const res = await login(data);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
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
            Login
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
