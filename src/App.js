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
    axios
      .get(
        `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
      ).then(({ data }) => this.setState({ user: data }));
    axios
      .get(`${url}/${user}/starred?per_page=${count}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`)
      .then(({ data }) => this.setState({ stars: data }));
  }
  renderMap = () => {
    const { user } = this.state
    var location = user.location
    axios
      .get(`https://geocode.xyz/${location}?json=1`)
      .then(({ data }) => this.setState({ geo: data }));
  }
  render() {
    const { user, stars, geo } = this.state
    const lat = geo.latt
    const lon = geo.longt

    return (
      <div className="App">
        <Navbar />
        <p className="finderTitle"> Busque por algum usuário do github</p>
        <div className="search-container">
          <input className="finderInput" ref={input => this.textInput = input} id="search" type="text" className="form-control" required />
          <button className="button-search" onClick={this.getUser}>Pesquisar</button>
        </div>
        {this.state.user.length !== 0 && this.state.geo.latt ? (
          <div>
            <div className="dd">
              <Profile user={user} />
              <div className="map">
                <Mapa lat={lat} lon={lon} />
              </div>
            </div>
            <div className="container-block">
              {stars.map((item, key) => <Stars key={key} stars={item} />)}
            </div>
          </div>) : null}
        {this.state.user.length !== 0 && !this.state.geo.features ? this.renderMap() : null}
      </div>
    );
  }
}

export default App;
