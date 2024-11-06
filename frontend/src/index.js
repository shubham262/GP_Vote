import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ContextState from './context/ContextStates';
import { MetaMaskProvider } from 'metamask-react';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<ContextState>
		<BrowserRouter>
			<MetaMaskProvider>
				<App />
			</MetaMaskProvider>
		</BrowserRouter>
	</ContextState>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
