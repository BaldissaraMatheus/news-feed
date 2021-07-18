import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Container } from '../../components/Container/Container';
import { Input } from '../../components/Input/Input';
import { API_URL } from '../../config/constants';
import { History } from 'history';
import { AuthState } from '../../reducers/auth.reducer';
import { connect } from 'react-redux';

interface RegisterPageProps extends Partial<AuthState> {
	register: Function,
}

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

async function handleSubmit(
	event: React.FormEvent,
	history: History,
	email: string,
	password: string,
	token: string|undefined|null,
) {
	event.preventDefault();
	const fetchConfig: RequestInit = {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify({ email, password }),
	}
	const data = await fetch(API_URL, fetchConfig)
		.then(response => response.json())
		.catch(err => null);
	if (!data) {
		// TODO fazer tratamento de erro
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
			<form className="form" onSubmit={event => handleSubmit(event, history, emailValue, passwordValue, props.token)}>
				<h1 className="title">Criar uma conta</h1>
				<Input label="Email" type="text" onChange={event => setEmail(event.target.value)} />
				<Input label="Password" type="password" onChange={event => setPassword(event.target.value)} />
				<Button text="Cadastrar" />
			</form>
		</Container>
	);
}
 
export default connect(mapStateToProps)(RegisterPage);
