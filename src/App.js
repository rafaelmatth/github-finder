import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import axios from 'axios'
import Profile from './Profile';
import "typeface-roboto";
import Stars from './Stars';
import Map from './Mapa';

const x = (stars, key) => {
  return (<Stars stars={stars}/>)
}


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
      geo: {},    
    }
  }
  getUser = (e) => {
    const user = this.textInput.value;
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
    const { user, stars, geo } = this.state
    const gg = user.location
    axios
    .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${gg}.json?access_token=pk.eyJ1IjoicmFmYWVsbWF0dGgiLCJhIjoiY2s1NXFtN2pmMDNjZDNscXFpeWF1dG5xYiJ9.tdfplKWNUzUYGRq6SKcz-g&limit=1`)
    .then(({ data }) => this.setState({geo:data}));
  }
  render(){
    const { user, stars, geo } = this.state
    const lat  = geo.features ? geo.features[0].geometry.coordinates[0,1] : null 
    const lon = geo.features ? geo.features[0].geometry.coordinates[0,0] : null

    console.log(stars)
  return (
    <div className="App">
    <Navbar />
    <div>
    <p className="finderTitle"> Busque por algum usuário do github</p>
      <input className="finderInput" ref={input => this.textInput = input} id="search" type="text" className="form-control" required/>
      <button onClick={this.getUser} >Enviar</button>
    </div>
    {this.state.geo.features ? (  <div>
      <div className="dd">
      <Profile user={user}/>
      <Map lat={lat} lon={lon}/>
      </div>
      {stars.map((item, key) => <Stars key={key} stars={item} />)}
    </div>) : null
  }
    {this.state.user.length !== 0 && !this.state.geo.features ? this.renderProfile() : null}
  </div> 
  );
  }
}

export default App;
