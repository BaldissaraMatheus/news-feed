import 'normalize.css';
import React, { useState } from 'react';
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
import SearchInput from './components/SearchInput/SearchInput';
import SearchContext from './contexts/search.context';

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

  const [searchValue, setSearchValue] = useState('');

  return (
    <Router>
      <Header navbarItems={navbarItems}>
        {
          props.loggedIn
            ? <SearchInput onInputChange={setSearchValue} />
            : <></>
        }
      </Header>
      <SearchContext.Provider value={searchValue}>
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
      </SearchContext.Provider>
    </Router>
  );
}

export default connect(mapStateToProps)(App)
