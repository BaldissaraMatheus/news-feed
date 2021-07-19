import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { History } from 'history';
import { AuthState } from '../../reducers/auth.reducer';
import { sendRequest } from '../../utils/api';

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
	const data = await sendRequest('POST', '/register', null, { email, password }, setErrorMsg);
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