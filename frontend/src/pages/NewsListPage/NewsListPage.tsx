import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import News from '../../components/News/News';
import { News as INews } from '../../models/News';
import { connect } from 'react-redux';
import { AuthState } from '../../reducers/auth.reducer';
import './NewsListPage.css';
import { sendRequest } from '../../utils/api';
import SearchContext from '../../contexts/search.context';

function mapStateToProps(state: AuthState) {
	return { token: state.token };
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
	const searchValue = useContext(SearchContext);

	async function getNewsList(
		token: string|undefined|null,
		setNewsListFn: Function,
		setErrorMsg: Function,
	) {
		let path = '/news';
		if (searchValue) {
			path += `?search=${searchValue}`
		}
		const data = await sendRequest('GET', path, token, null, setErrorMsg);
		if (!data) {
			return;
		}
		setNewsListFn(data);
	}

	useEffect(() => {
		getNewsList(props.token, setNewsList, setErrorMessage);
	}, [props.token, searchValue])

	return (
		<Container>
			<div className="news-list">
				<ErrorMessage msg={errorMsgValue} />
				{
					newsList.length
						? buildNewsItems(newsList)
						: <p>{
							searchValue
								? 'There are no results for this search input'
								: 'There are no news yet, try publishing a new one!'
							}
						</p>
				}
			</div>
		</Container>
	);
};
 
export default connect(mapStateToProps)(NewsListPage);