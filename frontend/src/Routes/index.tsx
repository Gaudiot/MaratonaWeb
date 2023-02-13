import React from 'react';
import { Route, Routes as RoutesDom } from 'react-router-dom';

import Profile from '../Pages/Profile';
import SignUp from '../Pages/SignUp';
import HallOfFame from '../Pages/HallOfFame';
import PageNotFound from '../Pages/PageNotFound';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Members from '../Pages/Members';

const Routes: React.FC = () => {
	return (
		<RoutesDom>
			<Route path="/" element={<Dashboard/>}/>
			<Route path="/profile" element={<Profile/>}>
				<Route path=":profileId" element={<Profile/>}/>
			</Route>
			<Route path="/login" element={<Login/>}/>
			<Route path="/signup" element={<SignUp/>}/>
			<Route path="/halloffame" element={<HallOfFame/>}/>
			<Route path="/members" element={<Members/>} />
			<Route path="*" element={<PageNotFound/>}/>
		</RoutesDom>
	);
};

export default Routes;