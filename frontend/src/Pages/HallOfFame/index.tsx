import React, { useEffect, useState } from 'react';

import { useModal } from '../../hooks/useModal';
import { Container, Medals } from './styles';

import Medal from '../../Components/Medal/Medal';
import Modal from '../../Components/Modal';
import api from '../../services/api';

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

	const {isOpen, toggle} = useModal();

	useEffect(() => {
		api.get<Medal[]>('/medals')
			.then(({data}) => {
				setMedals(data);
			});

		api.get<MedalsQuantity>('/medals/count')
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
			<button onClick={toggle}>Create Medal</button>
			<Modal isOpen={isOpen} toggle={toggle}/>
		</Container>
	);
};

export default HallOfFame;
