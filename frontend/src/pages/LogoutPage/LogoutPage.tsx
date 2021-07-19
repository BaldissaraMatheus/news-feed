import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AuthState } from "../../reducers/auth.reducer";

interface LogoutPageProps extends Partial<AuthState> {
	logout: Function,
}

function mapStateToProps(state: AuthState) {
	return { loggedIn: state.loggedIn };
}

function mapDispatchToProps(dispatch: Function) {
  return {
		logout: () => dispatch({ type: 'LOGOUT' }),
  };
}

async function logout(logoutFn: Function) {
	logoutFn();
}

const LogoutPage: React.FunctionComponent<LogoutPageProps> = (props: LogoutPageProps) => {
	logout(props.logout);
	return props.loggedIn ? (<></>) : <Redirect to="/login" />
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
