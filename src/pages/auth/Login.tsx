import { useForm } from 'react-hook-form';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Link as MuiLink, 
  Alert,
  Paper,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api/auth';
import type { LoginData, LoginResponse } from '../../types/user';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginData>();
  const { setToken, isAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (loginData: LoginData) => {
    setLoading(true);
    setError('');
    try {
      const res = await login(loginData);
      setToken(res.data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      console.log(err?.response?.data?.detail);
      setError(err?.response?.data?.detail[0]?.msg || err?.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        py={4}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            borderRadius: 2,
            backgroundColor: 'background.paper'
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Please sign in to continue
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                '& .MuiAlert-message': {
                  width: '100%'
                }
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              {...register('email')}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              margin="normal"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <MuiLink 
                component={Link} 
                to="/forgot-password" 
                underline="hover"
                color="primary"
              >
                Forgot Password?
              </MuiLink>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                borderRadius: 2,
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            <Box mt={3} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <MuiLink 
                  component={Link} 
                  to="/register" 
                  underline="hover"
                  color="primary"
                  fontWeight="bold"
                >
                  Sign Up
                </MuiLink>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
