import { useUserAuth } from "../context/UserAuthContext";
import FormInputLabel from "./FormInputLabel";


function UserSettings() {
    const {user } = useUserAuth();
  return (
    <>
      <h2>계정 설정</h2>
      <div className="my-page-content-menu-wrap">
        <div className="my-page-content-menu-item active">기본정보</div>
        <div className="my-page-content-menu-item">보안</div>
      </div>
      <FormInputLabel label={"이메일"} value={user.email} disabled />
      <FormInputLabel label={"이름"} value={user.user_metadata.name} disabled />
    </>
  );
}

export default UserSettings;
