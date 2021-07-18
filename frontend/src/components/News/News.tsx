import React from 'react';
import { News as NewsModel } from '../../models/News';
import './News.css';

export interface NewsProps {
	news: NewsModel,
}

const News: React.FunctionComponent<NewsProps> = (props: NewsProps) => (
	<main className="container">
		<div className="news">
			<h1 className="news__title">{ props.news.title }</h1>
			<h4 className="news__date">Publicada em { props.news.createdAt.toLocaleDateString('pt-BR') }</h4>
			<p className="news__content">{ props.news.content }</p>
		</div>
	</main>
)

export default News;
