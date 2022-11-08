import React from 'react';
import { Route, Routes as RoutesDom, BrowserRouter } from 'react-router-dom';
import PageNotFound from '../Pages/PageNotFound';

import Profile from '../Pages/Profile';
import SignUp from '../Pages/SignUp';

const Routes: React.FC = () => {
	return (
		<BrowserRouter>
			<RoutesDom>
				<Route path="/profile" element={<Profile/>}>
					<Route path=":profileId" element={<Profile/>}/>
				</Route>
				<Route path="/signup" element={<SignUp/>}/>
				<Route path="*" element={<PageNotFound/>}/>
			</RoutesDom>
		</BrowserRouter>
	);
};

export default Routes;