import React, { useEffect, useState } from 'react';
import Blogpost from './Components/Blogpost';
import api from '../../services/api';

interface IBlogpost {
	id: string;
	title: string;
	content: string;
}

interface IBlogpostsResponse {
	blogposts: IBlogpost[];
}

const Dashboard: React.FC = () => {
	const [blogposts, setBlogposts] = useState<IBlogpost[]>([]);

	useEffect(() => {
		api.get<IBlogpostsResponse>('/blogpost')
			.then(({data}) => {
				const {blogposts} = data;
				setBlogposts(blogposts);
			});
	}, []);

	return (
		<div>
			<h1>DashBoard</h1>
			{blogposts.map((blogpost) => (
				<Blogpost key={blogpost.id} details={blogpost} />
			))}
		</div>
	);
};

export default Dashboard;