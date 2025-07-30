import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { alertError, alertSuccess } from "../utils/alert";
import LoadingIndicator from "../components/LoadingIndicator";

export default function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession(); // 세션 가져오기
      if (session) {
        // 로그인 완료됨
        await alertSuccess("로그인 성공!", "로그인이 완료되었습니다.");
        navigate("/");
      } else {
        console.error(error);
        alertError("로그인 실패!", "로그인에 실패하였습니다.");
        navigate("/login");
      }
    };

    login();
  }, []);

  return (
    <LoadingIndicator loadingText={"로그인 처리중"} />
  )
}