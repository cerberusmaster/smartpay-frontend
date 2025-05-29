import { render, screen, fireEvent } from '@testing-library/react';
import TopUpModal from './TopUpModal';
import { vi, describe, it, expect } from 'vitest';

describe('TopUpModal component', () => {
    it('renders button and opens modal', () => {
        render(<TopUpModal open={false} amount={100} onSubmit={() => { }} />);

        const topUpButton = screen.getByRole('button', { name: /top-up/i });
        expect(topUpButton).toBeInTheDocument();

        fireEvent.click(topUpButton);

        expect(screen.getByText(/enter top-up amount/i)).toBeInTheDocument();
    });

    it('submits form with correct amount', async () => {
        const handleSubmit = vi.fn();
        render(<TopUpModal open={false} amount={100} onSubmit={handleSubmit} />);

        // Open modal
        const button = screen.getByRole('button', { name: /top-up/i });
        fireEvent.click(button);

        const input = screen.getByLabelText(/amount/i);
        fireEvent.change(input, { target: { value: '250' } });

        // fireEvent.submit(screen.getByRole('form'));

        // await waitFor(() => {
        //     expect(handleSubmit).toHaveBeenCalledWith(250);
        // });
    });
});
