import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

function NavBar({ isDarkMode, toggleDarkMode }) {
  const [serachValue, setSearchValue] = useState(""); // 검색어 상태
  const navigate = useNavigate();
  const [mobilePanel, setMobilePanel] = useState(null); // 모바일 슬라이드 패널 상태 search, menu, null

  // 화면 크기 변경될 때 슬라이드 패널 자동 닫기 (768px 이상이면 닫음)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobilePanel !== null) {
        setMobilePanel(null); // PC일 땐 슬라이드 패널 닫기
      }
    };

    window.addEventListener("resize", handleResize); //창 크기 바뀔떄 실행됨
    return () => window.removeEventListener("resize", handleResize);
  }, [mobilePanel]);

  // 검색 패널 열기/닫기 toggle
  const toggleSearchSlide = () => {
    setMobilePanel((prev) => (prev === "search" ? null : "search"));
  };

  // 햄버거 모바일 메뉴 패널 열기/닫기 toggle
  const toggleMobileMenuSlide = () => {
    setMobilePanel((prev) => (prev === "menu" ? null : "menu"));
  };

  // 다크모드 클래스 토글 (body 태그에 적용)
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // 검색 입력 시 상태 업데이트 +라우팅
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
        className={`movie-search-input`}
        type="text"
        placeholder="영화를 검색해보세요."
        value={serachValue}
        onChange={handleSearch}
      />

      {/* 모바일, 태블릿 검색 토글 버튼 (화면 너비 좁을 때만 css로 보이게 처리) */}
      <button className="icon-button search-toggle" onClick={toggleSearchSlide}>
        <FaSearch className="search-icon"/>
      </button>

      <div className="header-button-wrap">
        {/* 다크모드 버튼 */}
        <button
          className="icon-button theme-toggle-button"
          onClick={toggleDarkMode}
        >
          <span className="icon">{isDarkMode ? "☀️" : "🌙"}</span>
        </button>

        {/* ☰ 모바일 메뉴 토글 버튼 */}
        <button
          className="icon-button menu-toggle"
          onClick={toggleMobileMenuSlide}
        >
          <GiHamburgerMenu className="hamburger-icon"/>
        </button>
      </div>

      {/* pc에서만 보이는 로그인/회원가입 버튼, 768px 이하에서 display: none 처리 */}
      <div className="auth-buttons desktop-only">
        <button>로그인</button>
        <button>회원가입</button>
      </div>

      {/* 검색창 패널 (모바일, 태블릿에서만 보임, toggle 처리) */}
      {mobilePanel === "search" && (
        <div className="mobile-slide-panel">
          <input
            className="movie-search-input"
            type="text"
            placeholder="영화를 검색해보세요."
            value={serachValue}
            onChange={handleSearch}
            autoFocus
          />
        </div>
      )}

      {/* 햄버거 메뉴바 (로그인/회원가입 버튼, 모바일/태블릿에서만) */}
      {mobilePanel === "menu" && (
        <div className="mobile-slide-panel">
          <button>로그인</button>
          <button>회원가입</button>
        </div>
      )}
    </header>
  );
}

export default NavBar;
