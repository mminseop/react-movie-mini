import "./App.css";
import MovieCard from "./components/MovieCard";
import movieListData from "./assets/data/movieListData.json";
import { useState } from "react";
import PopularSwiper from "./components/PopularSwiper";

function App() {
  const [movies, setMovies] = useState(movieListData);
  //   console.log(movies.results);

  return (
    <>
      <PopularSwiper movies={movies.results} />
      <div className="movie-list-wrap">
        {movies.results.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            rating={movie.vote_average}
          />
        ))}
      </div>
    </>
  );
}

export default App;
