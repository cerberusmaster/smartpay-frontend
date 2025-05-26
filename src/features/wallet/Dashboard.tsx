import { Card, CardContent, Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';
import type { User } from '../../types/user';

export default function Dashboard() {
    const { data } = useQuery<User>({
        queryKey: ['balance'],
        queryFn: () => axios.get('/wallet/balance').then(res => res.data)
    });

    return (
        <Box mt={5} display="flex" justifyContent="center">
            <Card sx={{ width: 300 }}>
                <CardContent>
                    <Typography variant="h6">Wallet Balance</Typography>
                    <Typography variant="h4">${data?.wallet.balance ?? '0.00'}</Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
