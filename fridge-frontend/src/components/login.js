import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./styling/login.css";
import AuthService from './authService';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwd: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
  }

  validate() {
    return this.state.email.length > 0 && this.state.passwd.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //console.log(this.state.email);
   // console.log(this.state.passwd);
    this.Auth.login(this.state.email,this.state.passwd)
            .then(res =>{
              console.log("Yee baby");
               this.props.history.replace('/item');
            })
            .catch(err =>{
                alert(err);
            })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email">
            <FormLabel>Email address</FormLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="Enter email"
              onChange={this.handleChange}
              value={this.state.email}
              />
          </FormGroup>
          <FormGroup controlId="passwd">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.passwd}
              />
          </FormGroup>
          <Button block type="submit" disabled={!this.validate()}>
            Login
          </Button>
          <Link to="/register">Don't have an account? Register here.</Link>
        </Form>
      </div>
    );
  }


}

export default Login;
