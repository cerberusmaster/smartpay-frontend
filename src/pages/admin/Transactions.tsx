import { useEffect, useMemo, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Container, Typography, Divider, Chip, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

import axios from '../../api/axios';
import type { Transaction, User } from '../../types/user';

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

type TransactionItem = {
    amount: number,
    sender?: User,
    receiver?: User
} & Transaction;

export default function Transactions() {
    const [data, setData] = useState<TransactionItem[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        axios.get(`/admin/transactions?page_size=${pageSize}&page=${page}`).then((res: { data: TransactionItem[] }) => {
            console.log(res.data);
            setData(res.data);
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })
    }, [page, pageSize]);

    return (
        <Container>
            <Typography variant="h5" mt={4}>
                Transaction History
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2} mt={4} gap={4}>
                <FormControl size="small">
                    <InputLabel id="page-size-label">Rows</InputLabel>
                    <Select
                        labelId="page-size-label"
                        value={pageSize}
                        label="Rows"
                        onChange={(v) => {
                            setPageSize(v.target.value);
                        }}
                    >
                        {[5, 10, 20, 50].map(size => (
                            <MenuItem key={size} value={size}>{size}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box>
                    <Button onClick={() => {
                        setPage(page - 1)
                    }} disabled={page === 0}>
                        Prev
                    </Button>
                    <Button onClick={() => {
                        setPage(page + 1)
                    }} sx={{ ml: 1 }}>
                        Next
                    </Button>
                </Box>
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell>Sender</TableCell>
                        <TableCell>Receiver</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((tx: TransactionItem) => (
                        <TableRow key={tx.id}>
                            <TableCell>
                                <Chip
                                    label={tx.type === 'top-up' ? 'Top-Up' : tx.type}
                                    color={tx.type === 'top-up' ? 'primary' : 'default'}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>{tx.sender?.email}</TableCell>
                            <TableCell>{tx.receiver?.email}</TableCell>
                            <TableCell>${tx.amount}</TableCell>
                            <TableCell>{formatDate(tx.timestamp)}</TableCell>
                            <TableCell>{tx.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
