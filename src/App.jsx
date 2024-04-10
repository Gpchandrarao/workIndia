import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Popular from "./pages/Popular";
import TopRated from "./pages/TopRated";
import MovieDetails from "./pages/MovieDetails";
import Upcoming from "./pages/Upcoming";
import Search from "./components/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
