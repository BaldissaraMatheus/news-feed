import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/Container/Container';
import { News as NewsModel } from '../../models/News';
import { News } from '../../components/News/News';
import './NewsListPage.css';

const newsList: NewsModel[]  = [
	{ id: '1', title: 'Notícia', content: 'Conteúdo', createdAt: new Date() },
	{ id: '2', title: 'Notícia', content: 'Conteúdo', createdAt: new Date() },
]
const newsItems = newsList.map(news => (
	<div key={news.id} className="news__item">
		<Link to={`/news/list/${news.id}`} key={news.id} className="news__item-link">
			<News news={news} />
		</Link>
	</div>
));

const NewsListPage: React.FunctionComponent = () => (
	<Container>
		<div className="news-list">
			{ newsItems }
		</div>
	</Container>
);
 
export default NewsListPage;
