import React, { useState } from 'react';
import { connect } from 'react-redux';
import { News as INews } from '../../models/News';
import { AuthState } from '../../reducers/auth.reducer';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { History } from 'history';
import './News.css';
import { useHistory } from 'react-router-dom';
import { sendRequest } from '../../utils/api';

export interface NewsProps extends Partial<AuthState> {
	news: INews,
	showButtons?: boolean,
}

async function deleteNews(
	id: string,
	token: string | null | undefined,
	history: History,
	setErrorMsg: Function
) {
	const data = await sendRequest('DELETE', `/news/${id}`, token, null, setErrorMsg);
	if (data) {
		return history.push('/news/list');
	}
}

function goToEditPage(id: string, history: History) {
	return history.push(`/news/list/${id}/edit`);
}

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

const News: React.FunctionComponent<NewsProps> = (props: NewsProps) => {
	const [errorMsgValue, setErrorMessage] = useState('');
	const history = useHistory();

	return (
		<main className="container">
			{ props.showButtons
				? <div className="buttons">
						<Button
							text="Editar"
							onClick={() => goToEditPage(props.news._id, history)}
						/>
						<Button
							text="Deletar"
							danger={true}
							onClick={() => deleteNews(
								props.news._id, props.token, history, setErrorMessage,
							)}
						/>
					</div>
				: null
			}
				<ErrorMessage msg={errorMsgValue} />
			<div className="news">
				<h1 className="news__title">{ props.news.title }</h1>
				<h4 className="news__date">Publicada em {
					new Date(props.news.createdAt).toLocaleDateString('pt-BR')
				}</h4>
				<p className="news__content">{ props.news.content }</p>
			</div>
		</main>
)};

export default connect(mapStateToProps)(News);
