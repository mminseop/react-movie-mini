import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import { useUserAuth } from "../context/UserAuthContext";
import { alertError } from "../utils/alert";

function MovieCard({ id, title, poster, rating }) {
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  const noImgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
  const imgPath = poster ? `${baseUrl}/${poster}` : noImgUrl;
  const { toggleFavorite, isFavorite } = useFavorites();

  const navigate = useNavigate();
  const { user } = useUserAuth();

  const handleNavigate = () => {
    navigate(`/detail/${id}`);
  };

  const favorite = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // 카드 클릭 방지

    if (!user) {
      alertError("로그인 필요!", "로그인 후 좋아요를 누를 수 있습니다");
      return;
    }

    toggleFavorite({ id, title, poster, rating });
  };

  return (
    <>
      <div className="movie-card-wrap" onClick={handleNavigate}>
        <img className="movie-card-img" src={imgPath} alt={title} />
        <div
          className={`heart-icon ${favorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
        >
          {favorite ? <FaHeart /> : <FaRegHeart />}
        </div>
        <div className="movie-card-title">{title}</div>
        <div className="movie-card-rating">
          {rating ? `⭐ ${rating.toFixed(1)}` : "평점 없음"}
        </div>
      </div>
    </>
  );
}

export default MovieCard;
