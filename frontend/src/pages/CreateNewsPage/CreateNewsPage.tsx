import React from 'react';
// import React, { useState } from 'react';
import { Container } from '../../components/Container/Container';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/Input/TextArea';
import { Button } from '../../components/Button/Button';
import { History } from 'history';
import './CreateNewsPage.css';
import { API_URL } from '../../config/constants';
import { useHistory } from 'react-router-dom';

async function handleSubmit(event: React.FormEvent, history: History) {
	event.preventDefault();
	const data = await fetch(API_URL)
		.then(response => response.json())
		.catch(err => null);
	if (!data) {
		return;
	}
	history.push('/news/list');
}

// TODO corrigir
const CreateNewsPage: React.FunctionComponent = () => {
	// const [title, setTitle] = useState('');
	// const [content, setContent] = useState('');

	const history = useHistory();

	return (
		<Container>
			<form className="form" onSubmit={event => handleSubmit(event, history)}>
				<Input label="Título" type="text" />
				<TextArea label="Conteúdo" />
				<Button text="Enviar" />
			</form>
		</Container>
	);
}
 
export default CreateNewsPage;