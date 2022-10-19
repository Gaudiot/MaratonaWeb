import React from 'react';
import { Route, Routes as RoutesDom, BrowserRouter } from 'react-router-dom';

import Profile from '../Pages/Profile';

const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<RoutesDom>
				<Route path="/profile" element={<Profile/>}>
					<Route path=":profileId" element={<Profile/>}/>
				</Route>
			</RoutesDom>
		</BrowserRouter>
	);
};

export default Routes;