import { render, screen, waitFor } from '@testing-library/react';
import AdminUsers from './Users';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import axios from '../../api/axios';

vi.mock('../../api/axios');

const mockUsers = [
    {
        id: '1',
        email: 'alice@example.com',
        phone: '1234567890',
        role: 'admin',
        is_verified: true,
        wallet: { balance: 200 },
    },
    {
        id: '2',
        email: 'bob@example.com',
        phone: '0987654321',
        role: 'user',
        is_verified: false,
        wallet: { balance: 50 },
    },
];

describe('AdminUsers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders a list of users', async () => {
        (axios.get as any).mockResolvedValue({ data: mockUsers });

        render(<AdminUsers />);

        await waitFor(() => {
            expect(screen.getByText('All Users')).toBeInTheDocument();
        });

        // Check content
        expect(screen.getByText('alice@example.com')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
        expect(screen.getByText('$200')).toBeInTheDocument();
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();

        expect(screen.getByText('bob@example.com')).toBeInTheDocument();
        expect(screen.getByText('0987654321')).toBeInTheDocument();
        expect(screen.getByText('$50')).toBeInTheDocument();
        expect(screen.getByText('user')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
    });
});
