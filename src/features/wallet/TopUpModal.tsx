import React, { useState } from 'react';
import {
    Button,
    Modal,
    Box,
    Typography,
    TextField,
    Stack,
} from '@mui/material';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
};

type Props = {
    open: boolean,
    amount: number,
    onSubmit: (amount: number) => void,
}

export default function TopUpModal(props: Props) {
    const [open, setOpen] = useState(props.open);
    const [amount, setAmount] = useState(props.amount);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.onSubmit(amount);
        handleClose();
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                size='medium'
                startIcon={<span style={{ fontWeight: 'bold', fontSize: '20px' }}>+</span>}
                onClick={handleOpen}
            >
                Top-Up
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style} component="form" onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Typography variant="h6" component="h2" textAlign="center">
                            Enter Top-Up Amount
                        </Typography>
                        <TextField
                            label="Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number.parseInt(e.target.value))}
                            fullWidth
                            required
                            inputProps={{ min: 1, step: 0.01 }}
                        />
                        <Button type="submit" variant="contained" fullWidth>
                            Submit
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
}
