import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import FormInputLabel from "./FormInputLabel";
import { alertError, alertSuccess } from "../utils/alert";
import { useNavigate } from "react-router-dom";

function UserSettings() {
  const { user, changePassword } = useUserAuth();
  const [activeMenu, setActiveMenu] = useState("basic"); // basic / security
  const [formInput, setFormInput] = useState({
    currentPassword: "",
    userPassword: "",
    userPasswordCheck: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // input에서 포커스가 벗어날 때 호출되는 함수
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // 단일 필드 유효성 검사 함수
  const validateField = (name, value) => {
    let message = "";

    if (name === "userEmail") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = "올바른 이메일 형식을 입력하세요.";
      }
    }

    if (name === "userName") {
      if (!/^[가-힣a-zA-Z0-9]{2,8}$/.test(value)) {
        message = "이름은 2~8자, 한글/영어/숫자만 입력 가능합니다.";
      }
    }

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

    if (name === "userPasswordCheck") {
      if (value !== formInput.userPassword) {
        message = "비밀번호가 일치하지 않습니다.";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  // 폼 전체 필드 유효성 검사
  const validateAll = () => {
    const newErrors = {};
    const { userPassword, userPasswordCheck } = formInput;

    if (!formInput.currentPassword) {
      newErrors.currentPassword = "현재 비밀번호를 입력하세요.";
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

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 비밀번호 변경 처리
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const result = await changePassword({
      email: user.email,
      currentPassword: formInput.currentPassword,
      newPassword: formInput.userPassword,
    });

    if (result.error) {
      setErrors((prev) => ({
        ...prev,
        currentPassword: result.error.includes("현재 비밀번호")
          ? result.error
          : prev.currentPassword,
      }));
      await alertError('비밀번호 변경 실패!', `${result.error}`);
      return;
    }

    setFormInput({
      currentPassword: "",
      userPassword: "",
      userPasswordCheck: "",
    });
    await alertSuccess("비밀번호 변경 성공!", "비밀번호 변경이 완료되었습니다.");
    navigate("/");
  };

  return (
    <>
      <h2>계정 설정</h2>
      <div className="my-page-content-menu-wrap">
        <div
          className={`my-page-content-menu-item ${
            activeMenu === "basic" ? "active" : ""
          }`}
          onClick={() => setActiveMenu("basic")}
        >
          기본정보
        </div>
        <div
          className={`my-page-content-menu-item ${
            activeMenu === "security" ? "active" : ""
          }`}
          onClick={() => setActiveMenu("security")}
        >
          보안
        </div>
      </div>

      {activeMenu === "basic" && (
        <div className="basic-settings">
          <FormInputLabel label="이메일" value={user.email} disabled />
          <FormInputLabel
            label="이름"
            value={user.user_metadata.name}
            disabled
          />
        </div>
      )}

      {activeMenu === "security" && (
        <div className="security-settings">
          <FormInputLabel
            label="현재 비밀번호"
            type="password"
            name="currentPassword"
            value={formInput.currentPassword}
            onChange={(e) =>
              setFormInput({ ...formInput, currentPassword: e.target.value })
            }
            onBlur={handleBlur}
            errorMessage={errors.currentPassword}
          />
          <FormInputLabel
            label="새 비밀번호"
            type="password"
            name="userPassword"
            value={formInput.userPassword}
            onChange={(e) =>
              setFormInput({ ...formInput, userPassword: e.target.value })
            }
            onBlur={handleBlur}
            errorMessage={errors.userPassword}
          />
          <FormInputLabel
            label="새 비밀번호 확인"
            type="password"
            name="userPasswordCheck"
            value={formInput.userPasswordCheck}
            onChange={(e) =>
              setFormInput({
                ...formInput,
                userPasswordCheck: e.target.value,
              })
            }
            onBlur={handleBlur}
            errorMessage={errors.userPasswordCheck}
          />
          <div className="security-button-wrap">
            <button className="save-button" onClick={handleChangePassword}>
              저장
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserSettings;
