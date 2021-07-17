import 'normalize.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { CreateNewsPage } from './pages/CreateNewsPage/CreateNewsPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { NewsListPage } from './pages/NewsListPage/NewsListPage';
import { NewsPage } from './pages/NewsPage/NewsPage';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/news/list" exact component={ NewsListPage } />
        <Route path="/news/list/:id" component={ NewsPage } />
        <Route path="/news/create" component={ CreateNewsPage } />
        <Route path="/login" component={ LoginPage } />
      </Switch>
    </Router>
  );
}

export default App;
