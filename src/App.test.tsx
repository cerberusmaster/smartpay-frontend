import { render, screen } from '@testing-library/react';
import App from './App';
import { useAuth } from './context/AuthContext';
import { vi, describe, it, expect } from 'vitest';

// Mock the auth context
vi.mock('./context/AuthContext', () => ({
    useAuth: () => ({
        user: null,
        login: vi.fn(),
        logout: vi.fn()
    })
}));

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('shows login form when user is not authenticated', () => {
        render(<App />);
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('shows dashboard when user is authenticated', () => {
        // Mock authenticated user
        vi.mocked(useAuth).mockReturnValue({
            user: { id: "1", email: 'test@example.com', phone: '+1234567890', role: 'user' },
            isAuthenticated: true,
            logout: vi.fn(),
            setToken: vi.fn(),
            reload: vi.fn()
        });

        render(<App />);
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
}); 