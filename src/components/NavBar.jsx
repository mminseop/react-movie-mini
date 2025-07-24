import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header>
      <Link to="/">
        <div className="logo">OZ MOVIE</div>
      </Link>
      <input
        className="movie-search-input"
        type="text"
        placeholder="영화를 검색해보세요."
      />
      <div className="auth-buttons">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </header>
  );
}

export default NavBar;
