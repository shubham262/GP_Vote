import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Auth from './views/Auth';
import AuthWrapper from './layouts/AuthWrapper';

function App() {
	return (
		<div className="App">
			<div className="backgroundWrapper"></div>
			{/* routes */}
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route
					path="/home"
					element={
						<AuthWrapper>
							<Home />
						</AuthWrapper>
					}
					exact={true}
				/>
			</Routes>
		</div>
	);
}

export default App;
