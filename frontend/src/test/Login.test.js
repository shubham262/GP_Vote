// Login.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../components/Login';
import { MemoryRouter } from 'react-router-dom';
import ContextState from '../context/ContextStates';

test('allows user to enter email and password', () => {
	render(
		<MemoryRouter>
			<ContextState>
				<Login updateStage={() => {}} />
			</ContextState>
		</MemoryRouter>
	);

	const emailInput = screen.getByPlaceholderText(/you@gmail.com/i);
	userEvent.type(emailInput, 'test@example.com');
	expect(emailInput.value).toBe('test@example.com');

	const passwordInput = screen.getByPlaceholderText(/Enter password/i);
	userEvent.type(passwordInput, 'password');
	expect(passwordInput.value).toBe('password');
});
