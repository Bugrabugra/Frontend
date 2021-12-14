import { useEffect, useRef, useState } from "react";
import { MapContainer, Pane, Rectangle, TileLayer } from "react-leaflet";

const outer = [
  [50.505, -29.09],
  [52.505, 29.09],
];

const inner = [
  [49.505, -2.09],
  [53.505, 2.09],
];

const BlinkingPane = () => {
  const [render, setRender] = useState(true);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRender(r => !r);
    }, 5000);

    return () => {
      clearInterval(timerRef.current);
    }
  }, []);

  return render ? (
    <Pane name="cyan-rectangle" style={{zIndex: 500}}>
      <Rectangle bounds={outer} pathOptions={{color: "cyan"}}/>
    </Pane>
  ) : null;
}


const Panes = () => {
  return (
    <MapContainer bounds={outer} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <BlinkingPane/>
      <Pane name="yellow-rectangle" style={{zIndex: 499}}>
        <Rectangle bounds={inner} pathOptions={{color: "yellow"}}/>
        <Pane name="purple-rectangle">
          <Rectangle bounds={outer} pathOptions={{color: "purple"}}/>
        </Pane>
      </Pane>
    </MapContainer>
  )
};


export default Panes;