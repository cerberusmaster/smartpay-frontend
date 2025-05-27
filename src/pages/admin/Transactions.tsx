import { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Container, Typography, Divider, Chip } from '@mui/material';

import axios from '../../api/axios';
import type { Transaction } from '../../types/user';

const formatDate = (timestamp: string) => {
    const d = new Date(timestamp);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
        .getDate()
        .toString()
        .padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
};


export default function Transactions() {
    const [data, setData] = useState<Transaction[]>([]);

    useEffect(() => {
        axios.get('/admin/transactions').then((res: { data: Transaction[] }) => {
            console.log(res.data);
            setData(res.data);
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })
    }, []);

    return (
        <Container>
            <Typography variant="h5" mt={4}>
                Transaction History
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Sender</TableCell>
                        <TableCell>Receiver</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((tx: any) => (
                        <TableRow key={tx.id}>
                            <TableCell>
                                <Chip
                                    label={tx.type === 'top-up' ? 'Top-Up' : tx.type}
                                    color={tx.type === 'top-up' ? 'primary' : 'default'}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>${tx.amount}</TableCell>
                            <TableCell>{formatDate(tx.timestamp)}</TableCell>
                            <TableCell>{tx.status}</TableCell>
                            <TableCell>{tx.sender?.email}</TableCell>
                            <TableCell>{tx.receiver?.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
