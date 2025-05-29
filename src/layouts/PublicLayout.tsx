import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function PublicLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  }, []);

  const onAdmin = () => {
    navigate('/admin/users')
  }

  return (
    <Box>
      <AppBar position="absolute">
        <Toolbar>
          <Box display={'flex'} flexGrow={9} flexDirection={'row'} gap={5}>
            {isAuthenticated && user?.role === "admin" && (
              <Button color="inherit" onClick={onAdmin}>
                Admin
              </Button>
            )}
            <Typography variant="h6">{user?.email ?? "Smart Pay"}</Typography>
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