import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import { API_URL } from '../../config/constants';
import { History } from 'history';
import { AuthState } from '../../reducers/auth.reducer';

interface RegisterPageProps extends Partial<AuthState> {
	register: Function,
}

async function handleSubmit(
	event: React.FormEvent,
	history: History,
	email: string,
	password: string,
) {
	event.preventDefault();
	const fetchConfig: RequestInit = {
		method: 'POST',
		body: JSON.stringify({ email, password }),
	}
	const data = await fetch(API_URL, fetchConfig)
		.then(response => response.json())
		.catch(err => null);
	if (!data) {
		return;
	}
	history.push('/login');
}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = (props: RegisterPageProps) => {
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');
	const history = useHistory();

	return (
		<Container>
			<form className="form" onSubmit={event => handleSubmit(event, history, emailValue, passwordValue)}>
				<h1 className="title">Criar uma conta</h1>
				<Input label="Email" type="text" onChange={event => setEmail(event.target.value)} />
				<Input label="Password" type="password" onChange={event => setPassword(event.target.value)} />
				<Button text="Cadastrar" />
			</form>
		</Container>
	);
}
 
export default RegisterPage;