import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from './context/AuthContext';
import { vi } from 'vitest';

// Custom render function that includes providers
export function renderWithAuth(ui: ReactNode, { authProps = {} } = {}) {
    return render(
        <AuthProvider {...authProps}>
            {ui}
        </AuthProvider>
    );
}

// Mock auth context values
export const mockAuthContext = {
    user: null,
    isAuthenticated: false,
    logout: vi.fn(),
    setToken: vi.fn(),
    reload: vi.fn()
};

// Mock authenticated user
export const mockAuthenticatedUser = {
    user: {
        id: "1",
        email: 'test@example.com',
        phone: '+1234567890',
        role: 'user'
    },
    isAuthenticated: true,
    logout: vi.fn(),
    setToken: vi.fn(),
    reload: vi.fn()
}; 