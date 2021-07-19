import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import News from '../../components/News/News';
import { News as INews } from '../../models/News';
import { connect } from 'react-redux';
import { AuthState } from '../../reducers/auth.reducer';
import { API_URL } from '../../config/constants';
import './NewsListPage.css';

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

// TODO encapsular em service
async function getNewsList(
	token: string|undefined|null,
	setNewsListFn: Function,
	setErrorMsg: Function,
) {
	const fetchConfig: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	}
	const data = await fetch(`${API_URL}/news`, fetchConfig);
	if (!data.ok) {
		data.text().then(text => setErrorMsg(text));
		return null;
	};
	const news = await data.json();
	setNewsListFn(news);
}

function buildNewsItems(newsList: INews[]) {
	return newsList.map(news => (
		<div key={news._id} className="news__item">
			<Link to={`/news/list/${news._id}`} key={news._id} className="news__item-link">
				<News news={news} />
			</Link>
		</div>
	));
}

const NewsListPage: React.FunctionComponent<Partial<AuthState>> = (props: Partial<AuthState>) => {
	const [newsList, setNewsList] = useState([]);
	const [errorMsgValue, setErrorMessage] = useState('');
	useEffect(() => {
		getNewsList(props.token, setNewsList, setErrorMessage);
	}, [props.token])

	return (
		<Container>
			<div className="news-list">
				<ErrorMessage msg={errorMsgValue} />
				{ buildNewsItems(newsList) }
			</div>
		</Container>
	);
};
 
export default connect(mapStateToProps)(NewsListPage);