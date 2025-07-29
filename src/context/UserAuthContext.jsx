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
    const getSession = async () => {
      const {
        data: { session }, // 세션 객체 가져오기
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null); // 세션이 있으면 user 설정, 없으면 null
      setLoading(false); // 로딩 끝
    };
    getSession();

    // 로그인/로그아웃 등 인증 상태 변경 실시간 감지
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null); // 세션 바뀌면 user 갱신
      }
    );

    // 언마운트 시 리스너 제거
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
