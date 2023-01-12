import 'normalize.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux'
import { AuthState } from './reducers/auth.reducer';
import Header from './components/Header/Header';
import CreateNewsPage from './pages/CreateNewsPage/CreateNewsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NewsListPage from './pages/NewsListPage/NewsListPage';
import NewsPage from './pages/NewsPage/NewsPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import EditNewsPage from './pages/EditNewsPage/EditNewsPage';

function mapStateToProps(state: AuthState) {
	return { loggedIn: state.loggedIn };
}

function App(props: Partial<AuthState>) {
  const navbarItems = props.loggedIn
  ? [
    { title: 'Publish', link: '/news/create' },
    { title: 'Logout', link: '/logout', danger: true }
  ]
  : [
    { title: 'Login', link: '/login' },
    { title: 'Register', link: '/register' }
  ];

  return (
    <Router>
        <Header navbarItems={navbarItems} />
        <Switch>
          <Route path="/news/list" exact component={ NewsListPage } />
          <Route path="/news/list/:id" exact component={ NewsPage } />
          <Route path="/news/list/:id/edit" exact component={ EditNewsPage } />
          <Route path="/news/create" component={ CreateNewsPage } />
          <Route path="/login" component={ LoginPage } />
          <Route path="/register" component={ RegisterPage } />
          <Route path="/logout" component={ LogoutPage } />
          <Route path="/" component={ HomePage } />
        </Switch>
    </Router>
  );
}

export default connect(mapStateToProps)(App)
