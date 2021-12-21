import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';


// import db from "./firebase";
// import { movies } from "./disneyPlusMoviesData.json";


// Object.values(movies).forEach(movie => {
//   db.collection("movies")
//     .doc()
//     .set({
//       backgroundImg: movie.backgroundImg,
//       cardImg: movie.cardImg,
//       description: movie.description,
//       subTitle: movie.subTitle,
//       title: movie.title,
//       titleImg: movie.titleImg,
//       type: movie.type,
//     })
//     .then(() => {
//       console.log("Document successfully written!");
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error);
//     });
// })


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          
          <Route path="/home">
            <Home/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
