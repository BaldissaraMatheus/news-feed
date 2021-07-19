import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
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
	setErrorMsg: Function,
) {
	event.preventDefault();
	const fetchConfig: RequestInit = {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ email, password }),
	}
	const data = await fetch(`${API_URL}/login`, fetchConfig)
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
	loginFn(data.token);
	history.push('/news/list');
}

const LoginPage: React.FunctionComponent<LoginPageProps> = (props: LoginPageProps) => {
	const [emailValue, setEmail] = useState('');
	const [passwordValue, setPassword] = useState('');
	const [errorMsgValue, setErrorMessage] = useState('');
	const history = useHistory();

	return (
		<Container>
			<form className="form" onSubmit={event => handleSubmit(
				event, props.login, history, emailValue, passwordValue, setErrorMessage
			)}>
				<h1 className="title">Entrar na sua conta</h1>
				<Input label="Email" type="text" onChange={event => setEmail(event.target.value)} />
				<Input label="Password" type="password" onChange={event => setPassword(event.target.value)} />
				<Button text="Entrar" />
				<ErrorMessage msg={errorMsgValue} />
			</form>
		</Container>
	);
}

export default connect(null, mapDispatchToProps)(LoginPage);
