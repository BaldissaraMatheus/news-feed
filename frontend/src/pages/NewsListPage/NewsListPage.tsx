import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import News from '../../components/News/News';
import { News as INews } from '../../models/News';
import { connect } from 'react-redux';
import { AuthState } from '../../reducers/auth.reducer';
import './NewsListPage.css';
import { sendRequest } from '../../utils/api';

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

async function getNewsList(
	token: string|undefined|null,
	setNewsListFn: Function,
	setErrorMsg: Function,
) {
	const data = await sendRequest('GET', '/news', token, null, setErrorMsg);
	if (!data) {
		return;
	}
	setNewsListFn(data);
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
				{
					newsList.length
						? buildNewsItems(newsList)
						: <p>There are no news yet, try publishing a new one!</p>
				}
			</div>
		</Container>
	);
};
 
export default connect(mapStateToProps)(NewsListPage);