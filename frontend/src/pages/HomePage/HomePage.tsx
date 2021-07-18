import { connect } from "react-redux";
import { Redirect } from "react-router";
import { AuthState } from "../../reducers/auth.reducer";
 
function mapStateToProps(state: AuthState) {
	return { loggedIn: state.loggedIn };
}

const HomePage: React.FunctionComponent<Partial<AuthState>> = (props: Partial<AuthState>) => {
	return props.loggedIn ? <Redirect to="/news/list" /> : <Redirect to="/login" />
}

export default connect(mapStateToProps)(HomePage)
