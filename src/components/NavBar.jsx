import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [serachValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    navigate(`/search?query=${inputValue}`);
  }
  
  return (
    <header>
      <Link to="/">
        <div className="logo">OZ MOVIE</div>
      </Link>
      <input
        className="movie-search-input"
        type="text"
        placeholder="영화를 검색해보세요."
        value={serachValue}
        onChange={handleSearch}
      />
      <div className="auth-buttons">
        <button>로그인</button>
        <button>회원가입</button>
      </div>
    </header>
  );
}

export default NavBar;
