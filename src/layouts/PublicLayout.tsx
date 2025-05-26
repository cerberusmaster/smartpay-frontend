import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <Container maxWidth="sm">
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Outlet />
      </Box>
    </Container>
  );
}