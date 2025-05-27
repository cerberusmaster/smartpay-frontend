import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import { vi, describe, it, expect } from 'vitest';
import { useAuth } from '../../context/AuthContext';

// Mock useAuth
vi.mock('../../context/AuthContext', () => ({
    useAuth: vi.fn(),
}));

describe('RequireAuth', () => {
    it('renders child route when authenticated', () => {
        useAuth.mockReturnValue({ isAuthenticated: true });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route element={<RequireAuth />}>
                        <Route path="/protected" element={<div>Protected Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Protected Content')).toBeInTheDocument();
    });

    it('redirects to /login when not authenticated', () => {
        useAuth.mockReturnValue({ isAuthenticated: false });

        render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route element={<RequireAuth />}>
                        <Route path="/protected" element={<div>Protected Content</div>} />
                    </Route>
                    <Route path="/login" element={<div>Login Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Login Page')).toBeInTheDocument();
    });
});
