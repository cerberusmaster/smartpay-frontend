import axios from '../../api/axios';

import { Table, TableHead, TableRow, TableCell, TableBody, Container, Typography } from '@mui/material';
import type { Wallet } from '../../types/user';
import { useEffect, useState } from 'react';

export default function Wallets() {
    const [data, setData] = useState<Wallet[]>([]);
    
    useEffect(() => {
        axios.get('/admin/wallets').then((res: { data: Wallet[] }) => {
            console.log(res.data);
            setData(res.data);
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })
    }, []);

    return (
        <Container>
            <Typography variant="h5" mt={4}>All Transactions</Typography>
            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((wallet: Wallet) => (
                        <TableRow key={wallet.id}>
                            <TableCell>{wallet.id}</TableCell>
                            <TableCell>{wallet.user?.email}</TableCell>
                            <TableCell>${wallet.balance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
