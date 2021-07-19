import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import News from '../../components/News/News';
import { API_URL } from '../../config/constants';
import { News as INews } from '../../models/News';
import { AuthState } from '../../reducers/auth.reducer';

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

async function getNews(
	id: string,
	token: string | null | undefined,
	setNews: Function,
	setErrorMsg: Function
) {
	const fetchConfig: RequestInit = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
	}
	const data = await fetch(`${API_URL}/news/${id}`, fetchConfig);
	if (!data.ok) {
		data.text().then(text => setErrorMsg(text));
		return null;
	}
	return setNews(await data.json());
}

function ComponentToRender(props: { news: INews | null | undefined }) {
	return props.news ? <News news={props.news} showButtons={true} /> : null;
}

const NewsPage: React.FunctionComponent<Partial<AuthState>> = (props: Partial<AuthState>) => {
	const [news, setNews] = useState();
	const [errorMsgValue, setErrorMessage] = useState('');

	useEffect(() => {
		const paths = window.location.pathname.split('/');
		const id = paths[paths.length - 1];
		getNews(id, props.token, setNews, setErrorMessage);
	}, [props.token]);

	return (
		<Container>
			<>
				<ErrorMessage msg={errorMsgValue} />
				<ComponentToRender news={news} />
			</>
		</Container>
	)
};
 
export default connect(mapStateToProps)(NewsPage);