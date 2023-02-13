import React from 'react';

import { Container } from './styles';

interface BlogpostProps {
	details: {
		title: string;
		content: string;
	};
}

const Blogpost: React.FC<BlogpostProps> = ({details}: BlogpostProps) => {
	const {title, content} = details;
	return (
		<Container>
			<h3>{title}</h3>
			<p>{content}</p>
		</Container>
	);
};

export default Blogpost;