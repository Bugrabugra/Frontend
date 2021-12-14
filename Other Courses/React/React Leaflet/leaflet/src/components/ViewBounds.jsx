import { useMemo, useState } from "react";
import { MapContainer, Rectangle, TileLayer, useMap } from "react-leaflet";

const innerBounds = [
  [49.505, -2.09],
  [53.505, 2.09],
];

const outerBounds = [
  [50.505, -29.09],
  [52.505, 29.09],
];

const redColor = { color: 'red' };
const whiteColor = { color: 'white' };

const SetBoundsRectangles = () => {
  const [bounds, setBounds] = useState(outerBounds);
  const map = useMap();

  const innerHandlers = useMemo(() => ({
    click() {
      setBounds(innerBounds);
      map.fitBounds(innerBounds);
    }
  }), [map]);

  const outerHandlers = useMemo(() => ({
    click() {
      setBounds(outerBounds)
      map.fitBounds(outerBounds)
    },
  }), [map]);

  return (
    <>
      <Rectangle
        bounds={outerBounds}
        eventHandlers={outerHandlers}
        pathOptions={bounds === outerBounds ? redColor : whiteColor}
      />

      <Rectangle
        bounds={innerBounds}
        eventHandlers={innerHandlers}
        pathOptions={bounds === innerBounds ? redColor : whiteColor}
      />
    </>
  )
};


const ViewBounds = () => {
  return (
    <MapContainer bounds={outerBounds} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetBoundsRectangles />
    </MapContainer>
  )

}

export default ViewBounds;
