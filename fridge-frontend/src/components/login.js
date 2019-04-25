import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import "./styling/login.css";
import axios from 'axios';


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
    // axios.post('http://localhost:4000/login', {
    //   username: this.state.email,
    //   password: this.state.passwd
    // })
    // // fetch('http://localhost:4000/login', {
    // //   username: this.state.email,
    // //   password: this.state.passwd,
    // //   credentials: 'include',
    // //   method: 'POST',
    // //   body: JSON.stringify(this.state),
    // //   headers: {
    // //     'Content-Type': 'application/json'
    // //   }
    // // })
    // .then(res => {
    //   console.log(res);
    //   if (res.status === 200) {
    //     this.props.history.push('/');
    //   } else {
    //     const error = new Error(res.error);
    //     throw error;
    //   }
    // })
    // .catch(err => {
    //   console.error(err);
    //   alert('Error logging in please try again');
    // });
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
