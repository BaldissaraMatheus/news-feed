import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { AuthState } from '../../reducers/auth.reducer';
import { History } from 'history';
import { API_URL } from '../../config/constants';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PublishForm from '../../components/PublishForm/PublishForm';

function mapStateToProps(state: AuthState) {
	return { token: state.token };
}

async function handleSubmit(
	title: string,
	content: string,
	token: string|undefined|null,
	history: History,
	setErrorMsg: Function,
) {
	const fetchConfig: RequestInit = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`,
		},
		body: JSON.stringify({ title, content }),
	}
	const data = await fetch(`${API_URL}/news`, fetchConfig)
		.then(response => {
			if (!response.ok) {
				response.text().then(text => setErrorMsg(text));
				return null;
			}
			return response.json()
		});
	if (!data) {
		return;
	}
	history.push('/news/list');
}

const CreateNewsPage: React.FunctionComponent<Partial<AuthState>> = (props: Partial<AuthState>) => {
	const [errorMsgValue, setErrorMessage] = useState('');

	const history = useHistory();

	return (
		<Container>
			<>
				<PublishForm onSubmit={(title: string, content: string) => handleSubmit(
					title, content, props.token, history, setErrorMessage
				)}/>
				<ErrorMessage msg={errorMsgValue} />
			</>
		</Container>
	);
}
 
export default connect(mapStateToProps)(CreateNewsPage);