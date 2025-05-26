import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Link as MuiLink
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Snackbar, { type SnackbarOrigin } from '@mui/material/Snackbar';

import { registerUser } from '../../api/auth';

// Zod schema for form validation
const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone number too short' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);
      navigate('/login');
      setSnackbarState({
        ...snackbarState, open: true, msg: "Registered Successfully!"
      })
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };
  interface SnackbarState extends SnackbarOrigin {
    open: boolean;
    msg: string;
  }
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    msg: "",
  });

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };


  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh">
        <Box width="100%">
          <Typography variant="h5" mb={2}>
            Register or <MuiLink component={Link} to="/login" underline="hover">
              Login
            </MuiLink>
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              label="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Phone"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="normal"
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Create Account
            </Button>
          </form>
        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackbarState.open}
          onClose={handleClose}
          message={snackbarState.msg}
          key={"register-result"}
        />
      </Box>
    </Container>
  );
}
