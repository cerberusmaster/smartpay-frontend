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
        }).finally(() => {
        })
    };

    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Box mt={5} display="flex" justifyContent="center">
                    {
                        !!user && <Card sx={{ width: 400, p: 2 }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
                                    <Typography variant="h3">{getUserNameFromEmail(user.email)}</Typography>
                                    <Typography variant="h6">role - {user.role}</Typography>
                                    <Typography color="text.secondary">{user?.email}</Typography>
                                    <Typography color="text.secondary">{user?.phone}</Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />
                                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                    <Box>
                                        <Typography variant="body1">Wallet Balance</Typography>
                                        <Typography variant="h4" color="primary" mt={1}>
                                            ${user?.wallet?.balance ?? '0.00'}
                                        </Typography>
                                    </Box>
                                    <TopUpModal open={false} amount={10} onSubmit={onSubmit} />
                                </Box>
                            </CardContent>
                        </Card>
                    }
                </Box>
            </Box>
        </Container>
    );
}
