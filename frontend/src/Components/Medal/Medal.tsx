import React from 'react';
import { Link } from 'react-router-dom';
import { Container, MedalContainer, MedalImage, MedalInfo } from './styles';

interface MedalProps {
	details: {
		id: string;
		position: 'gold' | 'silver' | 'bronze' | 'other';
		contest_name: string;
		medalist_id: string;
	};
}

const Medal: React.FC<MedalProps> = ({ details }) => {
	const {position, contest_name, medalist_id} = details;

	return (
		<Container>
			<MedalContainer>
				<Link to={`/profile/${medalist_id}`}>
					<MedalImage position={position} />
				</Link>
				<MedalInfo>
					<span>{contest_name}</span>
				</MedalInfo>
			</MedalContainer>
		</Container>
	);
};

export default Medal;