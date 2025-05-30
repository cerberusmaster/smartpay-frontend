import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
  Button,
  Avatar
} from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logout } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';

export default function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user, logout } = useAuth();

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Send Money', path: '/send', icon: <SendIcon /> },
    { text: 'Transactions', path: '/transactions', icon: <HistoryIcon /> },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: isMobile ? 64 : 240,
          flexShrink: 0,
          backgroundColor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        {/* Navigation Menu */}
        <List sx={{ flexGrow: 1, pt: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <Tooltip title={isMobile ? item.text : ''} placement="right">
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    '&.Mui-selected': {
                      backgroundColor: 'action.selected',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 0,
                      mr: isMobile ? 'auto' : 3,
                      justifyContent: 'center',
                      color: location.pathname === item.path ? 'primary.main' : 'inherit'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!isMobile && (
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                        color: location.pathname === item.path ? 'primary.main' : 'inherit'
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>

        {/* User Profile Section */}
        <Box 
          sx={{ 
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: isMobile ? 32 : 40,
              height: isMobile ? 32 : 40,
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}
          >
            {getInitials(user?.email || '')}
          </Avatar>
          {!isMobile && (
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography variant="body2" noWrap>
                {user?.email}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user?.role}
              </Typography>
            </Box>
          )}
          <Tooltip title="Logout">
            <Button
              color="primary"
              onClick={logout}
              sx={{ 
                minWidth: 0,
                p: isMobile ? 1 : 2,
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <Logout />
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          backgroundColor: 'background.default',
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
