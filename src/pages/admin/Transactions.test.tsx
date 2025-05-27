import { render, screen, waitFor } from '@testing-library/react';
import Transactions from './Transactions';
import axios from '../../api/axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.mock('../../api/axios');

const mockTransactions = [
    {
        id: 1,
        type: 'top-up',
        amount: 100,
        timestamp: '2024-05-01T10:30:00Z',
        status: 'completed',
        sender: { email: 'system@example.com' },
        receiver: { email: 'user@example.com' },
    },
    {
        id: 2,
        type: 'transfer',
        amount: 50,
        timestamp: '2024-05-02T15:45:00Z',
        status: 'pending',
        sender: { email: 'alice@example.com' },
        receiver: { email: 'bob@example.com' },
    },
];

describe('Transactions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders a list of transactions', async () => {
        (axios.get as any).mockResolvedValue({ data: mockTransactions });

        render(<Transactions />);

        await waitFor(() => {
            expect(screen.getByText('Transaction History')).toBeInTheDocument();
        });

        // Check table content
        expect(screen.getByText('Top-Up')).toBeInTheDocument();
        expect(screen.getByText('transfer')).toBeInTheDocument();

        expect(screen.getByText('$100')).toBeInTheDocument();
        expect(screen.getByText('$50')).toBeInTheDocument();

        expect(screen.getByText('completed')).toBeInTheDocument();
        expect(screen.getByText('pending')).toBeInTheDocument();

        expect(screen.getByText('system@example.com')).toBeInTheDocument();
        expect(screen.getByText('user@example.com')).toBeInTheDocument();
        expect(screen.getByText('alice@example.com')).toBeInTheDocument();
        expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    });
});
