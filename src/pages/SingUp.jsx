import { useState } from "react";
import FormInputLabel from "../components/FormInputLabel";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import { alertError, alertSuccess } from "../utils/alert";

function SignUp() {
  // 폼 입력값 상태 관리 (이메일, 이름, 비밀번호, 비밀번호 확인)
  const [formInput, setFormInput] = useState({
    userEmail: "",
    userName: "",
    userPassword: "",
    userPasswordCheck: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // 각 입력 필드별 에러 메시지를 저장하는 상태

  // 입력값이 변경될 때마다 호출되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target; // 변경된 input의 name과 value를 가져옴
    setFormInput((prev) => {
      const updated = { ...prev, [name]: value }; // 해당 필드만 새 값으로 업데이트
      validateField(name, value); // 즉시 해당 필드 유효성 검사 실행
      return updated; // 업데이트 된 상태 반환
    });
  };

  // input에서 포커스가 벗어날 때 호출되는 함수
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // 단일 필드 유효성 검사 함수 (input 하나하나 입력할떄마다 바로 유효성검사 하려고)
  const validateField = (name, value) => {
    let message = "";

    // 이메일 유효성 검사
    if (name === "userEmail") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = "올바른 이메일 형식을 입력하세요.";
      }
    }
    // 이름 유효성 검사 (2~8자, 한글/영어/숫자만 허용)
    if (name === "userName") {
      if (!/^[가-힣a-zA-Z0-9]{2,8}$/.test(value)) {
        message = "이름은 2~8자, 한글/영어/숫자만 입력 가능합니다.";
      }
    }
    // 비밀번호 유효성 검사 (영어, 숫자, 특수문자 포함 8자 이상)
    if (name === "userPassword") {
      if (
        !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-=])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-=]{8,}$/.test(
          value
        )
      ) {
        message =
          "비밀번호는 영어, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.";
      }
    }
    // 비밀번호 확인 유효성 검사
    if (name === "userPasswordCheck") {
      if (value !== formInput.userPassword) {
        message = "비밀번호가 일치하지 않습니다.";
      }
    }
    // 에러 메시지 상태 업데이트 (해당 필드만)
    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  // 폼 전체 필드 유효성 검사 (submit 시 한 번에 검사하려고)
  const validateAll = () => {
    const newErrors = {};

    const { userEmail, userName, userPassword, userPasswordCheck } = formInput;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      newErrors.userEmail = "올바른 이메일 형식을 입력하세요.";
    }

    if (!/^[가-힣a-zA-Z0-9]{2,8}$/.test(userName)) {
      newErrors.userName = "이름은 2~8자, 한글/영어/숫자만 입력 가능합니다.";
    }

    if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-=])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-=]{8,}$/.test(
        userPassword
      )
    ) {
      newErrors.userPassword =
        "비밀번호는 영어, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.";
    }

    if (userPassword !== userPasswordCheck) {
      newErrors.userPasswordCheck = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors); // 전체 에러 메시지 상태 업데이트

    // 에러 없으면 true, 있으면 false 반환
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 제출 동작 막기 (페이지 리로드 방지)

    // 모든 입력값이 유효할 때
    if (validateAll()) {
      const { userEmail, userPassword, userName } = formInput;

      // supabase 회원가입 API 호출
      const { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
          data: {
            name: userName,
          },
        },
      });

      if (error) {
        alertError("회원가입 실패!", "회원가입에 실패하였습니다.");
      } else {
        await alertSuccess("회원가입 성공!", "회원가입이 완료되었습니다.");
        navigate("/");
      }
    }
  };

  return (
    <>
      <div className="signup-wrap">
        <h2 className="signup-title">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <FormInputLabel
            label="이메일"
            name="userEmail"
            placeholder="example@domain.com"
            onChange={handleChange} // 입력값 변경 시 호출
            onBlur={handleBlur} // 포커스 해제 시 호출 (유효성 검사)
            errorMessage={errors.userEmail}
          />
          <FormInputLabel
            label="이름"
            name="userName"
            placeholder="2~8자, 숫자/한글/영어만 사용"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.userName}
          />
          <FormInputLabel
            label="비밀번호"
            name="userPassword"
            type="password"
            placeholder="8자 이상, 영어 + 숫자 + 특수문자 조합 사용"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.userPassword}
          />
          <FormInputLabel
            label="비밀번호 확인"
            name="userPasswordCheck"
            type="password"
            placeholder="비밀번호를 한 번 더 입력하세요"
            onChange={handleChange}
            onBlur={handleBlur}
            errorMessage={errors.userPasswordCheck}
          />
          <div className="signup-btn-wrap">
            <button type="submit" className="signup-btn">
              회원가입
            </button>
            <button
              type="button"
              className="signup-btn"
              onClick={() => navigate(-1)} // 이전 페이지로 이동
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
