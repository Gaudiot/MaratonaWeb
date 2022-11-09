import React, { useCallback, useRef } from 'react';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../Components/Input/Input';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

interface SingUpFormData {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const formRef = useRef<FormHandles>(null);

	const handleSubmit = useCallback(async (data: SingUpFormData) => {
		try{
			const schema = Yup.object().shape({
				username: Yup.string().required('Username is required').matches(/^[A-Za-z]*$/, 'Only letters. No spaces allowed'),
				email: Yup.string().required('E-mail is required').email('Not a valid email address'),
				password: Yup.string().required('Password is required'),
				confirmPassword: Yup.string().required('Confirm your password').oneOf([Yup.ref('password')], 'Passwords do not match')
			});
	
			await schema.validate(data, {
				abortEarly: false
			});
			
			const {username, email, password} = data;
			const {data: newUser} = await api.post('/user', {
				username,
				email,
				password
			});

			console.log(newUser);
			navigate(`/profile/${newUser.id}`);
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
		<div>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Input name="username" placeholder="username" />
				<Input name="email" placeholder="maratona@cin.ufpe.br" />
				<Input name="password" placeholder="password" type="password" />
				<Input name="confirmPassword" placeholder="password" type="password" />

				<button type="submit">Sign Up</button>
			</Form>
		</div>
	);
};

export default SignUp;