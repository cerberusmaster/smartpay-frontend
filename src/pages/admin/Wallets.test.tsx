import { render, screen, waitFor } from '@testing-library/react';
import Wallets from './Wallets';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import axios from '../../api/axios';

vi.mock('../../api/axios');

const mockWallets = [
    {
        id: 'wallet1',
        balance: 500,
        user: { email: 'user1@example.com' },
    },
    {
        id: 'wallet2',
        balance: 1500,
        user: { email: 'user2@example.com' },
    },
];

describe('Wallets component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders wallet data correctly', async () => {
        (axios.get as any).mockResolvedValue({ data: mockWallets });

        render(<Wallets />);

        await waitFor(() => {
            expect(screen.getByText('All Wallets')).toBeInTheDocument();
        });

        // Check for wallet rows
        expect(screen.getByText('wallet1')).toBeInTheDocument();
        expect(screen.getByText('user1@example.com')).toBeInTheDocument();
        expect(screen.getByText('$500')).toBeInTheDocument();

        expect(screen.getByText('wallet2')).toBeInTheDocument();
        expect(screen.getByText('user2@example.com')).toBeInTheDocument();
        expect(screen.getByText('$1500')).toBeInTheDocument();
    });
});
