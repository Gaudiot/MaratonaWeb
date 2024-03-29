import React from 'react';
import { Link } from 'react-router-dom';
import { Container, MedalContainer, MedalImage, MedalInfo } from './styles';

interface MedalProps {
	details: {
		id: string;
		position: 'GOLD' | 'SILVER' | 'BRONZE' | 'OTHER';
		contest_name: string;
		medalist_id: string;
		profile_image_url: string;
	};
}

const Medal: React.FC<MedalProps> = ({ details }) => {
	const {position, contest_name, medalist_id, profile_image_url} = details;

	return (
		<Container>
			<MedalContainer>
				<Link to={`/profile/${medalist_id}`}>
					<MedalImage src={profile_image_url} position={position} />
				</Link>
				<MedalInfo>
					<span>{contest_name}</span>
				</MedalInfo>
			</MedalContainer>
		</Container>
	);
};

export default Medal;