import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';
import ballon from '../../Images/defaultProfileImage.png';
import { Container, Content, Info } from './styles';

interface ProfileData {
    username: string;
    email: string;
		profile_image_url: string;
}

const Profile: React.FC = () => {
	const params = useParams();
	const [user, setUser] = useState<ProfileData>();

	useEffect(() => {
		api.get(`/user/${params.profileId}`).then(({data}) => {
			setUser(data);
		});
	}, [params.profileId]);

	return (
		<Container>
			<Content>
				<img alt="User profile" src={user?.profile_image_url}/>
				<Info>
					<span>{user?.username}</span>
					<span>{user?.email}</span>
				</Info>
			</Content>
		</Container>
	);
};

export default Profile;