export interface AuthState {
	loggedIn: boolean,
	token: string|null,
}

interface ActionLogin {
	type: 'LOGIN';
	token: string;
}

interface ActionLogout {
	type: 'LOGOUT';
}

type Action = ActionLogin | ActionLogout;

const initialState = {
	loggedIn: true,
	token: null,
}

function login(state: AuthState, token: string) {
	return {
		loggedIn: true,
		token,
	}
}

function logout(state: AuthState) {
	return {
		loggedIn: false,
		token: null,
	}
}

function authReducer(state: AuthState = initialState, action: Action) {
	if (action.type === 'LOGIN') {
		return login(state, action.token);
	}
	if (action.type === 'LOGOUT') {
		return logout(state);
	}
	return { ...state };
}

export default authReducer;
