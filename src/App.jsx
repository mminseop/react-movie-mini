import "./App.css";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";
import PopularSwiper from "./components/PopularSwiper";
import { fetchMovies } from "./api/tmdb";
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMovies();
        // console.log(data);
        const filteredData = data.results.filter((movie) => !movie.adult);
        setMovies(filteredData);
      } catch (err) {
        console.log("영화 정보를 불러오는 데 실패했습니다.", err);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  if (isLoading) {
    return <LoadingIndicator lodingText={"영화 목록 불러오는중"} />;
  }

  return (
    <>
      <PopularSwiper movies={movies} />
      <div className="movie-list-wrap">
        {movies.map((movie) => (
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
