import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
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
	setErrorMsg: Function,
) {
	event.preventDefault();
	const fetchConfig: RequestInit = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ email, password }),
	}
	const data = await fetch(`${API_URL}/register`, fetchConfig)
		.then(response => {
			if (!response.ok) {
				response.text().then(text => setErrorMsg(text));
				return null;
			}
			return response.json()
		});
	if (!data) {
		return;
	}
	history.push('/login');
}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = (props: RegisterPageProps) => {
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');
	const [errorMsgValue, setErrorMessage] = useState('');
	const history = useHistory();

	return (
		<Container>
			<form className="form" onSubmit={event => handleSubmit(
				event, history, emailValue, passwordValue, setErrorMessage
			)}>
				<h1 className="title">Criar uma conta</h1>
				<Input label="Email" type="text" onChange={event => setEmail(event.target.value)} />
				<Input label="Password" type="password" onChange={event => setPassword(event.target.value)} />
				<Button text="Cadastrar" />
				<ErrorMessage msg={errorMsgValue} />
			</form>
		</Container>
	);
}
 
export default RegisterPage;