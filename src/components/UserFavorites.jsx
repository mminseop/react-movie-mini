import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";


function UserFavorites() {
  const { favorites } = useFavorites();

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>찜한 영화</h2>
      {favorites.length === 0 ? (
        <p>아직 찜한 영화가 없습니다.</p>
      ) : (
        <div className="movie-favorites-wrap">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster={movie.poster}
              rating={movie.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserFavorites;
