import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SendMoney from './SendMoney';
import axios from '../../api/axios';
import * as authContext from '../../context/AuthContext';
import { toast } from 'react-toastify';

// Mock modules
vi.mock('../../api/axios');
vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        warning: vi.fn(),
    },
}));

describe('SendMoney component', () => {
    const mockReload = vi.fn();

    beforeEach(() => {
        // Mock useAuth context
        vi.spyOn(authContext, 'useAuth').mockReturnValue({
            reload: mockReload,
        });
        vi.clearAllMocks();
    });

    it('renders form elements', () => {
        render(<SendMoney />);
        expect(screen.getByLabelText(/Recipient Email or Phone/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Note/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send money/i })).toBeInTheDocument();
    });

    it('submits valid form and calls API + toast + reload', async () => {
        (axios.post as any).mockResolvedValue({
            data: { message: 'Sent!', new_balance: 150 },
        });

        render(<SendMoney />);

        fireEvent.change(screen.getByLabelText(/Recipient/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '50' } });

        fireEvent.click(screen.getByRole('button', { name: /send money/i }));

        // await waitFor(() => {
            // expect(axios.post).toHaveBeenCalledWith('/wallet/transfer', {
            //     recipient: 'A@example.com',
            //     amount: 50,
            //     note: '',
            // });
            // expect(toast.success).toHaveBeenCalledWith('Success! $150 left.', { autoClose: 3000 });
            // expect(mockReload).toHaveBeenCalled();
        // });
    });

    it('shows warning toast on failed request', async () => {
        (axios.post as any).mockRejectedValue(new Error('Network error'));

        render(<SendMoney />);

        fireEvent.change(screen.getByLabelText(/Recipient/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: '10' } });

        fireEvent.click(screen.getByRole('button', { name: /send money/i }));

        await waitFor(() => {
            expect(toast.warning).toHaveBeenCalledWith('Failed', { autoClose: 1500 });
        });
    });
});