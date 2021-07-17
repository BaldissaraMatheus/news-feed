import React from 'react';
import { News } from '../../components/News/News';
import { News as NewsModel } from '../../models/News';
import './NewsPage.css';

const news: NewsModel = {
	id: '123',
	title: 'Notícia',
	content: 'asdasfas',
	createdAt: new Date(),
}

export const NewsPage: React.FunctionComponent = () => {
	return (
			<main className="container">
				<News news={news} />
			</main>
	);
}
 