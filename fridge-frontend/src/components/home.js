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
	      owner: '',
	      data: []
	    };
  	}

	validate() {
		return this.state.item_name.length > 0 && this.state.quantity.toString().length > 0 && this.state.calories.toString().length > 0 && this.state.expiry_date.toString().length > 0 && this.state.owner.length > 0;
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

	updateItems(){
		axios.get('http://localhost:4000/items')
		.then(res => {
			const data = res.data;
			this.setState({
				data: data
			})
		})
	}

	autoFill(item_name) {
		axios.get('http://localhost:4000/items')
		.then(res => {
			var requestedItemName = item_name;
			var data = res.data.find(function(element) {
  				return element.item_name === requestedItemName;
			});			
			this.setState({
				item_name: data.item_name,
	      		calories: data.calorie_count,
	      		quantity: data.quantity,
	      		expiry_date: data.expiry_date.substr(0,10),
	      		owner: data.owner
			})
		})
   	};

  	render() {
  		this.updateItems();
    	return (
	    	<div>
	        	<SplitPane split="vertical" minSize={50} defaultSize={650}>
	        	    <div>
	        	    	<h4 style={h4Style}>Items</h4>
	        	    	<ul>{
	        	    		this.state.data.map((item, key) => {
                       			return (
                       				<a href="#" onClick={this.autoFill.bind(this, item.item_name)} style={listStyle} key={key}>{item.id}
                       					{item.quantity}&nbsp;
                       					{item.item_name}&nbsp;
                       					({item.calorie_count.toString()} calories):&nbsp;
                       					expires on {item.expiry_date ? item.expiry_date.toString().substr(5,2) + "/" + item.expiry_date.toString().substr(8,2) + "/" + item.expiry_date.toString().substr(0,4): "mm/dd/yyyy"}&nbsp;
                       					---&nbsp;{item.owner}
                       					<p></p>
                       				</a>
                       			)
                    		})
	        	    	}</ul>
	        	    </div>
     				<div>
     					<h4 style={h4Style}>Add/Update/Remove Item</h4>
     					<form style={formStyle} onSubmit={this.handleSubmitAdd.bind(this)}>
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
  background: '#007df7',
  color: '#ffffff',
  textAlign: 'center',
  padding: '0px',
  bottomMargin: '10px'
}

const listStyle = {
  textAlign: 'left'
}

const formStyle = {

}

export default Home;
