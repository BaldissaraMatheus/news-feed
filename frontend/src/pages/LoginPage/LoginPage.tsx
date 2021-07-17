import React from 'react';
import { Button } from '../../components/Button/Button';
import { Container } from '../../components/Container/Container';
import { Input } from '../../components/Input/Input';
import './LoginPage.css';

export const LoginPage: React.FunctionComponent = () => {
	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
	}

	return (
		<Container>
			<form className="form" onSubmit={handleSubmit}>
				<h1 className="title">Entrar na sua conta</h1>
				<Input label="Email" type="text" />
				<Input label="Password" type="password" />
				<Button text="Entrar" />
			</form>
		</Container>
	);
}
 