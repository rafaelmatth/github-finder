import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function Map({lat, lon}) {
  const [viewport, setViewport] = useState({
    width: 300,
    height: 200,
    latitude: lat,
    longitude: lon,
    zoom: 8
  });

  return (
    <ReactMapGL
    mapboxApiAccessToken="pk.eyJ1IjoicmFmYWVsbWF0dGgiLCJhIjoiY2s1NXFtN2pmMDNjZDNscXFpeWF1dG5xYiJ9.tdfplKWNUzUYGRq6SKcz-g"
      {...viewport}
      onViewportChange={setViewport}
    />
  );
}

export default Map