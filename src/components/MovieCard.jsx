import { useNavigate } from "react-router-dom";

function MovieCard({ id, title, poster, rating }) {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const imgPath = `${baseUrl}/${poster}`;
  const navigate = useNavigate();
    
  const handleNavigate = () => {
    navigate(`/details/${id}`);
  }

  return (
    <>
      <div className="movie-card-wrap" onClick={handleNavigate}>
        <img className="movie-card-img" src={imgPath} alt={title} />
        <div className="movie-card-title">{title}</div>
        <div className="movie-card-rating">평점: {rating}</div>
      </div>
    </>
  );
}

export default MovieCard;
