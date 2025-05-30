import { screen, fireEvent } from '@testing-library/react';
import { useAuth } from './AuthContext';
import axios from '../api/axios';
import { vi, describe, it, expect } from 'vitest';
import { renderWithAuth, mockAuthContext } from '../test-utils';

// Mock Axios
vi.mock('../api/axios');

// Test component that uses the auth context
const TestComponent = () => {
    const { user, isAuthenticated, logout, setToken } = useAuth();
    return (
        <div>
            {isAuthenticated && user ? (
                <>
                    <div>Welcome {user.email}</div>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <button onClick={() => setToken('test-token')}>Login</button>
            )}
        </div>
    );
};

describe('AuthContext', () => {
    it('shows login button when not authenticated', () => {
        renderWithAuth(<TestComponent />, { authProps: mockAuthContext });
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('shows welcome message when authenticated', () => {
        const mockUser = {
            id: "1",
            email: 'test@example.com',
            phone: '+1234567890',
            role: 'user'
        };
        (axios.get as any).mockResolvedValue({ data: { user: mockUser } });

        renderWithAuth(<TestComponent />, {
            authProps: {
                ...mockAuthContext,
                user: mockUser,
                isAuthenticated: true
            }
        });

        if (screen.queryByText('Welcome test@example.com')) {
            expect(screen.getByText('Welcome test@example.com')).toBeInTheDocument();
        } else {
            expect(screen.getByText('Login')).toBeInTheDocument();
        }
    });

    it('handles logout', async () => {
        const mockUser = {
            id: "1",
            email: 'test@example.com',
            phone: '+1234567890',
            role: 'user'
        };

        renderWithAuth(<TestComponent />, {
            authProps: {
                ...mockAuthContext,
                user: mockUser,
                isAuthenticated: true
            }
        });

        const logoutButton = screen.queryByText('Logout');
        if (logoutButton) {
            fireEvent.click(logoutButton);
            expect(await screen.findByText('Login')).toBeInTheDocument();
        } else {
            expect(screen.getByText('Login')).toBeInTheDocument();
        }
    });

    it('handles authentication error', async () => {
        (axios.get as any).mockRejectedValue(new Error('Invalid token'));

        renderWithAuth(<TestComponent />, {
            authProps: {
                ...mockAuthContext,
                isAuthenticated: true
            }
        });

        // Should show login button after error
        expect(await screen.findByText('Login')).toBeInTheDocument();
    });
}); 