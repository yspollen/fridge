import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passwd: ""
    };
  }

  validate() {
    return this.state.email.length > 0 && this.state.passwd.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
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
        </Form>
      </div>
    );
  }
}

export default Login;
