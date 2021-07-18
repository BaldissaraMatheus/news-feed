import 'normalize.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from './components/Header/Header';
import { CreateNewsPage } from './pages/CreateNewsPage/CreateNewsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { NewsListPage } from './pages/NewsListPage/NewsListPage';
import { NewsPage } from './pages/NewsPage/NewsPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { AuthState } from './reducers/auth.reducer';
import HomePage from './pages/HomePage/HomePage';
import LogoutPage from './pages/LogoutPage/LogoutPage';

function mapStateToProps(state: AuthState) {
	return { loggedIn: state.loggedIn };
}

function App(props: Partial<AuthState>) {
  const navbarItems = props.loggedIn
  ? [
    { title: 'Publicar', link: '/news/create' },
    { title: 'Sair da conta', link: '/logout', danger: true }
  ]
  : [
    { title: 'Entrar', link: '/login' },
    { title: 'Cadastrar', link: '/register' }
  ];

  return (
    <Router>
        <Header navbarItems={navbarItems} />
        <Switch>
          <Route path="/news/list" exact component={ NewsListPage } />
          <Route path="/news/list/:id" component={ NewsPage } />
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
