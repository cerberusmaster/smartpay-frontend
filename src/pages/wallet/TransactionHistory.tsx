import {
    Typography, 
    Box, 
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    useTheme,
    useMediaQuery,
    CircularProgress,
    Divider
} from '@mui/material';
import axios from "../../api/axios";
import { useEffect, useState } from 'react';
import { History, TrendingUp, TrendingDown } from '@mui/icons-material';

type Transaction = {
    id: number;
    amount: number;
    timestamp: string;
    type: "top-up" | "transfer";
    status: string;
    sender_id: number;
    receiver_id: number;
    direction: string,
    otherParty?: string,
    displayAmount?: string,
    sender_user?: { id: number; email: string };
    receiver_user?: { id: number; email: string };
};

type TransactionResponse = {
    sent_transactions: Transaction[];
    received_transactions: Transaction[];
};

export default function TransactionHistory() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Transaction[]>();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        axios.post('/wallet/transactions').then((res: { data: TransactionResponse }) => {
            const combinedTransactions = [
                ...(res.data?.sent_transactions.map((tx: any) => ({
                    ...tx,
                    direction: 'sent',
                    otherParty: tx.receiver_user?.email,
                    displayAmount: `-$${tx.amount}`,
                })) || []),
                ...(res.data?.received_transactions.map((tx: any) => ({
                    ...tx,
                    direction: 'received',
                    otherParty: tx.sender_user?.email,
                    displayAmount: `+$${tx.amount}`,
                })) || []),
            ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

            setData(combinedTransactions);
        }).catch(() => {
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);

    const dateFormatted = (ts: string) => {
        return new Date(ts).toLocaleString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    if (isLoading) {
        return (
            <Container maxWidth="lg" sx={{ 
                py: 4,
                minHeight: 'calc(100vh - 64px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ 
            py: 4,
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Paper 
                elevation={3}
                sx={{ 
                    p: 4,
                    width: '100%',
                    borderRadius: 2
                }}
            >
                <Box textAlign="center" mb={4}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
                        Transaction History
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        View your recent transactions
                    </Typography>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {!isMobile ? (
                    // Desktop Table
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Direction</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((tx: Transaction) => (
                                <TableRow key={`${tx.direction}-${tx.id}`} hover>
                                    <TableCell>
                                        <Chip
                                            label={tx.type === 'top-up' ? 'Top-Up' : 'Transfer'}
                                            color={tx.type === 'top-up' ? 'primary' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={tx.direction === 'sent' ? 'Sent' : 'Received'}
                                            color={tx.direction === 'sent' ? 'error' : 'success'}
                                            size="small"
                                            icon={tx.direction === 'sent' ? <TrendingDown /> : <TrendingUp />}
                                        />
                                    </TableCell>
                                    <TableCell>{tx.otherParty}</TableCell>
                                    <TableCell>
                                        <Typography 
                                            color={tx.direction === 'sent' ? 'error.main' : 'success.main'}
                                            fontWeight="medium"
                                        >
                                            {tx.displayAmount}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{dateFormatted(tx.timestamp)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={tx.status}
                                            color={tx.status === 'pending' ? 'warning' : 'success'}
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    // Mobile Card View
                    <Box display="flex" flexDirection="column" gap={2}>
                        {data?.map((tx: Transaction) => (
                            <Paper
                                key={`${tx.direction}-${tx.id}`}
                                elevation={1}
                                sx={{ 
                                    p: 2,
                                    borderRadius: 2,
                                    borderLeft: 6,
                                    borderColor: tx.direction === 'sent' ? 'error.main' : 'success.main'
                                }}
                            >
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Chip
                                        label={tx.type === 'top-up' ? 'Top-Up' : 'Transfer'}
                                        color={tx.type === 'top-up' ? 'primary' : 'default'}
                                        size="small"
                                    />
                                    <Chip
                                        label={tx.status}
                                        color={tx.status === 'pending' ? 'warning' : 'success'}
                                        size="small"
                                    />
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Typography variant="body2" color="text.secondary">
                                        {tx.direction === 'sent' ? 'To' : 'From'}:
                                    </Typography>
                                    <Typography variant="body2">
                                        {tx.otherParty}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Typography variant="body2" color="text.secondary">
                                        Amount:
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        color={tx.direction === 'sent' ? 'error.main' : 'success.main'}
                                        fontWeight="medium"
                                    >
                                        {tx.displayAmount}
                                    </Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                        Date:
                                    </Typography>
                                    <Typography variant="body2">
                                        {dateFormatted(tx.timestamp)}
                                    </Typography>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                )}
            </Paper>
        </Container>
    );
}
