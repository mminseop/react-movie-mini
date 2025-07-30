import { Link, useNavigate } from "react-router-dom";
import FormInputLabel from "../components/FormInputLabel";
import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { alertError, alertSuccess } from "../utils/alert";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({}); // 에러 메시지를 저장할 상태

  const navigate = useNavigate();
  const { login } = useUserAuth(); // context에서 로그인 함수 꺼내오기

  //입력값 유효성 검사
  const validate = () => {
    const newErrors = {};

    // 이메일 유효성 검사
    if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      newErrors.userEmail = "올바른 이메일을 입력하세요.";
    }
    // 비밀번호가 비어있는지 확인
    if (!userPassword) {
      newErrors.userPassword = "비밀번호를 입력하세요.";
    }

    setErrors(newErrors); // 에러 상태 업데이트

    return Object.keys(newErrors).length === 0; // 에러가 없으면 true 반환
  };

  // 로그인 버튼 눌렀을 때 실행되는 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 제출 동작 막기 (페이지 리로드 방지)

    if (!validate()) return; // 유효성 검사 실패시 예외처리

    try {
      await login({ email: userEmail, password: userPassword }); // 로그인 요청
      await alertSuccess("로그인 성공!", "로그인이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      alertError("로그인 실패!", "로그인에 실패하였습니다.");
    }
  };

  return (
    <>
      <div className="signup-wrap">
        <h2 className="signup-title">로그인</h2>
        <form onSubmit={handleLogin}>
          <FormInputLabel
            label="이메일"
            name="userEmail"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            errorMessage={errors.userEmail}
          />
          <FormInputLabel
            label="비밀번호"
            name="userPassword"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            errorMessage={errors.userPassword}
          />
          <div className="signup-btn-wrap">
            <button type="submit" className="signup-btn">
              로그인
            </button>
          </div>
          <div className="signup-info-link-wrap">
            오즈무비가 처음이신가요?
            <Link to="/signup" className="signup-link">
              간편가입
            </Link>
          </div>
        </form>
        <div className="social-login-wrap">
          {/* 카카오 로그인 */}
          <button type="button" className="social-btn kakao">
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
              alt="Kakao"
              className="social-icon"
            />
            카카오 로그인
          </button>

          {/* 구글 로그인 */}
          <button type="button" className="social-btn google">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="social-icon"
            />
            구글 로그인
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
