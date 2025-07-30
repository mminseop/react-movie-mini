import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

// 사용자 인증 정보를 공유할 context 생성
const UserAuthContext = createContext();

// Context Provider 컴포넌트 (전역 상태를 자식 컴포넌트에 전달)
export function UserAuthProvider({ children }) {
  const [user, setUser] = useState(null); //현재 로그인된 사용자 정보
  const [loading, setLoading] = useState(true); // 초기 로딩 상태

  // 컴포넌트 마운트 시 로그인 세션 있는지 확인
  useEffect(() => {
    // 현재 로그인된 세션 정보를 가져오는 비동기 함수
    const getSession = async () => {
      // Supabase에서 현재 로그인 세션(session) 정보 가져오기
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // 세션이 있으면 user를 추출, 없으면 null
      const currentUser = session && session.user ? session.user : null;

      setUser(currentUser); // user 상태 업데이트 (로그인된 유저 or null)

      // 사용자가 로그인된 상태라면
      if (currentUser) {
        // 사용자 정보를 로컬스토리지에 저장
        const userInfo = {
          userId: currentUser.id,
          userEmail: currentUser.email,
          userName: currentUser.user_metadata?.name || "",
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo)); // 문자열로 변환해서 저장, 안하면 object로 뜸
      } else {
        localStorage.removeItem("userInfo"); // 로그인 안된 상태면 기존 로컬스토리지 정보 삭제
      }
      setLoading(false);
    };
    getSession();

    // 로그인, 로그아웃 등 인증 상태가 바뀔 때마다 호출되는 리스너 등록
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      // 새롭게 바뀐 세션에서 유저 정보 추출
      const newUser = session && session.user ? session.user : null;
      setUser(newUser);
      if (newUser) {
        const userInfo = {
          userId: newUser.id,
          userEmail: newUser.email,
          userName: newUser.metadata?.name || "",
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      } else {
        localStorage.removeItem("userInfo");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // 로그인 함수
  const login = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error; // 실패 시 예외 에러
  };

  // 회원가입 함수
  const signUp = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  // 로그아웃 함수
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Context로 로그인 관련 상태와 함수들을 하위 컴포넌트에 전달
  return (
    <UserAuthContext.Provider value={{ user, loading, login, signUp, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}

// Context를 사용하기 위한 커스텀 훅
export const useUserAuth = () => useContext(UserAuthContext);
