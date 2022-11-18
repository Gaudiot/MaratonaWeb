import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';

import Input from '../../Components/Input/Input';

import { Form } from '@unform/web';
import { useAuth } from '../../hooks/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { FormHandles } from '@unform/core';

interface LoginFormData {
	email: string;
	password: string;
}

const Login: React.FC = () => {
	const {login} = useAuth();
	const formRef = useRef<FormHandles>(null);
	const navigate = useNavigate();

	const handleSubmit = useCallback(async (formData: LoginFormData) => {
		try{
			const schema = Yup.object().shape({
				email: Yup.string().required('Please enter a email').email('Please enter a valid email'),
				password: Yup.string().required('Please enter a password')
			});

			await schema.validate(formData, {
				abortEarly: false
			});

			await login(formData);

			navigate('/');

		}catch(err){
			if(err instanceof Yup.ValidationError){
				const errors = getValidationErrors(err);

				formRef.current?.setErrors(errors);
			}
			console.log(err);
		}
	}, [login, navigate]);

	return (
		<div>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<Input name="email" placeholder="E-mail" />
				<Input name="password" placeholder="Password" type="password" />
				<button type="submit">Login</button>
			</Form>
		</div>
	);
};

export default Login;
