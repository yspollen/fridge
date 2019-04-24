import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import axios from 'axios';

class Home extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      item_name: '',
	      calories: '',
	      quantity: '',
	      expiry_date: '',
	      owner: ''
	    };
  	}

	validate() {
		return this.state.item_name.length > 0 && this.state.owner.length > 0;
	} 

	handleSubmitAdd = (event) => {
	    event.preventDefault();
	    axios.post('http://localhost:4000/items/add', {
	      item_name: this.state.item_name,
	      calorie_count: this.state.calories,
	      expiry_date: this.state.expiry_date,
	      quantity: this.state.quantity,
	      owner: this.state.owner
	    })
	    .then(res => console.log(res.data));

	    this.setState({
	        item_name: '',
	      	calories: '',
	      	quantity: '',
	      	expiry_date: '',
	      	owner: ''
	    });
	}

	handleSubmitRemove = (event) => {
	    event.preventDefault();
	    axios.post('http://localhost:4000/items/remove', {
	      item_name: this.state.item_name,
	      calorie_count: this.state.calories,
	      expiry_date: this.state.expiry_date,
	      quantity: this.state.quantity,
	      owner: this.state.owner
	    })
	    .then(res => console.log(res.data));

	    this.setState({
	        item_name: '',
	      	calories: '',
	      	quantity: '',
	      	expiry_date: '',
	      	owner: ''
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
	        	<SplitPane split="vertical" minSize={50} defaultSize={650}>
	        	    <div>
	        	    	<h4 style={h4Style}>Items</h4>
	        	    </div>
     				<div>
     					<h4 style={h4Style}>Add/Update/Remove Item</h4>
     					<form onSubmit={this.handleSubmitAdd.bind(this)}>
				          	<FormGroup controlId="item_name" bssize="large">
				            	<FormLabel>Item Name*</FormLabel>
				            	<FormControl
				            		autoFocus
						            type="string"
						            placeholder="item name"
						            onChange={this.handleChange}
						            value={this.state.item_name}
				            	/>
				          	</FormGroup>
				          	<FormGroup controlId="quantity" bssize="large">
				            	<FormLabel>Quantity</FormLabel>
				            	<FormControl
					            	type="number"
					              	placeholder="quantity"
					              	onChange={this.handleChange}
					              	value={this.state.quantity}
					              	min='0'
				            	/>
				          	</FormGroup>
				          	<FormGroup controlId="calories" bssize="large">
				            	<FormLabel>Calorie Count</FormLabel>
				            	<FormControl
				            	type="number"
					          		placeholder="calorie count"
					            	onChange={this.handleChange}
					            	value={this.state.calories}
					         		min='0'
				            	/>
				          	</FormGroup>
				        	<FormGroup controlId="expiry_date" bssize="large">
				            	<FormLabel>Expiry Date</FormLabel>
				            	<FormControl
					            	type="date"
					            	onChange={this.handleChange}
					            	value={this.state.expiry_date}
				            	/>
				        	</FormGroup>
				        	<FormGroup controlId="owner" bssize="large">
				            	<FormLabel>Owner*</FormLabel>
				            	<FormControl
				            		placeholder="owner"
				            		type="string"
				            		onChange={this.handleChange}
				            		value={this.state.owner}
				            	/>
				         	</FormGroup>
				          	<Button block name="additem" type="submit" bssize="large" disabled={!this.validate()}>
				            	Add/Update Item
				          	</Button>
				          	<Button block name="removeitem" type="submit" bssize="large" disabled={!this.validate()} onClick={this.handleSubmitRemove.bind(this)}>
				            	Remove Item
				          	</Button>
				        </form>
     				</div>
 				</SplitPane>
	    	</div>
    	);
    }
}

const h4Style = {
  background: '#ccccff',
  color: '#ffffff',
  textAlign: 'center',
  padding: '0px',
  bottomMargin: '5px'
}

export default Home;
