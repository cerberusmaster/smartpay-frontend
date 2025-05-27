import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useEffect } from 'react';

export default function SidebarLayout() {
    const navigate = useNavigate();

    const menuItems = [
        { text: 'Dashboard', path: '/dashboard' },
        { text: 'Send Money', path: '/send' },
        { text: 'Transaction History', path: '/transactions' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Box
                paddingTop={8}
                sx={{
                    backgroundColor: '#adb9c4'
                }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => navigate(item.path)}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
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