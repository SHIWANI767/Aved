import { useSelector } from "react-redux";

export const useIsAuthenticated = () => {
  const user = useSelector((state) => state.user);
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  return !!(isLoggedIn && user?.userInfo?.isAuthenticated);
};
