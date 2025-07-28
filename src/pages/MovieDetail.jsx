import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchMovieCredits,
  fetchMovieDetail,
  fetchMovieVideos,
} from "../api/tmdb";
import LoadingIndicator from "../components/LoadingIndicator";

function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieAllData = async () => {
      try {
        setIsLoading(true);

        // 세 가지 비동기 요청 병렬로 실행
        const [detailData, creditData, videoData] = await Promise.all([
          fetchMovieDetail(id),
          fetchMovieCredits(id),
          fetchMovieVideos(id),
        ]);
        // console.log(creditData, videoData);
        setMovie({
          ...detailData,
          credits: creditData,
          videos: videoData,
        });
      } catch (err) {
        console.error("영화 데이터를 불러오는 데 실패했습니다.", err);
        setError("영화 정보를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovieAllData();
  }, [id]);

  if (isLoading) {
    return <LoadingIndicator loadingText={"영화 상세정보 불러오는중"} />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!movie) {
    return; // 또는 로딩 상태가 끝났는지 확인 후에 처리
  }

  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const movieImgPath = `${baseUrl}${movie.poster_path}`;

  return (
    movie && (
      <>
        <div className="movie-detail-wrap">
          <img
            className="movie-detail-img"
            src={movieImgPath}
            alt={movie.title}
          />
          <div className="movie-detail-info">
            <h2 className="movie-title">{movie.title}</h2>
            <div className="movie-rating">
              ⭐ {movie.vote_average.toFixed(1)}
            </div>

            <div className="movie-genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="genre-badge">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-overview">
              {movie.overview || "줄거리가 없습니다."}
            </div>

            <div className="movie-actions">
              <button className="play-button">▶ 재생하기</button>
            </div>
          </div>
        </div>

        <div className="movie-director-wrap">
          <h3 className="movie-subtitle">감독</h3>
          <div className="director-list">
            {movie.credits.crew
              .filter((person) => person.job === "Director")
              .map((director) => (
                <div key={director.id} className="director-card">
                  <img
                    src={
                      director.profile_path
                        ? `${baseUrl}/${director.profile_path}`
                        : `${baseUrl}`
                    }
                    alt={director.name}
                    className="director-img"
                  />
                  <p className="director-name">{director.name}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="movie-cast-wrap">
          <h3 className="movie-subtitle">출연진</h3>
          <div className="movie-cast-list">
            {movie.credits.cast.slice(0, 5).map((actor) => (
              <div key={actor.id} className="movie-cast-card">
                <img
                  src={
                    actor.profile_path
                      ? `${baseUrl}/${actor.profile_path}`
                      : `${baseUrl}`
                  }
                  alt={actor.name}
                  className="movie-cast-img"
                />
                <p className="movie-cast-name">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="movie-trailer-wrap">
          <h3 className="movie-subtitle">예고편</h3>
          {movie.videos.results
            .filter(
              (video) => video.site === "YouTube" && video.type === "Trailer"
            )
            .slice(0, 1)
            .map((trailer) => (
              <div key={trailer.id} className="movie-trailer-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="예고편"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
        </div>
      </>
    )
  );
}

export default MovieDetail;
