import { render, screen, waitFor } from '@testing-library/react';
import TransactionHistory from './TransactionHistory';
import axios from '../../api/axios';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock Axios
vi.mock('../../api/axios');

// Sample transaction data
const mockData = {
    sent_transactions: [
        {
            id: 1,
            amount: 50,
            timestamp: new Date().toISOString(),
            type: 'transfer',
            status: 'completed',
            sender_id: 100,
            receiver_id: 200,
            sender_user: { id: 100, email: 'sender@example.com' },
            receiver_user: { id: 200, email: 'receiver@example.com' },
        },
    ],
    received_transactions: [
        {
            id: 2,
            amount: 100,
            timestamp: new Date().toISOString(),
            type: 'top-up',
            status: 'completed',
            sender_id: 300,
            receiver_id: 100,
            sender_user: { id: 300, email: 'topup@example.com' },
            receiver_user: { id: 100, email: 'user@example.com' },
        },
    ],
};

describe('TransactionHistory', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders transactions after API call', async () => {
        (axios.post as any).mockResolvedValue({ data: mockData });

        render(<TransactionHistory />);

        // Wait for the table or any transaction content to appear
        await waitFor(() => {
            expect(screen.getByText('Transaction History')).toBeInTheDocument();
        });

        // Check that transactions are rendered
        expect(screen.getByText('transfer')).toBeInTheDocument();
        expect(screen.getByText('top-up')).toBeInTheDocument();

        // Emails
        expect(screen.getByText('receiver@example.com')).toBeInTheDocument();
        expect(screen.getByText('topup@example.com')).toBeInTheDocument();

        // Amounts
        expect(screen.getByText('-$50')).toBeInTheDocument();
        expect(screen.getByText('+$100')).toBeInTheDocument();

        // Status
        expect(screen.getAllByText('completed').length).toBeGreaterThan(0);
    });

    it('shows "Loading..." while fetching data', () => {
        render(<TransactionHistory />);
        expect(screen.queryByText('Loading...')).toBeInTheDocument();
    });
});
