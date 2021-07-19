import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import TextArea from '../../components/Input/TextArea';
import Button from '../../components/Button/Button';
import './PublishForm.css';

interface PublishFormProps {
	onSubmit: Function;
	title?: string;
	content?: string;
}

function handleSubmit(event: React.FormEvent, title: string, content: string, onSubmit: Function) {
	event.preventDefault();
	return onSubmit(title, content);
}

const PublishForm: React.FunctionComponent<PublishFormProps> = (props: PublishFormProps) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	useState(() => {
		if (props.title) {
			setTitle(props.title);
		}
		if (props.content) {
			setContent(props.content);
		}
	});

	return (
		<Container>
			<form className="form" onSubmit={event => handleSubmit(event, title, content, props.onSubmit)}>
				<Input label="Título" type="text" value={title} onChange={event => setTitle(event.target.value)} />
				<TextArea label="Conteúdo" value={content} onChange={event => setContent(event.target.value)} />
				<Button text="Enviar" />
			</form>
		</Container>
	);
}
 
export default PublishForm;