import React, { Component } from 'react';
import withAuth from './withAuth';
class Item extends Component {
  render() {
    return (
      <div className="Item">
        Item
        <p>This is the item (user)</p>
      </div>
    );
  }
}

export default withAuth(Item);
