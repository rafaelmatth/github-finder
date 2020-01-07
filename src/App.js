import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import axios from 'axios'
import Profile from './Profile';
import "typeface-roboto";
import Stars from './Stars'

class App extends Component {
  constructor(){
    super();
    this.state = {
      github: {
        url: 'https://api.github.com/users',
        client_id: 'Iv1.deed107484be5839',
        client_secret: '1785cee4c6ebdb265690ffc403f471a5ce265b40',
        count: 10,
        sort: 'created: asc'
      },
      user: [],
      stars: [],
    }
  }
  getUser = (e) => {
    const user = e.target.value;
    const{ url, client_id, client_secret, count, sort } = this.state.github;
    axios
    .get(
      `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
    )
    .then(({ data }) => this.setState({user: data}));
    axios
    .get(`${url}/${user}/starred?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`)
    .then(({ data }) => this.setState({stars:data}));
  }
  renderProfile = () => {
    const { user, stars } = this.state
    return(
      <div>
      <Profile user={user} />
      <div>{stars.map(stars=><Stars key={stars.name} stars={stars}/>)}</div>
      </div>
    )
  }
  render(){
  return (
    <div className="App">
    <Navbar />
    <div>
    <p className="finderTitle"> Busque por algum usuário do github</p>
      <input className="finderInput" id="search" onChange={ this.getUser } type="text" className="form-control" required/>
    </div>
    {this.state.user.length !== 0 ? this.renderProfile() : null}
  </div> 
  );
  }
}

export default App;
