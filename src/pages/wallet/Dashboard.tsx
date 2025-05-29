import { 
  Typography, 
  Box, 
  Container,
  Avatar,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Chip
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from "../../api/axios";
import { useAuth } from '../../context/AuthContext';
import { getUserNameFromEmail } from '../../utils/utils';
import TopUpModal from '../../features/wallet/TopUpModal';
import { AccountBalance, Send, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, reload } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const onSubmit = (amount: number) => {
        axios.post('/wallet/topup', { amount }).then((res: { data: { message: string, new_balance: number } }) => {
            toast.success(res.data.message + " $" + res.data.new_balance + ' left.', { autoClose: 3000 });
            reload();
        }).catch((error) => {
            console.log(error)
            toast.warning('Failed', { autoClose: 1500 });
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <Container maxWidth="lg" sx={{ 
            py: 4,
            minHeight: 'calc(100vh - 64px)', // Subtract header height
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 3,
                width: '100%'
            }}>
                {/* User Profile Card */}
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            p: 3,
                            borderRadius: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                bgcolor: 'primary.main',
                                fontSize: '2rem',
                                mb: 2
                            }}
                        >
                            {getInitials(getUserNameFromEmail(user?.email || ''))}
                        </Avatar>
                        <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
                            {getUserNameFromEmail(user?.email || '')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            {user?.email}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {user?.phone}
                        </Typography>
                        <Chip
                            label={user?.role}
                            color="primary"
                            size="small"
                            sx={{ mt: 1 }}
                        />
                    </Paper>
                </Box>

                {/* Wallet Card */}
                <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
                    <Paper 
                        elevation={3}
                        sx={{ 
                            p: 3,
                            borderRadius: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Box display="flex" alignItems="center" mb={3}>
                            <AccountBalance sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6" component="h2">
                                Wallet Balance
                            </Typography>
                        </Box>

                        <Typography variant="h3" component="div" color="primary" gutterBottom>
                            ${user?.wallet?.balance ?? '0.00'}
                        </Typography>

                        <Box mt="auto" display="flex" gap={2} flexDirection={isMobile ? 'column' : 'row'}>
                            <Box sx={{ flex: 2 }}>
                                <TopUpModal open={false} amount={10} onSubmit={onSubmit} />
                            </Box>
                            <Button
                                variant="outlined"
                                startIcon={<Send />}
                                onClick={() => navigate('/send')}
                                sx={{ 
                                    py: 2,
                                    flex: 1.5,
                                    height: '48px',
                                    whiteSpace: 'nowrap',
                                    minWidth: 0,
                                }}
                            >
                                Send Money
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<History />}
                                onClick={() => navigate('/transactions')}
                                sx={{ 
                                    py: 2,
                                    flex: 1.5,
                                    height: '48px',
                                    whiteSpace: 'nowrap',
                                    minWidth: 0,
                                }}
                            >
                                Transactions
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
}