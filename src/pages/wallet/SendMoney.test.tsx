import { screen, fireEvent } from '@testing-library/react';
import SendMoney from './SendMoney';
import { vi, describe, it, expect } from 'vitest';
import { renderWithAuth, mockAuthenticatedUser } from '../../test-utils';

// Mock Material-UI components
vi.mock('@mui/material', () => ({
    Box: ({ children }: any) => <div>{children}</div>,
    Typography: ({ children }: any) => <div>{children}</div>,
    Container: ({ children }: any) => <div>{children}</div>,
    TextField: ({ label, ...props }: any) => (
        <input
            aria-label={label}
            {...props}
        />
    ),
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    ),
    Paper: ({ children }: any) => <div>{children}</div>,
    InputAdornment: ({ children }: any) => <div>{children}</div>,
    CircularProgress: () => <div>Loading...</div>,
}));

// Mock Material-UI icons
vi.mock('@mui/icons-material', () => ({
    Person: () => <div>Person Icon</div>,
    AttachMoney: () => <div>Money Icon</div>,
    Note: () => <div>Note Icon</div>,
    Send: () => <div>Send Icon</div>,
}));

describe('SendMoney', () => {
    it('renders send money form', () => {
        renderWithAuth(<SendMoney />, { authProps: mockAuthenticatedUser });
        expect(screen.getByLabelText('Recipient Email or Phone')).toBeInTheDocument();
        expect(screen.getByLabelText('Amount')).toBeInTheDocument();
        expect(screen.getByLabelText('Note (optional)')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Send Money' })).toBeInTheDocument();
    });
}); 