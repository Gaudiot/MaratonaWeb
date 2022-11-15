import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import { AuthProvider } from './Context/AuthContext';

import Routes from './Routes';

import GlobalStyle from './styles/global';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Navbar/>
				<Routes/>
			</AuthProvider>
			
			<GlobalStyle/>
		</Router>
	);
}

export default App;
