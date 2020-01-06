import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios'

class App extends Component {
  constructor(){
    super();
    this.state = {
      github: {
        url: 'https://api.github.com/users',
        client_id: 'Iv1.deed107484be5839',
        client_secret: '1785cee4c6ebdb265690ffc403f471a5ce265b40',
        count: 7,
        sort: 'created: asc' 
      },
      user: [],
      repos: []
    }
  }
  getUser = (e) => {
    const user = e.target.value;
    const{ url, client_id, client_secret, count, sort } = this.github;
    axios
    .get(
      
    )
  }
  render(){
  return (
    <div className="App">
    <Navbar />
    <input id="search" onChange="{this.getUser}" type="text" className="formControl"/>
  </div> 
  );
  }
}

export default App;
