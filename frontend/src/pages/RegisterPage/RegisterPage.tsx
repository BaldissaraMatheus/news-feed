import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Container } from '../../components/Container/Container';
import { Input } from '../../components/Input/Input';
import { API_URL } from '../../config/constants';
import { History } from 'history';

interface RegisterPageProps {
	register: Function,
}

async function handleSubmit(event: React.FormEvent, history: History) {
	event.preventDefault();
	const data = await fetch(API_URL)
		.then(response => response.json())
		.catch(err => null);
	if (!data) {
		// TODO fazer tratamento de erro
		return;
	}
	history.push('/login');
}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = (props: RegisterPageProps) => {
	const history = useHistory();

	return (
		<Container>
			<form className="form" onSubmit={event => handleSubmit(event, history)}>
				<h1 className="title">Criar uma conta</h1>
				<Input label="Email" type="text" />
				<Input label="Password" type="password" />
				<Button text="Cadastrar" />
			</form>
		</Container>
	);
}
 
export default RegisterPage;
