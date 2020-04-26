import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import axios from 'axios'
import Profile from './components/Profile';
import "typeface-roboto";
import Stars from './components/Stars';
import Mapa from './components/Mapa';

class App extends Component {
  constructor() {
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
      geo: {},
    }
  }
  getUser = (e) => {
    const user = this.textInput.value;
    const { url, client_id, client_secret, count, sort } = this.state.github;
    var location = user.location
    axios
      .get(
        `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
      ).then(({ data }) => this.setState({ user: data }));
    axios
      .get(`${url}/${user}/starred?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`)
      .then(({ data }) => this.setState({ stars: data }));
  }
  render() {
    const { user, stars, geo } = this.state
    const lat = geo.features ? geo.features[0].geometry.coordinates[0, 1] : null
    const lon = geo.features ? geo.features[0].geometry.coordinates[0, 0] : null
    return (
      <div className="App">
        <Navbar />
        <p className="finderTitle"> Busque por algum usuário do github</p>
        <div className="search-container">
          <input className="finderInput" ref={input => this.textInput = input} id="search" type="text" className="form-control" required />
          <button className="button-search" onClick={this.getUser}>Pesquisar</button>
        </div>
        {this.state.user.length !== 0 ? (
          <div>
            <div className="dd">
              <Profile user={user} />
              <div className="map">                
              </div>
            </div>
            <div className="container-block">
              {stars.map((item, key) => <Stars key={key} stars={item} />)}
            </div>
          </div> ) : null }                    
      </div>
    );
  }
}

export default App;
