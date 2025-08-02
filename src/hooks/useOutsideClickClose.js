import { useEffect } from "react";

// 특정 요소(ref) 바깥을 클릭했을 때 callback을 실행하는 커스텀훅.
// 드롭다운, 모달 등에서 다른 곳 클릭 시 닫기 기능

function useOutsideClickClose(ref, callback, isOpen = true) {
  useEffect(() => {
    if (!isOpen) return; // 열려 있지 않으면 종료

    // 문서 전체에서 클릭된 영역이 ref 요소 바깥인지 확인
    const handleClickOutside = (event) => {
      // ref.current가 유효하고, 클릭된 요소가 그 안에 포함되지 않은 경우
      if (ref.current && !ref.current.contains(event.target)) {
        callback(); //콜백 실행
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // mousedown 이벤트를 문서 전체에 등록 (마우스 클릭 감지)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); //컴포넌트 언마운트 시, 이벤트 리스너 제거 (메모리 누수 방지)
    };
  }, [ref, callback, isOpen]);
}

export default useOutsideClickClose;
