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
	goldQuantity: number;
	silverQuantity: number;
	bronzeQuantity: number;
	otherQuantity: number;
}

interface IResponse {
	medals: Medal[];
	medalsQuantity: MedalsQuantity;
}

const HallOfFame: React.FC = () => {
	
	const goldDetails: Medal = {
		id: '1',
		position: 'gold',
		contest_name: 'gold contest',
		medalist_id: '1'
	};
	
	const silverDetails: Medal = {
		id: '1',
		position: 'silver',
		contest_name: 'silver contest',
		medalist_id: '2'
	};

	const bronzeDetails: Medal = {
		id: '1',
		position: 'bronze',
		contest_name: 'bronze contest',
		medalist_id: '3'
	};
	
	const otherDetails: Medal = {
		id: '1',
		position: 'other',
		contest_name: 'other contest',
		medalist_id: '4'
	};

	const mockMedals: Medal[] = [goldDetails, silverDetails, bronzeDetails, otherDetails,goldDetails, silverDetails, bronzeDetails, otherDetails,goldDetails, silverDetails, bronzeDetails, otherDetails];
	
	const [medals, setMedals] = useState<Medal[]>(mockMedals);
	const [medalsQuantity, setMedalsQuantity] = useState<MedalsQuantity>({goldQuantity: 0, silverQuantity: 0, bronzeQuantity: 0, otherQuantity: 0});

	// useEffect(() => {
	// 	api.get<IResponse>('/medals')
	// 		.then(({data}) => {
	// 			// setMedals(data.medals);
	// 		});
	// }, []);

	return (
		<Container>
			<span>{`Gold = ${medalsQuantity.goldQuantity}`}</span><br/>
			<span>{`Silver = ${medalsQuantity.silverQuantity}`}</span><br/>
			<span>{`Bronze = ${medalsQuantity.bronzeQuantity}`}</span><br/>
			<span>{`Other = ${medalsQuantity.otherQuantity}`}</span><br/>
			<Medals>
				{medals.map((medal, idx) => (
					<Medal key={idx} details={medal}/>
				))}
			</Medals>
		</Container>
	);
};

export default HallOfFame;
