import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import Input from '../../components/Input/Input';
import TextArea from '../../components/Input/TextArea';
import Button from '../../components/Button/Button';
import { AuthState } from '../../reducers/auth.reducer';
import { History } from 'history';
import './CreateNewsPage.css';
import { API_URL } from '../../config/constants';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

async function handleSubmit(
	event: React.FormEvent,
	history: History,
	title: string,
	content: string,
	token: string|undefined|null,
) {
	event.preventDefault();
	const fetchConfig: RequestInit = {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}` },
		body: JSON.stringify({ title, content }),
	}
	const data = await fetch(API_URL, fetchConfig)
		.then(response => response.json())
		.catch(err => null);
	if (!data) {
		return;
	}
	history.push('/news/list');
}

const CreateNewsPage: React.FunctionComponent<Partial<AuthState>> = (props: Partial<AuthState>) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const history = useHistory();

	return (
		<Container>
			<form className="form" onSubmit={event => handleSubmit(event, history, title, content, props.token)}>
				<Input label="Título" type="text" value={title} onChange={event => setTitle(event.target.value)} />
				<TextArea label="Conteúdo" value={content} onChange={event => setContent(event.target.value)} />
				<Button text="Enviar" />
			</form>
		</Container>
	);
}
 
export default connect(mapStateToProps)(CreateNewsPage);