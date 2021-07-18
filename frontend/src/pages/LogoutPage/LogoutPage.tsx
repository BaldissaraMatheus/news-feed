import { connect } from "react-redux";
import { Redirect } from "react-router";
import { API_URL } from "../../config/constants";
import { AuthState } from "../../reducers/auth.reducer";

interface LogoutPageProps extends Partial<AuthState> {
	logout: Function,
}

async function logout(logoutFn: Function) {
	const data = await fetch(API_URL)
		.then(response => response.json())
		.catch(err => null);
	if (!data) {
		// TODO fazer tratamento de erro
		return;
	}
	logoutFn();
}

const LogoutPage: React.FunctionComponent<LogoutPageProps> = (props: LogoutPageProps) => {
	logout(props.logout)
	return props.loggedIn ? (<></>) : <Redirect to="/login" />
}
 
function mapStateToProps(state: AuthState) {
	return { loggedIn: state.loggedIn };
}

function mapDispatchToProps(dispatch: Function) {
  return {
		logout: () => {
			dispatch({ type: 'LOGOUT' });
		},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);

