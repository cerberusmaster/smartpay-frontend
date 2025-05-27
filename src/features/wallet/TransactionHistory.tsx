import {
    Typography, Box, Divider, Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    useTheme,
    useMediaQuery,
} from '@mui/material';
// import { useAuth } from '../../context/AuthContext';
import axios from "../../api/axios";
import { useEffect, useState } from 'react';

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
    // const { user, isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // const { data, isLoading } = useQuery<TransactionResponse>({
    //     queryKey: ['transaction-history'],
    //     queryFn: () => axios.get('/wallet/transactions').then((res) => res.data),
    // });

    const [data, setData] = useState<Transaction[]>();

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
            ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Descending order

            console.log(combinedTransactions);
            setData(combinedTransactions);
        }).catch((error) => {
        }).finally(() => {
            setIsLoading(false);
        })
    }, []);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (isLoading) return <Typography>Loading...</Typography>;

    const dateFormatted = (ts: string) => {
        return new Date(ts).toLocaleString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <Container>
            <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                flexDirection={'column'}
                mt={8}
                width={"100%"}
                height="100vh"
            >
                <Typography variant="h5" mt={4} gutterBottom>
                    Transaction History
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Container maxWidth="lg">
                    {!isMobile ? (
                        // Desktop Table
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.map((tx: Transaction) => (
                                    <TableRow key={`${tx.direction}-${tx.id}`}>
                                        <TableCell>{tx.type}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={tx.direction === 'sent' ? 'Sent' : 'Received'}
                                                color={tx.direction === 'sent' ? 'info' : 'success'}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{tx.otherParty}</TableCell>
                                        <TableCell>{tx.displayAmount}</TableCell>
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
                            {data?.map((tx: any) => (
                                <Box
                                    key={`${tx.direction}-${tx.id}`}
                                    border={1}
                                    borderColor="grey.300"
                                    borderRadius={2}
                                    p={2}
                                    display="flex"
                                    flexDirection="column"
                                    gap={0.5}
                                    sx={{ p: 2 }}
                                >
                                    <Box display="flex" justifyContent="space-between">
                                        <Chip
                                            label={tx.direction === 'sent' ? 'Sent' : 'Received'}
                                            color={tx.direction === 'sent' ? 'info' : 'success'}
                                            size="small"
                                        />
                                        <Chip
                                            label={tx.status}
                                            color={tx.status === 'pending' ? 'warning' : 'success'}
                                            size="small"
                                        />
                                    </Box>
                                    <Typography mt={1}>
                                        <strong>{tx.direction === 'sent' ? 'To' : 'From'}:</strong>{' '}
                                        {tx.otherParty}
                                    </Typography>
                                    <Typography>
                                        <strong>Amount:</strong> {tx.displayAmount}
                                    </Typography>
                                    <Typography>
                                        <strong>Date:</strong> {dateFormatted(tx.timestamp)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}

                </Container>
            </Box>
        </Container>
    );
}
