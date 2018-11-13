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
        console.log('Props' + this.props)
        console.log('UserID' + resp)
        this.props.history.push('/store/' + resp)
      })
  }

  render() {
    return (
      <div>
        <label>First Name</label>
        <input value={this.firstName} onChange={ e => this.setState({firstName: e.target.value}) }/>
        <br/>
        <label>Last Name</label>
        <input value={this.lastName} onChange={ e => this.setState({lastName: e.target.value}) }/>
        <br/>
        <label>Phone Number</label>
        <input value={this.phoneNumber} onChange={ e => this.setState({phoneNumber: e.target.value}) }/>
        <br/>
        <button onClick={this.handleSubmit} >Submit</button>
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
