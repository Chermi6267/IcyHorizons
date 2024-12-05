import { logIn, logOut } from "@/store/authSlice";
import { IUser, setUser } from "@/store/userSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";

export default function AuthHandler() {
  const dispatch = useDispatch();

  if (
    typeof localStorage !== "undefined" &&
    localStorage.getItem("token") !== null
  ) {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refreshAccessToken`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(logIn(res.data.accessToken));
        const decodedAccessToken = jwtDecode<IUser>(res.data.accessToken);

        dispatch(
          setUser({
            email: decodedAccessToken.email,
            role: decodedAccessToken.role,
            loggedWith: decodedAccessToken.loggedWith,
            avatar: decodedAccessToken.avatar,
            name: decodedAccessToken.name,
            header: decodedAccessToken.header,
          })
        );
      })
      .catch((error) => {
        dispatch(logOut());
        // console.error(error);
      });
  }

  return null;
}
