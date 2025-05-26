import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';

import { Table, TableHead, TableRow, TableCell, TableBody, Container, Typography } from '@mui/material';
import type { User } from '../../types/user';

export default function AdminUsers() {
    const { data } = useQuery<User[]>({
        queryKey: ['balance'],
        queryFn: () => axios.get('/admin/users').then(res => res.data)
    });

    return (
        <Container>
            <Typography variant="h5" mt={4}>All Users</Typography>
            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Balance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((user: User) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>${user.wallet.balance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
