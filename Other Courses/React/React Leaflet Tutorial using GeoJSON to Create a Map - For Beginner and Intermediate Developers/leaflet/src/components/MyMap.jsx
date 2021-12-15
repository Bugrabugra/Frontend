import { useCallback, useEffect, useState } from "react";
import mapData from "./../data/countries.json";
import { MapContainer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";


const COLORS = ["green", "blue", "yellow", "orange", "grey"];

const MyMap = () => {
  const [color, setColor] = useState("#f6b73c");
  
  // useEffect(() => {
  //   console.log(mapData);
  // }, []
  // );
  
  const countryStyle = {
    fillColor: "blue",
    fillOpacity: 1,
    color: "black",
    weight: 2
  };
  
  const printMessageToConsole = (event) => {
    console.log(event)
  };
  
  const changeCountryColor = (event) => {
    console.log({color});
    event.target.setStyle({
      fillColor: color,
      fillOpacity: 1,
    })
  };
  
  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);
    
    layer.options.fillOpacity = Math.random();
    // layer.options.fillColor = COLORS[Math.floor(Math.random() * COLORS.length)]
    
    layer.on({
      click: changeCountryColor,
    })
  };
  
  const onColorChange = (event) => {
    console.log(event.target.value);
    setColor(event.target.value);
    console.log({color});
  };
  
  return (
    <div>
      <h1 className="header">My Map</h1>
      <MapContainer zoom={2} center={[20, 100]}>
        <GeoJSON style={countryStyle} data={mapData.features} onEachFeature={onEachCountry}/>
      </MapContainer>
      <input type="color" value={color} onInput={onColorChange}/>
    </div>
  )
};

export default MyMap;