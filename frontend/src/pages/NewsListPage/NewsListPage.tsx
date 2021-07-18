import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { News as NewsModel } from '../../models/News';
import News from '../../components/News/News';
import './NewsListPage.css';
import { connect } from 'react-redux';
import { AuthState } from '../../reducers/auth.reducer';
import { API_URL } from '../../config/constants';

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

// const newsList: NewsModel[]  = [
// 	{ id: '1', title: 'Notícia', content: 'Conteúdo', createdAt: new Date() },
// 	{ id: '2', title: 'Notícia', content: 'Conteúdo', createdAt: new Date() },
// ]

async function getNewsList(token: string|undefined|null, setNewsListFn: Function) {
	const fetchConfig: RequestInit = {
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	}
	const data = await fetch(API_URL, fetchConfig)
		.then(response => response.json())
		.catch(err => null);
	if (!data) {
		return;
	}
	setNewsListFn(data);
}

function buildNewsItems(newsList: NewsModel[]) {
	return newsList.map(news => (
		<div key={news.id} className="news__item">
			<Link to={`/news/list/${news.id}`} key={news.id} className="news__item-link">
				<News news={news} />
			</Link>
		</div>
	));
}

const NewsListPage: React.FunctionComponent<Partial<AuthState>> = (props: Partial<AuthState>) => {
	const [newsList, setNewsList] = useState([]);
	getNewsList(props.token, setNewsList);

	return (
		<Container>
			<div className="news-list">
				{ buildNewsItems(newsList) }
			</div>
		</Container>
	);
};
 
export default connect(mapStateToProps)(NewsListPage);