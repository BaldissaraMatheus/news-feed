import 'normalize.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { NewsListPage } from './pages/NewsListPage/NewsListPage';
import { NewsPage } from './pages/NewsPage/NewsPage';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/:id" component={ NewsPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/" component={ NewsListPage } />
      </Switch>
    </Router>
  );
}

export default App;
