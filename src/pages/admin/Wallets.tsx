import axios from '../../api/axios';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import type { Wallet } from '../../types/user';
import { useEffect, useState } from 'react';

export default function Wallets() {
  const [data, setData] = useState<Wallet[]>([]);

  useEffect(() => {
    axios
      .get('/admin/wallets')
      .then((res: { data: Wallet[] }) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Typography variant="h5" mt={4}>
        All Transactions
      </Typography>

      <TableContainer sx={{ overflowX: 'auto', mt: 2 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((wallet: Wallet) => (
              <TableRow key={wallet.id} hover>
                <TableCell>{wallet.id}</TableCell>
                <TableCell>{wallet.user?.email}</TableCell>
                <TableCell>${wallet.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
