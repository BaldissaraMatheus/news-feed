import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import { connect } from 'react-redux';
import './LoginPage.css';
import { useHistory } from 'react-router';
import { API_URL } from '../../config/constants';
import { History } from 'history';

interface LoginPageProps {
	login: Function,
}

function mapDispatchToProps(dispatch: Function) {
  return {
		login: (token: string) => dispatch({ type: 'LOGIN', token }),
  };
};

async function handleSubmit(
	event: React.FormEvent,
	loginFn: Function,
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
	loginFn('teste');
	history.push('/news/list');
}

const LoginPage: React.FunctionComponent<LoginPageProps> = (props: LoginPageProps) => {
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');
	const history = useHistory();

	return (
		<Container>
			<form className="form" onSubmit={event => handleSubmit(
				event, props.login, history, emailValue, passwordValue
			)}>
				<h1 className="title">Entrar na sua conta</h1>
				<Input label="Email" type="text" onChange={event => setEmail(event.target.value)} />
				<Input label="Password" type="password" onChange={event => setPassword(event.target.value)} />
				<Button text="Entrar" />
			</form>
		</Container>
	);
}

export default connect(null, mapDispatchToProps)(LoginPage);
