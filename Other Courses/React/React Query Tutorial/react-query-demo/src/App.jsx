import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SuperHeroes from "./components/SuperHeroes.jsx";
import RQSuperHeroes from "./components/RQSuperHeroes.jsx";
import Home from "./components/Home.jsx";
import RQSuperHero from "./components/RQSuperHero.jsx";
import ParallelQueries from "./components/ParallelQueries.jsx";
import DynamicParallel from "./components/DynamicParallel.jsx";
import DependentQueries from "./components/DependentQueries.jsx";
import PaginatedQueries from "./components/PaginatedQueries.jsx";
import InfiniteQueries from "./components/InfiniteQueries.jsx";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="rq-infinite" element={<InfiniteQueries/>}/>
            <Route path="rq-paginated" element={<PaginatedQueries/>}/>
            <Route path="rq-dependent" element={<DependentQueries email="bugra@gmail.com"/>}/>
            <Route path="rq-dynamic-parallel" element={<DynamicParallel heroIds={[1, 3]}/>}/>
            <Route path="rq-parallel" element={<ParallelQueries/>}/>
            <Route path="rq-super-heroes/:heroId" element={<RQSuperHero/>}/>
            <Route path="super-heroes" element={<SuperHeroes/>}/>
            <Route path="rq-super-heroes" element={<RQSuperHeroes/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  )
}

export default App
