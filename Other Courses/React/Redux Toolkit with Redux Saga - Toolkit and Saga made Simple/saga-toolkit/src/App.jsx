import React, { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getCatsFetch } from "./store/catState";


const App = () => {
  const cats = useSelector(state => state.cats.cats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatsFetch());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Cat Species Gallery</h1>
      <p>Images of different species of cats. Lots of cats for your viewing pleasure.</p>
      <hr />
      <div className="Gallery">
        {cats.map(cat => (
          <div key={cat.id} className="row">
            <div className="column column-left">
              <img src={cat.image.url} alt={cat.name} width="200" height="200" />
            </div>
            <div className="column column-right">
              <h2>{cat.name}</h2>
              <h5>Temperament: {cat.temperament}</h5>
              <p>{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button>View More Cats</button>
    </div>
  );
};

export default App;
