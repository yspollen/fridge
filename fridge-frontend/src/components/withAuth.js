import React, { Component } from 'react';
import AuthService from './authService';
import { Redirect } from "react-router-dom";


export default function withAuth(AuthComponent) {
    // Code here now
    const Auth = new AuthService('http://localhost:4000');
    return class AuthWrapped extends Component {
	    constructor() {
		    super();
		    this.state = {
		        user: null
		    }
		}

		componentWillMount() {
		    if (!Auth.loggedIn()) {
		        this.props.history.replace('/login')
		        //return <Redirect to='/login'/>;
		    }
		    else {
		        try {
		            const profile = Auth.getProfile()
		            this.setState({
		                user: profile
		            })
		    	}
		        catch(err){
		            Auth.logout()
		            this.props.history.replace('/login')
		        }
    		}
		}

		render() {
    if (this.state.user) {
        return (
            <AuthComponent history={this.props.history} user={this.state.user} />
        )
    }
    else {
        return null
    }

    }
}
}