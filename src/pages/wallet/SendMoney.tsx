import { useForm } from 'react-hook-form';
import { 
    Typography, 
    Box, 
    Container, 
    TextField, 
    InputAdornment, 
    Button, 
    Paper,
    CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { Person, AttachMoney, Note, Send } from '@mui/icons-material';

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
            reload();
        }).catch((error) => {
            console.log(error)
            toast.warning('Failed', { autoClose: 1500 });
        }).finally(() => {
            setIsSending(false);
        })
    };

    return (
        <Container maxWidth="sm" sx={{ 
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
                        Send Money
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Transfer funds to another user
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        fullWidth
                        label="Recipient Email or Phone"
                        {...register('recipient', { required: 'Recipient is required' })}
                        error={!!errors.recipient}
                        helperText={errors.recipient?.message}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        fullWidth
                        label="Amount"
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoney color="action" />
                                </InputAdornment>
                            ),
                        }}
                        {...register('amount', {
                            required: 'Amount is required',
                            min: { value: 0.01, message: 'Amount must be greater than 0' },
                        })}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        margin="normal"
                        variant="outlined"
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        fullWidth
                        label="Note (optional)"
                        {...register('note')}
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={3}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Note color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 4 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        disabled={isSending}
                        startIcon={isSending ? <CircularProgress size={20} color="inherit" /> : <Send />}
                        sx={{ 
                            py: 1.5,
                            height: '48px'
                        }}
                    >
                        {isSending ? 'Sending...' : 'Send Money'}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
