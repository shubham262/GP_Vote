// SignUp.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from '../components/SignUp';
import ContextState from '../context/ContextStates';
import { MemoryRouter } from 'react-router-dom';

test('allows user to enter username, email, and password', () => {
	render(
		<MemoryRouter>
			<ContextState>
				<SignUp updateStage={() => {}} />
			</ContextState>
		</MemoryRouter>
	);

	const usernameInput = screen.getByPlaceholderText(/username/i);
	userEvent.type(usernameInput, 'testuser');
	expect(usernameInput.value).toBe('testuser');

	const emailInput = screen.getByPlaceholderText(/you@gmail.com/i);
	userEvent.type(emailInput, 'test@example.com');
	expect(emailInput.value).toBe('test@example.com');

	const passwordInput = screen.getByPlaceholderText(/Enter password/i);
	userEvent.type(passwordInput, 'password');
	expect(passwordInput.value).toBe('password');
});
