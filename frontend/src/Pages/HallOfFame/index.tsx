import React, { useEffect, useState } from 'react';

import Medal from '../../Components/Medal/Medal';
import api from '../../services/api';

import { Container, Medals } from './styles';

interface Medal{
	id: string;
	position: 'GOLD' | 'SILVER' | 'BRONZE' | 'OTHER';
	contest_name: string;
	medalist_id: string;
}

interface MedalsQuantity{
	gold: number;
	silver: number;
	bronze: number;
	other: number;
}

const HallOfFame: React.FC = () => {
	const [medals, setMedals] = useState<Medal[]>([]);
	const [medalsQuantity, setMedalsQuantity] = useState<MedalsQuantity>({gold: 0, silver: 0, bronze: 0, other: 0});

	useEffect(() => {
		api.get('/medals')
			.then(({data}) => {
				setMedals(data);
			});

		api.get('/medals/count')
			.then(({data}) => {
				setMedalsQuantity(data);
			});
	}, []);

	return (
		<Container>
			<span>{`Gold = ${medalsQuantity.gold}`}</span><br/>
			<span>{`Silver = ${medalsQuantity.silver}`}</span><br/>
			<span>{`Bronze = ${medalsQuantity.bronze}`}</span><br/>
			<span>{`Other = ${medalsQuantity.other}`}</span><br/>
			<Medals>
				{medals.map((medal) => (
					<Medal key={medal.id} details={medal}/>
				))}
			</Medals>
		</Container>
	);
};

export default HallOfFame;
