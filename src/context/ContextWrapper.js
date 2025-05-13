import React, { useState, useEffect, createContext } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { apiRouterCall } from "../api-services/service";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const setSession = (accessToken) => {
  if (accessToken) {
    sessionStorage.setItem("adminToken", accessToken);
    axios.defaults.headers.common.token = `${accessToken}`;
    Cookies.set("adminToken", accessToken, { expires: 1 }); // Expires in 1 day
  } else {
    sessionStorage.removeItem("adminToken");
    delete axios.defaults.headers.common.token;
    Cookies.remove("adminToken");
  }
};
function checkLogin(token) {
  const adminToken = Cookies.get("adminToken");

  if (typeof window !== "undefined" && window.sessionStorage) {
    if (adminToken) {
      const accessToken = window.sessionStorage.getItem("adminToken") || token;
      return !!accessToken;
    } else {
      window.sessionStorage.removeItem("adminToken");
      return false;
    }
  } else {
    return false;
  }
}

export default function ContextWrapper({ children, ...props }) {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState({});
  const [connectedExchangeList, setConnectedExchangeList] = useState();
  const [openTrmConPol, setOpenTrmConPol] = useState(false);
  const [nowpaymentCoinList, setexchnageType] = useState([]);
  const [subscriptionIdd, setSubscriptionIdd] = useState("");
  const [topHeading, setTopHeading] = useState("Dashboard");
  const [cartCount, setCartCount] = useState(false);
  const [bookmarkCounts, setBookmarkCounts] = useState(false);
  const [language, setLanguage] = useState("en");
  const router = useRouter();

  const getProfileDataHandler = async (token) => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        endPoint: "getProfile",
      });
      if (response.data.responseCode === 200) {
        setUserData(response.data.result);
        let adminToken = response.data.result.userType;
        Cookies.set("adminToken", adminToken);
      } else {
        handleLogout("Your session has expired. Please log in again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.sessionStorage.getItem("adminToken")) {
        getProfileDataHandler(window.sessionStorage.getItem("adminToken"));
      }
    }
  }, [isLogin]);

  const handleLogout = (mess) => {
    sessionStorage.removeItem("adminToken");
    data.userLogIn(false, null);
    router.replace("/");
    Cookies.remove("adminToken");
    Cookies.remove("is_exchange");
    Cookies.remove("AcceptTerm&Condition");
    toast.success(mess);
    // toast.success("Your session has expired. Please log in again.");
  };

  //sign in using google
  const signInWithGoogle = () => {
    // signInWithPopup(auth, new GoogleAuthProvider());
  };
  //sign in using facebook
  const signInWithFacebook = () => {
    // signInWithPopup(auth, new FacebookAuthProvider());
  };
  let data = {
    data: "hello",
    topHeading,
    setTopHeading,
    userLoggedIn: isLogin,
    isAdmin: userData?.userType,
    userData,
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
    nowpaymentCoinList,
    isDashboardLoading: props.isDashboardLoading,
    connectedExchangeList,
    handleLogout: (e) => handleLogout(e),
    getProfileDataHandler: (data) => getProfileDataHandler(data),
    signInWithFacebook,
    signInWithGoogle,
    openTrmConPol,
    setOpenTrmConPol,
    subscriptionIdd,
    setLanguage,
    language,
    cartCount,
    setCartCount,
    bookmarkCounts,
    setBookmarkCounts,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
