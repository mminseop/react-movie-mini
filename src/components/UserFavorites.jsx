import { useUserAuth } from "../context/UserAuthContext";

function UserFavorites() {
  const { user } = useUserAuth();
  return (
    <>
      <h2>찜한 목록</h2>
    </>
  );
}

export default UserFavorites;
