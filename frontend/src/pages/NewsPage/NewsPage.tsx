import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import News from '../../components/News/News';
import { News as INews } from '../../models/News';
import { AuthState } from '../../reducers/auth.reducer';
import { sendRequest } from '../../utils/api';

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

async function getNews(
	id: string,
	token: string | null | undefined,
	setNews: Function,
	setErrorMsg: Function
) {
	const data = await sendRequest('GET', `/news/${id}`, token, null, setErrorMsg);
	if (!data) {
		return;
	}
	return setNews(data);
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