import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { AuthState } from '../../reducers/auth.reducer';
import { History } from 'history';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PublishForm from '../../components/PublishForm/PublishForm';
import { sendRequest } from '../../utils/api';

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
	const data = await sendRequest('POST', '/news', token, { title, content }, setErrorMsg);
	if (data) {
		history.push('/news/list');
	}
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