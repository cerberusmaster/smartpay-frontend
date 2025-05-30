import { screen, waitFor } from '@testing-library/react';
import TransactionHistory from './TransactionHistory';
import axios from '../../api/axios';
import { vi, describe, it, expect } from 'vitest';
import { renderWithAuth, mockAuthenticatedUser } from '../../test-utils';

// Mock Material-UI components and hooks
vi.mock('@mui/material', () => ({
    Box: ({ children, sx, textAlign, mb, display, flexDirection, gap, justifyContent, alignItems }: any) => (
        <div style={{ ...sx, textAlign, marginBottom: mb, display, flexDirection, gap, justifyContent, alignItems }}>
            {children}
        </div>
    ),
    Typography: ({ children, component, sx, fontWeight, color }: any) => {
        const Component = component || 'div';
        return (
            <Component style={{ ...sx, fontWeight, color }}>
                {children}
            </Component>
        );
    },
    Paper: ({ children, sx, elevation }: any) => (
        <div style={{ ...sx, boxShadow: elevation ? '0px 0px 10px rgba(0,0,0,0.1)' : 'none' }}>
            {children}
        </div>
    ),
    Table: ({ children, sx }: any) => <table style={sx}>{children}</table>,
    TableBody: ({ children }: any) => <tbody>{children}</tbody>,
    TableCell: ({ children, align, sx }: any) => <td style={{ textAlign: align, ...sx }}>{children}</td>,
    TableContainer: ({ children, sx }: any) => <div style={sx}>{children}</div>,
    TableHead: ({ children }: any) => <thead>{children}</thead>,
    TableRow: ({ children, sx, hover }: any) => <tr style={{ ...sx, cursor: hover ? 'pointer' : 'default' }}>{children}</tr>,
    Container: ({ children, sx }: any) => <div style={sx}>{children}</div>,
    CircularProgress: () => <div>Loading...</div>,
    Chip: ({ label, color, icon }: any) => (
        <div style={{ 
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '16px',
            backgroundColor: color === 'primary' ? '#1976d2' : 
                           color === 'error' ? '#d32f2f' :
                           color === 'success' ? '#2e7d32' :
                           color === 'warning' ? '#ed6c02' : '#e0e0e0'
        }}>
            {icon}
            {label}
        </div>
    ),
    Divider: ({ sx }: any) => <hr style={sx} />,
    useTheme: () => ({
        breakpoints: {
            down: () => false
        },
        palette: {
            primary: { main: '#1976d2' },
            error: { main: '#d32f2f' },
            success: { main: '#2e7d32' },
            warning: { main: '#ed6c02' },
            text: {
                primary: '#000000',
                secondary: '#666666'
            }
        }
    }),
    useMediaQuery: () => false,
    styled: (component: any) => component,
    alpha: (color: string) => color
}));

// Mock Material-UI icons
vi.mock('@mui/icons-material', () => ({
    TrendingUp: () => <div>Trending Up Icon</div>,
    TrendingDown: () => <div>Trending Down Icon</div>
}));

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
    it('renders transactions after API call', async () => {
        (axios.post as any).mockResolvedValue({ data: mockData });

        renderWithAuth(<TransactionHistory />, { authProps: mockAuthenticatedUser });

        // Check for loading state
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Wait for transactions to load
        await waitFor(() => {
            expect(screen.getByText('Transaction History')).toBeInTheDocument();
        });

        // Check for transaction types
        expect(screen.getByText('Transfer')).toBeInTheDocument();
        expect(screen.getByText('Top-Up')).toBeInTheDocument();

        // Check for transaction amounts
        expect(screen.getByText('-$50')).toBeInTheDocument();
        expect(screen.getByText('+$100')).toBeInTheDocument();

        // Check for transaction status
        expect(screen.getAllByText('completed')).toHaveLength(2);

        // Check for transaction parties
        expect(screen.getByText('receiver@example.com')).toBeInTheDocument();
        expect(screen.getByText('topup@example.com')).toBeInTheDocument();
    });

    it('shows loading state initially', () => {
        renderWithAuth(<TransactionHistory />, { authProps: mockAuthenticatedUser });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('handles API error gracefully', async () => {
        (axios.post as any).mockRejectedValue(new Error('API Error'));

        renderWithAuth(<TransactionHistory />, { authProps: mockAuthenticatedUser });

        // Check for loading state
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Wait for error state
        await waitFor(() => {
            expect(screen.getByText('Transaction History')).toBeInTheDocument();
        });

        // Check that no transactions are shown
        expect(screen.queryByText('Transfer')).not.toBeInTheDocument();
        expect(screen.queryByText('Top-Up')).not.toBeInTheDocument();
    });
}); 