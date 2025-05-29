import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import { Outlet, useNavigate } from 'react-router-dom';

export default function SidebarLayout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Add icon to each menu item
  const menuItems = [
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Send Money', path: '/send', icon: <SendIcon /> },
    { text: 'Transactions', path: '/transactions', icon: <HistoryIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        paddingTop={8}
        sx={{
          backgroundColor: '#adb9c4',
          width: isMobile ? 60 : 200, // narrower on mobile
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ justifyContent: 'center' }}>
              <Tooltip title={isMobile ? item.text : ''} placement="right">
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    display: 'flex',
                    justifyContent: isMobile ? 'center' : 'flex-start',
                    px: 2,
                  }}
                >
                  {item.icon}
                  {!isMobile && (
                    <ListItemText
                      primary={item.text}
                      sx={{ ml: 2 }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
