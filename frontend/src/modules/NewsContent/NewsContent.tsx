import React from 'react';
import { News } from '../../components/News/News';
import { News as NewsModel } from '../../models/News';

const news: NewsModel = {
	id: '123',
	title: 'Notícia',
	content: 'asdasfas',
	createdAt: new Date(),
}

export const NewsContent: React.FunctionComponent = () => {
	return (
			<main className="container">
				<News news={news} />
			</main>
	);
}
 