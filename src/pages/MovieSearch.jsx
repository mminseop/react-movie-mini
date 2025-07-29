import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { fetchSearchMovies } from "../api/tmdb";
import LoadingIndicator from "../components/LoadingIndicator";
import MovieCard from "../components/MovieCard";

function MovieSearch() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const debounceValue = useDebounce(query, 500);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // 검색어가 비어 있으면 메인으로 리디렉트
    if (!debounceValue.trim()) {
      navigate("/");
    }
  }, [debounceValue]);

  useEffect(() => {
    const getSearchMovies = async () => {
      setIsLoading(true);
      if (!debounceValue) {
        setMovies([]);
        setIsLoading(false);
        return;
      }
      try {
        const data = await fetchSearchMovies(debounceValue);
        setMovies(data.results);
      } catch (err) {
        console.error("검색 실패:", err);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchMovies();
  }, [debounceValue]);

  if (isLoading) {
    return <LoadingIndicator loadingText={"영화 검색 결과 불러오는중"} />;
  }

  return (
    <>
      {movies && movies.length > 0 ? (
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
      ) : (
        <div className="no-data-wrap">
          <p className="no-data-info">검색 결과가 없습니다.</p>
        </div>
      )}
    </>
  );
}

export default MovieSearch;
