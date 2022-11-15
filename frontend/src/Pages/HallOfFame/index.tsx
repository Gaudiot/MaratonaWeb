import React from 'react';
import Medal from '../../Components/Medal/Medal';

const HallOfFame: React.FC = () => {
	return (
		<div>
			<Medal position="gold" />
			<Medal position="silver" />
			<Medal position="bronze" />
		</div>
	);
};

export default HallOfFame;
