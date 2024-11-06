// Auth.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Auth from '../views/Auth';
import { MemoryRouter } from 'react-router-dom';
import ContextState from '../context/ContextStates';

test('renders Login component by default', () => {
	render(
		<MemoryRouter>
			<ContextState>
				<Auth />
			</ContextState>
		</MemoryRouter>
	);
	expect(screen.getByText(/Please sign in below/i)).toBeInTheDocument();
});

test('switches to SignUp component when "Sign Up" button is clicked', async () => {
	render(
		<MemoryRouter>
			<ContextState>
				<Auth />
			</ContextState>
		</MemoryRouter>
	);
	userEvent.click(screen.getByText(/Sign Up/i));
	expect(
		await screen.findByText(/Please sign up below/i)
	).toBeInTheDocument();
});
