import React, { Component } from 'react';
import logo from './logo.svg';
import AddForm from './AddForm.js';
import Items from './Item.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <AddForm />
      <Items/>
      </div>
    );
  }
}

export default App;
