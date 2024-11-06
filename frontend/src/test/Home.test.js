// Home.test.js
import { render, screen } from '@testing-library/react';
import Home from '../views/Home';
import ContextState from '../context/ContextStates';
import { MetaMaskProvider } from 'metamask-react';

test('renders title input and Add Title button', () => {
	render(
		<ContextState>
			<MetaMaskProvider>
				<Home />
			</MetaMaskProvider>
		</ContextState>
	);

	expect(screen.getByPlaceholderText(/Type here/i)).toBeInTheDocument();
	expect(screen.getByText(/Add Title/i)).toBeInTheDocument();
});
