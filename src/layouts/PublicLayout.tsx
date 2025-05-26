import { Box, AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function PublicLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <Box>
      <AppBar position="absolute">
        <Toolbar>
          <Box flexGrow={9}>
            <Typography variant="h6">Smart Pay</Typography>
          </Box>
          {isAuthenticated && (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}