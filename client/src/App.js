import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import UserList from './components/UserList';
import PrivateRoute from "./components/PrivateRoute";


function App() {
  
  return (
    <div className="App">
      
        <Router>
          <Switch>
            <Route path="/" exact component={ Login }/>
            {/* <Route path="/users" exact component={ UserList }/> */}
            <PrivateRoute path="/users" component={ UserList }/>
          </Switch>
        </Router>
      
    </div>
  );
}

export default App;
