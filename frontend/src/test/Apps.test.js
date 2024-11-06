import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import ContextState from '../context/ContextStates';
import { MetaMaskProvider } from 'metamask-react';

test('renders Auth component on default route', () => {
	render(
		<ContextState>
			<MemoryRouter initialEntries={['/']}>
				<MetaMaskProvider>
					<App />
				</MetaMaskProvider>
			</MemoryRouter>
		</ContextState>
	);
	expect(screen.getByText(/Please sign in below/i)).toBeInTheDocument();
});

test('renders Home component on /home route', () => {
	localStorage.setItem('usertoken', 'mockedToken');

	render(
		<ContextState>
			<MemoryRouter initialEntries={['/home']}>
				<MetaMaskProvider>
					<App />
				</MetaMaskProvider>
			</MemoryRouter>
		</ContextState>
	);

	expect(screen.getByText(/Add Title/i)).toBeInTheDocument();
	localStorage.removeItem('usertoken');
});
