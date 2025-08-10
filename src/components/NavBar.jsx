import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useUserAuth } from "../context/UserAuthContext";
import useOutsideClickClose from "../hooks/useOutsideClickClose";
import { FiSun, FiMoon } from "react-icons/fi";

function NavBar({ isDarkMode, toggleDarkMode }) {
  const [searchValue, setSearchValue] = useState(""); // 검색어 상태
  const navigate = useNavigate();
  const [mobilePanel, setMobilePanel] = useState(null); // 모바일 슬라이드 패널 상태 search, menu, null
  const { user, logout } = useUserAuth();
  const [showProfile, setShowProfile] = useState(false); //프로필 드롭다운 메뉴 상태
  const profileMenuRef = useRef(); // pc용 프로필 드롭다운 메뉴 ref
  const mobileMenuRef = useRef(); // 모바일/태블릿용 햄버거 메뉴 ref

  // 사용자가 프로필 메뉴 바깥을 클릭하면 메뉴를 닫음
  useOutsideClickClose(
    profileMenuRef, // 어떤 DOM 요소 바깥을 감지할지 지정
    () => setShowProfile(false), // 바깥을 클릭했을 때 실행할 함수 (닫기)
    showProfile // 메뉴가 열려 있을 때만 이벤트 리스너 활성화
  );

  useOutsideClickClose(
    mobileMenuRef,
    () => setMobilePanel(null), // 슬라이드 패널 닫기
    mobilePanel // 현재 메뉴 패널이 열려있는지 여부
  );

  const handleLogout = () => {
    logout();
    setShowProfile(false);
    navigate("/");
  };

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
        value={searchValue}
        onChange={handleSearch}
      />

      {/* 모바일, 태블릿 검색 토글 버튼 (화면 너비 좁을 때만 css로 보이게 처리) */}
      <button className="icon-button search-toggle" onClick={toggleSearchSlide}>
        <FaSearch className="search-icon" />
      </button>

      <div className="header-button-wrap">
        {/* 다크모드 버튼 */}
        <button
          className="icon-button theme-toggle-button"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>

        {/* ☰ 모바일 메뉴 토글 버튼 */}
        <button
          className="icon-button menu-toggle"
          onClick={(e) => {
            e.stopPropagation();
            toggleMobileMenuSlide();
          }}
        >
          <GiHamburgerMenu className="hamburger-icon" />
        </button>
      </div>

      {/* pc에서만 보이는 로그인/회원가입 버튼, 768px 이하에서 display: none 처리 */}
      <div className="auth-buttons desktop-only">
        {user ? (
          <div className="profile-dropdown" ref={profileMenuRef}>
            <button onClick={() => setShowProfile((prev) => !prev)}>
              <FaUserCircle size={28} />
            </button>
            {showProfile && (
              <div className="profile-menu">
                <div className="profile-menu-row">
                  <FaUserCircle size={80} />
                </div>
                <div className="profile-menu-row profile-user-name">
                  {user.user_metadata.name} 님!
                </div>
                <div className="profile-menu-row profile-user-email">
                  {user.email}
                </div>
                <div className="profile-button-wrap">
                  <Link
                    to="/mypage"
                    onClick={() => setShowProfile(false)}
                    className="profile-menu-link"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="profile-menu-button"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button>로그인</button>
            </Link>
            <Link to="/signup">
              <button>회원가입</button>
            </Link>
          </>
        )}
      </div>

      {/* 검색창 패널 (모바일, 태블릿에서만 보임, toggle 처리) */}
      {mobilePanel === "search" && (
        <div className="mobile-slide-panel">
          <input
            className="movie-search-input"
            type="text"
            placeholder="영화를 검색해보세요."
            value={searchValue}
            onChange={handleSearch}
            autoFocus
          />
        </div>
      )}

      {/* 햄버거 메뉴바 (로그인/회원가입 버튼, 모바일/태블릿에서만) */}
      {mobilePanel === "menu" && (
        <div
          className="mobile-slide-panel"
          ref={mobileMenuRef}
          onClick={(e) => e.stopPropagation()}
        >
          {user ? (
            // 로그인한 상태
            <div className="mobile-profile">
              <FaUserCircle size={36} className="mobile-profile-icon" />
              <div className="mobile-username">{user.user_metadata.name}</div>
              <div className="mobile-email">{user.email}</div>
              <div className="mobile-profile-button-wrap">
                <Link
                  to="/mypage"
                  onClick={() => setShowProfile(false)}
                  className="profile-menu-link"
                >
                  마이페이지
                </Link>
                <button onClick={logout} className="mobile-logout-btn">
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
            // 로그인하지 않은 상태
            <>
              <Link to="/login">
                <button>로그인</button>
              </Link>
              <Link to="/signup">
                <button>회원가입</button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default NavBar;
