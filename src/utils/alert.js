import Swal from "sweetalert2";

// 성공 알림창
export const alertSuccess = (title, message) => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: message,
    confirmButtonText: "확인",
  });
};

// 에러 알림창
export const alertError = (title, message) => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: message || "문제가 발생했습니다.",
    confirmButtonText: "확인",
  });
};