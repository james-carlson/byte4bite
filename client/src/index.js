import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loginUser } from './dataService';

class Login extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
  }

  handleSubmit = () =>  {
    loginUser(this.state.firstName, this.state.lastName, this.state.phoneNumber)
      .then(resp => {
        console.log(this.props)
        console.log(resp)//this.props.location.history.push()
      })
  }

  render() {
    return (
      <div>
        <div>Please enter you info</div>
        <input value={this.firstName} onChange={ e => this.setState({firstName: e.target.value}) }/>
        <input value={this.lastName} onChange={ e => this.setState({lastName: e.target.value}) }/>
        <input value={this.phoneNumber} onChange={ e => this.setState({phoneNumber: e.target.value}) }/>
        <div onClick={this.handleSubmit} >Submit</div>
      </div>
    )
  }
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/store/:userId' component={App} />
    </Switch>
  </Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
