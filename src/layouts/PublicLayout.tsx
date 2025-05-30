import { Box, AppBar, Toolbar, Typography, Button, useTheme } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { AccountBalance, AdminPanelSettings, Logout } from '@mui/icons-material';

export default function PublicLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        elevation={1}
        sx={{ 
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" gap={1} flexGrow={1}>
            <AccountBalance color="primary" />
            <Typography variant="h6" color="primary" fontWeight="bold">
              Smart Pay
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={2}>
            {isAuthenticated && user?.role === "admin" && (
              <Button
                color="primary"
                startIcon={<AdminPanelSettings />}
                onClick={onAdmin}
                sx={{ 
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                Admin
              </Button>
            )}
            {isAuthenticated && (
              <Button
                color="primary"
                startIcon={<Logout />}
                onClick={logout}
                sx={{ 
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box 
        component="main" 
        sx={{
          pt: '64px', // Height of AppBar
          backgroundColor: 'background.default',
          height: 'calc(100vh - 64px)'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}