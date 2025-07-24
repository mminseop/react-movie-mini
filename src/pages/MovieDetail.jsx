import { useParams } from "react-router-dom";
import movieDetailData from "../assets/data/movieDetailData.json";

function MovieDetail() {
//   const { id } = useParams();
//   const movie = movieDetailData.find((item) => item.id === id);
//   console.log(movieDetailData);
  const genres = movieDetailData.genres.map((x) => x.name).join(" / ");
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const imgPath = `${baseUrl}/${movieDetailData.backdrop_path}`;

  return (
    <div className="movie-detail-wrap">
      <img className="movie-detail-img" src={imgPath} alt="" />
      <div className="movie-detail-info">
        <div className="movie-detail-info-top">
          <div className="title">{movieDetailData.title}</div>
          <div className="rating">{movieDetailData.vote_average}</div>
        </div>
        <div className="movie-detail-info-genre">장르 : {genres}</div>
        <div className="movie-detail-info-plot">
          줄거리
          <br />
          {movieDetailData.overview}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
