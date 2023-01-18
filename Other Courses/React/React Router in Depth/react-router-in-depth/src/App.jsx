import {
  createBrowserRouter,
  Route,
  createRoutesFromElements, RouterProvider
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import HelpLayout from "./layouts/HelpLayout.jsx";
import Faq from "./pages/help/Faq.jsx";
import Contact, { contactAction } from "./pages/help/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import CareersLayout from "./layouts/CareersLayout.jsx";
import Careers, { careersLoader } from "./pages/careers/Careers.jsx";
import CareerDetails, { careerDetailsLoader } from "./pages/careers/CareerDetails.jsx";
import CareersError from "./pages/careers/CareersError.jsx";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="about" element={<About/>}/>
    <Route path="help" element={<HelpLayout/>}>
      <Route path="faq" element={<Faq/>}/>
      <Route path="contact" element={<Contact/>} action={contactAction}/>
    </Route>

    <Route
      path="careers" element={<CareersLayout/>}
      errorElement={<CareersError/>}
    >
      <Route index element={<Careers/>} loader={careersLoader}/>
      <Route
        path=":id"
        element={<CareerDetails/>}
        loader={careerDetailsLoader}
      />
    </Route>

    <Route path="*" element={<NotFound/>}/>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
