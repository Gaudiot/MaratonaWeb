import React, { useEffect, useState } from 'react';

import Medal from '../../Components/Medal/Medal';
import api from '../../services/api';

import { Container, Medals } from './styles';

interface Medal{
	id: string;
	position: 'gold' | 'silver' | 'bronze' | 'other';
	contest_name: string;
	medalist_id: string;
}

interface MedalsQuantity{
	gold: number;
	silver: number;
	bronze: number;
	other: number;
}

interface IResponse {
	medals: Medal[];
	medalsQuantity: MedalsQuantity;
}

const HallOfFame: React.FC = () => {
	const [medals, setMedals] = useState<Medal[]>([]);
	const [medalsQuantity, setMedalsQuantity] = useState<MedalsQuantity>({gold: 0, silver: 0, bronze: 0, other: 0});

	useEffect(() => {
		api.get<IResponse>('/medals')
			.then(({data}) => {
				setMedals(data.medals);
				setMedalsQuantity(data.medalsQuantity);
			});
	}, []);

	return (
		<Container>
			<span>{`Gold = ${medalsQuantity.gold}`}</span><br/>
			<span>{`Silver = ${medalsQuantity.silver}`}</span><br/>
			<span>{`Bronze = ${medalsQuantity.bronze}`}</span><br/>
			<span>{`Other = ${medalsQuantity.other}`}</span><br/>
			<Medals>
				{medals.map((medal, idx) => (
					<Medal key={idx} details={medal}/>
				))}
			</Medals>
		</Container>
	);
};

export default HallOfFame;
