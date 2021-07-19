import React, { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { AuthState } from '../../reducers/auth.reducer';
import { History } from 'history';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PublishForm from '../../components/PublishForm/PublishForm';
import { News as INews } from '../../models/News';
import './EditNewsPage.css'
import { sendRequest } from '../../utils/api';

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

async function getNews(
	id: string,
	token: string | null | undefined,
	setNews: Function,
	setErrorMsg: Function
) {
	const data = await sendRequest('GET', `/news/${id}`, token, null, setErrorMsg);
	if (data) {
		setNews(data);
	}
}

async function handleSubmit(
	id: string,
	title: string,
	content: string,
	token: string|undefined|null,
	history: History,
	setErrorMsg: Function,
) {
	const data = await sendRequest('PATCH', `/news/${id}`, token, { title, content }, setErrorMsg);
	if (data) {
		return history.push('/news/list');
	}
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