import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import Home from "./components/home"
import NewItem from "./components/new-item"


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>Fridge</h1>
            <Switch>
              <Route path="/newItem" component={NewItem} />
              <Route path="/editItem/:id" component={Home} />
              <Route render= {() =><Home /> }/>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
