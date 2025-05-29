import { Card, CardContent, Typography, Box, Divider, Container } from '@mui/material';
import { toast } from 'react-toastify';
import axios from "../../api/axios";
import { useAuth } from '../../context/AuthContext';
import { getUserNameFromEmail } from '../../utils/utils';
import TopUpModal from '../../features/wallet/TopUpModal';

export default function Dashboard() {
    const { user, reload } = useAuth();

    const onSubmit = (amount: number) => {
        axios.post('/wallet/topup', { amount }).then((res: { data: { message: string, new_balance: number } }) => {
            toast.success(res.data.message + " $" + res.data.new_balance + ' left.', { autoClose: 3000 });
            reload();
        }).catch((error) => {
            console.log(error)
            toast.warning('Failed', { autoClose: 1500 });
        });
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="80vh"
            >
                {!!user && (
                    <Card
                        sx={{
                            width: '100%',               // Full width on small devices
                            maxWidth: 400,               // Max width on larger screens
                            p: { xs: 2, sm: 3 },        // Responsive padding
                            boxShadow: 3,
                            borderRadius: 2,
                        }}
                    >
                        <CardContent>
                            <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
                                <Typography variant="h4" component="h1" textAlign="center" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {getUserNameFromEmail(user.email)}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" mb={0.5}>
                                    Role: {user.role}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap sx={{ width: '100%', textAlign: 'center' }}>
                                    {user.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap sx={{ width: '100%', textAlign: 'center' }}>
                                    {user.phone}
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box
                                display="flex"
                                flexDirection={{ xs: 'column', sm: 'row' }}   // Stack on xs, row on sm+
                                justifyContent="space-between"
                                alignItems={{ xs: 'stretch', sm: 'center' }}
                                gap={2}
                            >
                                <Box textAlign={{ xs: 'center', sm: 'left' }}>
                                    <Typography variant="body1">Wallet Balance</Typography>
                                    <Typography variant="h4" color="primary" mt={1}>
                                        ${user.wallet?.balance ?? '0.00'}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }}>
                                    <TopUpModal open={false} amount={10} onSubmit={onSubmit} />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Container>
    );
}