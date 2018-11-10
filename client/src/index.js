import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class Login extends React.Component {
  handleSubmit() {

  }

  render() {
    return (
      <div>
        <input />
        <input />
        <input />
        <div>Submit</div>
      </div>
    )
  }
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/store' component={App} />
    </Switch>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
