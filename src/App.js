import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import NavigateExample from "./pages/NavigateExample";
import MyNavbar from "./components/MyNavbar";
import CountryCard from "./components/CountryCard";
import SingleCountry from "./pages/SingleCountry";
import 'mapbox-gl/dist/mapbox-gl.css';
import Portfolio from "./pages/Portfolio";
function App() {
  return (
<Router>
  <MyNavbar />
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio/>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="nav-example" element={<NavigateExample />} />
      
      <Route path="country/:name" element={<SingleCountry />} />


      </Routes>
  </Router>
  );
}

export default App;
