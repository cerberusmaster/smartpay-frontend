import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Box, Container, Stack } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function AdminLayout() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isAuthenticated === false) {
        navigate('/login');
      } else {
        if (user?.role === "admin")
            navigate('/admin/users');
        else
            navigate('/dashboard');
      }
    }, [isAuthenticated]);

    return (
        <Box mt={0}>
            <Stack direction={'row'} gap={4} pl={4} mt={4}>
                <Link to={'/admin/users'}>Users</Link>
                <Link to={'/admin/transactions'}>Transactions</Link>
                <Link to={'/admin/wallets'}>Wallets</Link>
            </Stack>
            <Container>
                <Outlet />
            </Container>
        </Box>
    );
}
