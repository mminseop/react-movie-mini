import { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import FormInputLabel from "./FormInputLabel";

function UserSettings() {
  const { user } = useUserAuth();
  const [activeMenu, setActiveMenu] = useState("basic"); // basic / security

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
      {/* 콘텐츠 영역 */}
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
          <FormInputLabel label="현재 비밀번호" type="password" />
          <FormInputLabel label="새 비밀번호" type="password" />
          <FormInputLabel label="새 비밀번호 확인" type="password" />
          <div className="security-button-wrap">
            <button className="save-button">저장</button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserSettings;
