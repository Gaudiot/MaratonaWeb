import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

import Routes from './Routes';

import GlobalStyle from './styles/global';

function App() {
	return (
		<Router>
			<Navbar/>
			<Routes/>
			
			<GlobalStyle/>
		</Router>
	);
}

export default App;
