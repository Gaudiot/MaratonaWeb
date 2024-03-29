import React, { useCallback, useRef } from 'react';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../Components/Input/Input';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container } from './styles';

interface SingUpFormData {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface User {
	id: string;
	username: string;
	email: string;
}

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const formRef = useRef<FormHandles>(null);

	const handleSubmit = useCallback(async (formData: SingUpFormData) => {
		try{
			const schema = Yup.object().shape({
				username: Yup.string().required('Username is required').matches(/^[A-Za-z]*$/, 'Only letters. No spaces allowed'),
				email: Yup.string().required('E-mail is required').email('Not a valid email address'),
				password: Yup.string().required('Password is required'),
				confirmPassword: Yup.string().required('Confirm your password').oneOf([Yup.ref('password')], 'Passwords do not match')
			});
	
			await schema.validate(formData, {
				abortEarly: false
			});
			
			const {username, email, password} = formData;
			await api.post<User>('/user', {
				username,
				email,
				password
			});

			navigate('/login');
		}catch(err){
			if(err instanceof Yup.ValidationError){
				const formErrors = getValidationErrors(err);

				formRef.current?.setErrors(formErrors);

				return;
			}
			
			return;
		}
	}, [navigate]);

	return (
		<Container>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Input name="username" placeholder="username" />
				<Input name="email" placeholder="maratona@cin.ufpe.br" />
				<Input name="password" placeholder="password" type="password" />
				<Input name="confirmPassword" placeholder="confirm password" type="password" />

				<button type="submit">Sign Up</button>
			</Form>
		</Container>
	);
};

export default SignUp;