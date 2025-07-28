import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ isDarkMode, toggleDarkMode }) {
  const [serachValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev);
    console.log(showMobileMenu);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    navigate(`/search?query=${inputValue}`);
  };

  return (
    <header>
      <Link to="/" className="logo">
        OZ MOVIE
      </Link>

      <input
        className={`movie-search-input ${showSearch ? "show" : ""}`}
        type="text"
        placeholder="영화를 검색해보세요."
        value={serachValue}
        onChange={handleSearch}
      />

      {/* 모바일, 태블릿 검색 토글 버튼 */}
      <button className="icon-button search-toggle" onClick={toggleSearch}>
        🔍
      </button>

      <div className="header-button-wrap">
        <button
          className="icon-button theme-toggle-button"
          onClick={toggleDarkMode}
        >
          <span className="icon">{isDarkMode ? "☀️" : "🌙"}</span>
        </button>

        <button className="icon-button menu-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      {/* pc에서만 보이는 로그인/회원가입 버튼*/}
      <div className="auth-buttons desktop-only">
        <button>로그인</button>
        <button>회원가입</button>
      </div>

      {/* 모바일, 태블릿 전용 메뉴 */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      )}
    </header>
  );
}

export default NavBar;
