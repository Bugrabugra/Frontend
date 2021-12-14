import { MapContainer, TileLayer } from "react-leaflet";

const MapPlaceholder = () => {
  return (
    <p>
      Map of London.{" "}
      <noscript>You need to enable Javascript to see this map.</noscript>
    </p>
  )
};

const MapWithPlaceholder = () => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      placeholder={<MapPlaceholder/>}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
};


const MapPlaceholderComponent = () => {
  return (
    <MapWithPlaceholder/>
  )
};

export default MapPlaceholderComponent
