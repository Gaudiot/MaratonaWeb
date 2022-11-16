import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface LoginCredentials {
	email: string;
	password: string;
}

interface User {
	id: string;
	email: string;
	username: string;
}

interface AuthContextData {
	user: User;
	login(credentials: LoginCredentials): Promise<void>;
	logout(): void;
}

interface AuthData {
	user: User;
	token: string;
}

const AuthContext = createContext({} as AuthContextData);

interface Props {
	children?: React.ReactNode;
}

interface ILoginRequest {
	email: string;
	password: string;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const [data, setData] = useState<AuthData>(() => {
		const token = localStorage.getItem('@MaratonaCIn:token');
		const user = localStorage.getItem('@MaratonaCIn:user');

		if(token && user){
			api.defaults.headers.authorization = `Bearer ${token}`;

			return {token, user: JSON.parse(user)};
		}

		return {} as AuthData;
	});

	const login = useCallback(async ({email, password}: ILoginRequest) => {
		const response = await api.post<AuthData>('/login', {
			email,
			password
		});

		const {token, user} = response.data;

		localStorage.setItem('@MaratonaCIn:token', token);
		localStorage.setItem('@MaratonaCIn:user', JSON.stringify(user));

		api.defaults.headers.authorization = `Bearer ${token}`;

		setData({token, user});
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem('@MaratonaCIn:token');
		localStorage.removeItem('@MaratonaCIn:user');

		setData({} as AuthData);
	}, []);

	return (
		<AuthContext.Provider value={{
			user: data.user,
			login,
			logout
		}}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth(): AuthContextData{
	const context = useContext(AuthContext);

	return context;
}
