import 'normalize.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Login } from './modules/Login/Login';
import { Feed } from './modules/Feed/Feed';
import { Header } from './components/Header/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" exact component={ Feed } />
        <Route path="/login" component={ Login } />
      </Switch>
    </Router>
  );
}

export default App;
