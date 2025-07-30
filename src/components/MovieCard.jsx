import { useNavigate } from "react-router-dom";

function MovieCard({ id, title, poster, rating }) {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const noImgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  const imgPath = poster ? `${baseUrl}/${poster}` : noImgUrl;

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <div className="movie-card-wrap" onClick={handleNavigate}>
        <img className="movie-card-img" src={imgPath} alt={title} />
        <div className="movie-card-title">{title}</div>
        <div className="movie-card-rating">⭐ {rating.toFixed(1)}</div>
      </div>
    </>
  );
}

export default MovieCard;
