import { RootState } from "@/store";
import { useSelector } from "react-redux";

function useAuth() {
  const isAuth = useSelector((state: RootState) => {
    return state.auth.isLoggedIn;
  });

  const user = useSelector((state: RootState) => {
    return state.user;
  });

  return { isAuth, user };
}

export default useAuth;
