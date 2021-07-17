import React from 'react';
import { news } from './news.mock';

import './Feed.css';
 
export const Feed: React.FunctionComponent = () => {
	return (
		<main className="container">
			<div className="news">
				{ news.map(news => (
					<div className="news__item">
						<img src={news.imageUrl} alt="imagem" className="news__item-image"></img>
						<h2 className="news__item-title">{ news.title }</h2>
						<h3 className="news__item-subtitle">{ news.subtitle }</h3>
						<hr className="news__item-separator" />
					</div>
				)) }
			</div>
		</main>
	);
}
 
