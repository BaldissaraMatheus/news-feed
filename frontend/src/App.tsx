import 'normalize.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { CreateNewsPage } from './pages/CreateNewsPage/CreateNewsPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { NewsListPage } from './pages/NewsListPage/NewsListPage';
import { NewsPage } from './pages/NewsPage/NewsPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

function App() {
  const isLoggedIn = true;
  const navbarItems = isLoggedIn
  ? [
    { title: 'Publicar notícia', link: '/news/create' },
    { title: 'Sair da conta', link: '/logout', danger: true }
  ]
  : [
    { title: 'Entrar', link: '/login' },
    { title: 'Cadastrar', link: '/register' }
  ]

  return (
    <Router>
      <Header navbarItems={navbarItems} />
      <Switch>
        <Route path="/news/list" exact component={ NewsListPage } />
        <Route path="/news/list/:id" component={ NewsPage } />
        <Route path="/news/create" component={ CreateNewsPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
      </Switch>
    </Router>
  );
}

export default App;
