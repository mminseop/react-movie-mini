import { createContext, useContext, useState } from "react";

// FavoritesContext 만들기
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // 찜한 영화 목록을 상태로 관리

  // 찜한 영화 추가/삭제 함수
  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      // 현재 찜 목록에 해당 영화가 있는지 확인
      const hasMovie = prev.some((m) => m.id === movie.id);

      // 있으면 필터링해서 제거, 없으면 새로 추가
      return hasMovie ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
    });
  };

  // 특정 영화가 찜 목록에 있는지 확인하는 함수
  const isFavorite = (id) => {
    return favorites.some((m) => m.id === id);
  };

  // Provider로 상태와 함수들을 하위 컴포넌트에 전달
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 다른 컴포넌트에서 찜 목록 컨텍스트를 사용할 수 있도록 하는 커스텀hook
export function useFavorites() {
  return useContext(FavoritesContext);
}