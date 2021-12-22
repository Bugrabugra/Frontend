import React from 'react'
import ReactDOM from 'react-dom';
import Accordion from './components/Accordion/Accordion';


const data = {
  summary: "Lorem ipsum",
  details: "lorem ispsum dolor"
}

ReactDOM.render(
  <Accordion summary={data.summary} details={data.details}/>,
  document.getElementById('root')
)
