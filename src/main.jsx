import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail.jsx";
import Layout from "./pages/Layout.jsx";
import MovieSearch from "./pages/MovieSearch.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/search" element={<MovieSearch />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
