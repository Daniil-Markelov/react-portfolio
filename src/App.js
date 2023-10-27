import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import NavigateExample from "./pages/NavigateExample";
import Navbar from "./components/Navbar";
import CountryCard from "./components/CountryCard";
import SingleCountry from "./pages/SingleCountry";
function App() {
  return (
<Router>
  <Navbar />
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
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
