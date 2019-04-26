import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import "./styling/register.css";
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm: "",
      redirect: false
    };
  }

  validate() {
    return this.state.password.length > 0 && this.state.email.length > 0 && this.state.password === this.state.confirm;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://cs252-fridge.herokuapp.com/register', {
      username: this.state.email,
      password: this.state.password
    })
    .then(() => this.setState({ redirect: true }));

    this.setState({
        email: '',
        password: '',
        confirm: ''
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

render() {
  const { redirect } = this.state;
  if (redirect){
    return <Redirect to='/login'/>;
  }
  else {
    return (
      <div className="register">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bssize="large">
            <FormLabel>Email address</FormLabel>
            <FormControl
              autoFocus
              type="email"
              placeholder="Enter Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Create Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </FormGroup>
          <FormGroup controlId="confirm" bssize="large">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.confirm}
            />
          </FormGroup>
          <Button block type="submit" bssize="large" disabled={!this.validate()}>
            Register
          </Button>
          <Link to="/login">Already have an account? Login here.</Link>
        </form>
      </div>
    );
  }
  }
}

export default Register;
