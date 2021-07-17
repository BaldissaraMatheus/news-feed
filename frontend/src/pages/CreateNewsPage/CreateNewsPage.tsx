import React, { useState } from 'react';
import { Container } from '../../components/Container/Container';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/Input/TextArea';
import { Button } from '../../components/Button/Button';
import './CreateNewsPage.css';

export const CreateNewsPage: React.FunctionComponent = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	function handleSubmit(event: React.FormEvent) {
		event.preventDefault();
		console.log({ title, content });
	}

	return (
		<Container>
			<form className="form" onSubmit={handleSubmit}>
				<Input label="Título" />
				<TextArea label="Conteúdo" />
				<Button text="Enviar" />
				{/* <input type="submit" value="Submit" /> */}
			</form>
		</Container>
	);
}
 