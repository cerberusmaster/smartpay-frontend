import { Card, CardContent, Typography, Box, Avatar, Divider, Container } from '@mui/material';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
    const { user, isAuthenticated } = useAuth();

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Box mt={5} display="flex" justifyContent="center">
                    <Card sx={{ width: 400, p: 2 }}>
                        <CardContent>
                            <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
                                <Avatar sx={{ width: 64, height: 64, mb: 1 }}>
                                </Avatar>
                                <Typography variant="h6">Unknown</Typography>
                                <Typography color="text.secondary">{user?.email}</Typography>
                                <Typography color="text.secondary">{user?.phone}</Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="body1">Wallet Balance</Typography>
                            <Typography variant="h4" color="primary" mt={1}>
                                ${user?.wallet?.balance?.toFixed(2) ?? '0.00'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
}
