import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Item from "./components/item";
import Register from "./components/register";
import Login from "./components/login";
import AuthService from './components/authService';
import withAuth from './components/withAuth';
const Auth = new AuthService();

class App extends Component {

  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    return (
      <Router>
        <div style={classStyle} className="App">
          <h1 style={headerStyle}>
            Fridge
          </h1>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/item" component={Home} />
              <Route path="*" component={Login} />
            </Switch>
        </div>
      </Router>
    );
  }
}

const headerStyle = {
  background: '#007df7',
  color: '#ffffff',
  textAlign: 'center',
  padding: '5px',
  bottomMargin: '5px'
}

const classStyle = {
  fontFamily: "Helvetica",
  color: '#007df7'
}


export default App;
