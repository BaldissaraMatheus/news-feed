import 'normalize.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Login } from './modules/Login/Login';
import { NewsList } from './modules/NewsList/NewsList';
import { Header } from './components/Header/Header';
import { NewsContent } from './modules/NewsContent/NewsContent';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/:id" component={ NewsContent } />
        <Route path="/login" component={ Login } />
        <Route path="/" component={ NewsList } />
      </Switch>
    </Router>
  );
}

export default App;
