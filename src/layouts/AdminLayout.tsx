import { Outlet } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, Container } from '@mui/material';

export default function AdminLayout() {
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">SmartPay Admin</Typography>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
}
