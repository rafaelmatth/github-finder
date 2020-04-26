import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const Mapa = ({lat, lon}) =>{

  const latitude = parseInt(lat)
  const longitude = parseInt(lon)
    return (
      <LeafletMap
        center={[latitude, longitude]}
        zoom={6}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Popup for any custom information.
          </Popup>
        </Marker>
      </LeafletMap>
    );
}

export default Mapa