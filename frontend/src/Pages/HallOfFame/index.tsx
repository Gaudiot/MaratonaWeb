import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import { useModal } from '../../hooks/useModal';
import { Container, Medals } from './styles';

import Medal from '../../Components/Medal/Medal';
import Modal from '../../Components/Modal';
import api from '../../services/api';
import { Form } from '@unform/web';
import Input from '../../Components/Input/Input';
import { FormHandles } from '@unform/core';

interface IMedal{
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

interface CreateMedalFormData {
	position: 'GOLD' | 'SILVER' | 'BRONZE' | 'OTHER',
	contest_name: string;
	contest_date: Date;
	medalist_id: string;
}

const HallOfFame: React.FC = () => {
	const [medals, setMedals] = useState<IMedal[]>([]);
	const [medalsQuantity, setMedalsQuantity] = useState<MedalsQuantity>({gold: 0, silver: 0, bronze: 0, other: 0});

	const formRef = useRef<FormHandles>(null);

	const {isOpen, toggle} = useModal();

	useEffect(() => {
		api.get<IMedal[]>('/medals')
			.then(({data}) => {
				setMedals(data);
			});

		api.get<MedalsQuantity>('/medals/count')
			.then(({data}) => {
				setMedalsQuantity(data);
			});
	}, []);

	const handleSubmit = useCallback(async (formData: CreateMedalFormData) => {
		try{
			const {data: medal} = await api.post<IMedal>('/medal', formData);

			setMedals([medal, ...medals]);
			console.log('batata');
		}catch(err){
			console.log(err);
		}
	}, [medals]);

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
			<Modal isOpen={isOpen} toggle={toggle}>
				<Form ref={formRef} onSubmit={handleSubmit}>
					<Input name="position" placeholder="position" />
					<Input name="contest_name" placeholder="contest name" />
					<Input name="contest_date" placeholder="contest date" />
					<Input name="medalist_id" placeholder="medalist id" />
					<button type="submit">Create</button>
				</Form>
			</Modal>
		</Container>
	);
};

export default HallOfFame;
