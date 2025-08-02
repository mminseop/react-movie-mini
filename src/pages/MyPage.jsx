import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { alertError } from "../utils/alert";
import { useEffect } from "react";
import { FaUserCircle, FaCog, FaHeart } from "react-icons/fa";

function MyPage() {
  const { user, loading } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      if (loading) return; // 아직 로딩 중이면 종료

      if (!user) {
        await alertError("잘못된 접근", "회원만 접근 가능합니다.");
        navigate("/login");
      }
    };

    checkUser();
  }, [user, loading]);

  if (!user) return;

  return (
    <>
      <div className="my-page-container">
        <div className="my-page-side-bar">
          <div className="my-page-profile-wrap">
            <div className="my-page-profile-wrap-row">
              <FaUserCircle size={80} />
            </div>
            <div className="my-page-profile-wrap-row my-page-side-user-name">
              {user.user_metadata.name} 님!
            </div>
            <div className="my-page-profile-wrap-row my-page-side-user-email">
              {user.email}
            </div>
          </div>
          <div className="my-page-side-menu">
            <Link
              to="/mypage"
              className={`my-page-side-menu-row ${
                location.pathname === "/mypage" ? "selected" : ""
              }`}
            >
              <FaCog className="menu-icon" />
              계정 설정
            </Link>

            <Link
              to="/mypage/favorites"
              className={`my-page-side-menu-row ${
                location.pathname === "/mypage/favorites" ? "selected" : ""
              }`}
            >
              <FaHeart className="menu-icon" />
              찜한 영화
            </Link>
          </div>
        </div>
        <div className="my-page-content-wrap">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MyPage;
