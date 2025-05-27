import axios from '../../api/axios';

import { Table, TableHead, TableRow, TableCell, TableBody, Container, Typography } from '@mui/material';
import type { User } from '../../types/user';
import { useEffect, useState } from 'react';

export default function AdminUsers() {
    const [data, setData] = useState<User[]>([]);
    
    useEffect(() => {
        axios.get('/admin/users').then((res: { data: User[] }) => {
            console.log(res.data);
            setData(res.data);
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })
    }, []);

    return (
        <Container>
            <Typography variant="h5" mt={4}>All Users</Typography>
            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Verified</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((user: User) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>${user.wallet?.balance}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.is_verified ? "Yes" : "No"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
