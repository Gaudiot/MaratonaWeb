import React from 'react';
import { Container } from './styles';

interface MedalProps {
	position: 'gold' | 'silver' | 'bronze';
}

const Medal: React.FC<MedalProps> = ({ position }) => {
	return <Container position={position} />;
};

export default Medal;