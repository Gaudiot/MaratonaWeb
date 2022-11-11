import React from 'react';
import { Route, Routes as RoutesDom } from 'react-router-dom';

import PageNotFound from '../Pages/PageNotFound';
import Profile from '../Pages/Profile';
import SignUp from '../Pages/SignUp';

const Routes: React.FC = () => {
	return (
		<RoutesDom>
			<Route path="/profile" element={<Profile/>}>
				<Route path=":profileId" element={<Profile/>}/>
			</Route>
			<Route path="/signup" element={<SignUp/>}/>
			<Route path="*" element={<PageNotFound/>}/>
		</RoutesDom>
	);
};

export default Routes;