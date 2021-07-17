import React from 'react';
import { Container } from '../../components/Container/Container';
import { News } from '../../components/News/News';
import { News as NewsModel } from '../../models/News';

const news: NewsModel = {
	id: '123',
	title: 'Notícia',
	content: 'asdasfas',
	createdAt: new Date(),
}

export const NewsPage: React.FunctionComponent = () => {
	return (
		<Container>
			<News news={news} />
		</Container>
	);
}
 