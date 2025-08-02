import "./App.css";
import MovieCard from "./components/MovieCard";
import { useEffect, useState } from "react";
import PopularSwiper from "./components/PopularSwiper";
import { fetchMovies } from "./api/tmdb";
import LoadingIndicator from "./components/LoadingIndicator";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsisLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const getMovies = async () => {
    if (isFetching) return; //데이터 불러오고 있으면 종료
    setIsFetching(true);

    try {
      const data = await fetchMovies(page);
      const filteredData = data.results.filter((movie) => !movie.adult);
      setMovies((prev) => [...prev, ...filteredData]);

      // 더 가져올 게 있는지 확인
      if (page >= data.total_pages) {
        setHasMore(false);
      }

      setPage((prev) => prev + 1);
    } catch (err) {
      console.log("영화 정보를 불러오는 데 실패했습니다.", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const loadInitial = async () => {
      await getMovies();
      setIsisLoading(false);
    };
    loadInitial();
  }, []);

  if (isLoading) {
    return <LoadingIndicator loadingText={"영화 목록 불러오는중"} />;
  }

  return (
    <>
      <PopularSwiper movies={movies} />
      <InfiniteScroll
        dataLength={movies.length}
        next={getMovies}
        hasMore={hasMore}
        loader={<LoadingIndicator loadingText={"영화 목록 더 불러오는 중..."} />}
        scrollThreshold={0.95}
      >
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
      </InfiniteScroll>
    </>
  );
}

export default App;
