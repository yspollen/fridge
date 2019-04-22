import React, { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirm: ""
    };
  }

  validate() {
    return this.state.password.length > 0 && this.state.email.length > 0 && this.state.password === this.state.confirm;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4000/register', {
      username: this.state.email,
      password: this.state.password
    })
    .then(res => console.log(res.data));

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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bssize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Create Password</FormLabel>
            <FormControl
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </FormGroup>
          <FormGroup controlId="confirm" bssize="large">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              type="password"
              onChange={this.handleChange}
              value={this.state.confirm}
            />
          </FormGroup>
          <Button block type="submit" bssize="large" disabled={!this.validate()}>
            Register
          </Button>
        </form>
      </div>
    );
  }
}

export default Register;
