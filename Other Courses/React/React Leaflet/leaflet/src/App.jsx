import './App.css'
import AnimatedPanning from './components/AnimatedPanning'
import DraggableMarkerComponent from './components/DraggableMarker'
import Events from './components/Events'
import ExternalState from './components/ExternalState'
import LayersControlComponent from './components/LayersControlComponent'
import MapPlaceholderComponent from './components/MapPlaceholder'
import OtherLayers from './components/OtherLayers'
import Panes from './components/Panes'
import PopupWithMarker from './components/PopupWithMarker'
import ReactControl from './components/ReactControl'
import SVGOVerlay from './components/SVGOVerlay'
import Tooltips from './components/Tooltips'
import VectorLayers from './components/VectorLayers'
import ViewBounds from './components/ViewBounds'


function App() {
  return (
    <div>
      <h1>Popup With Marker</h1>
      <PopupWithMarker/>
      <hr />

      <h1>Events</h1>
      <Events/>
      <hr />

      <h1>Vector Layers</h1>
      <VectorLayers/>
      <hr />

      <h1>SVG Overlays</h1>
      <SVGOVerlay/>
      <hr />

      <h1>Other Layers</h1>
      <OtherLayers/>
      <hr />

      <h1>Tooltips</h1>
      <Tooltips/>
      <hr />

      <h1>Layer Control</h1>
      <LayersControlComponent/>
      <hr />

      <h1>Panes</h1>
      <Panes/>
      <hr />

      <h1>Draggable Marker</h1>
      <DraggableMarkerComponent/>
      <hr />

      <h1>View Bounds</h1>
      <ViewBounds/>
      <hr />

      <h1>Animated Panning</h1>
      <AnimatedPanning/>
      <hr />

      <h1>React Control</h1>
      <ReactControl/>
      <hr />

      <h1>External State</h1>
      <ExternalState/>
      <hr />

      <h1>Map Placeholder</h1>
      <MapPlaceholderComponent/>
      <hr />

    </div>
  )
}

export default App;
