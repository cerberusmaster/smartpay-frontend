import { useForm } from 'react-hook-form';
import { Typography, Box, Container, TextField, InputAdornment, Button } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

type SendMoneyFormData = {
    recipient: string;
    amount: number;
    note?: string;
};


export default function SendMoney() {
    const { reload } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SendMoneyFormData>();

    const [isSending, setIsSending] = useState(false);


    const onSubmit = (data: SendMoneyFormData) => {
        setIsSending(true);
        axios.post('/wallet/transfer', data).then((res: { data: { message: string, new_balance: number } }) => {
            toast.success('Success! $' + res.data.new_balance + ' left.', { autoClose: 3000 });
            // window.location.reload();
            reload();
        }).catch((error) => {
            console.log(error)
            toast.warning('Failed', { autoClose: 1500 });
        }).finally(() => {
            setIsSending(false);
        })
    };


    return (
        <Container>
            <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
                flexDirection={'column'}
                width={"100%"}
                height="100vh"
                mt={8}>
                <Typography variant="h5" mt={4} gutterBottom>
                    Send Money
                </Typography>
                <Container maxWidth="xs">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            fullWidth
                            label="Recipient Email or Phone"
                            {...register('recipient', { required: 'Recipient is required' })}
                            error={!!errors.recipient}
                            helperText={errors.recipient?.message}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Amount"
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            {...register('amount', {
                                required: 'Amount is required',
                                min: { value: 0.01, message: 'Amount must be greater than 0' },
                            })}
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Note (optional)"
                            {...register('note')}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={isSending}
                        >
                            {isSending ? 'Sending...' : 'Send Money'}
                        </Button>
                    </form>
                </Container>
            </Box>
        </Container>
    );
}
