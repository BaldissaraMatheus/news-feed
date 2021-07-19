import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { AuthState } from '../../reducers/auth.reducer';
import { History } from 'history';
import { API_URL } from '../../config/constants';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PublishForm from '../../components/PublishForm/PublishForm';
import { News as INews } from '../../models/News';
import './EditNewsPage.css'

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

async function getNews(
	id: string,
	token: string | null | undefined,
	setNews: Function,
	setErrorMsg: Function
) {
	const fetchConfig: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	}
	const data = await fetch(`${API_URL}/news/${id}`, fetchConfig);
	if (!data.ok) {
		data.text().then(text => setErrorMsg(text));
		return null;
	}
	return setNews(await data.json());
}

async function handleSubmit(
	id: string,
	title: string,
	content: string,
	token: string|undefined|null,
	history: History,
	setErrorMsg: Function,
) {
	const fetchConfig: RequestInit = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify({ title, content }),
	}
	const data = await fetch(`${API_URL}/news/${id}`, fetchConfig);
	if (!data.ok) {
		data.text().then(text => setErrorMsg(text));
		return;
	}
	return history.push('/news/list');
}

function renderPublishForm(
	news: INews | null | undefined,
	token: string | null | undefined,
	history: | History,
	setErrorMessage: Function,
) {
	return !!news
		? <PublishForm
			title={news.title}
			content={news.content}
			onSubmit={(title: string, content: string) => handleSubmit(
				news._id, title, content, token, history, setErrorMessage
			)}
		/>
		: null;
}

const EditNewsPage: React.FunctionComponent<Partial<AuthState>> = (props: Partial<AuthState>) => {
	const [errorMsgValue, setErrorMessage] = useState('');
	const [id, setId] = useState('');
	const [news, setNews] = useState(null);

	const history = useHistory();

	useEffect(() => {
		const paths = window.location.pathname.split('/');
		const id = paths[paths.length - 2];
		setId(id);
		getNews(id, props.token, setNews, setErrorMessage);
	}, [props.token]);

	return (
		<Container>
			<div>
				<h1 className="title">{ id }</h1>
				{ renderPublishForm(news, props.token, history, setErrorMessage) }
				<ErrorMessage msg={errorMsgValue} />
			</div>
		</Container>
	);
}
 
export default connect(mapStateToProps)(EditNewsPage);