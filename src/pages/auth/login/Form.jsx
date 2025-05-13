import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "@/components/InputBoxes/InputBox";
import { useTheme } from "@mui/material/styles";
import i18n from "@/i18n";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/layout/AuthLayout";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "@/store/slices/userSlice";
import { apiRouterCall } from "@/api-services/service";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt from "jsonwebtoken";
import { getDeviceId } from "@/utils";
import toast from "react-hot-toast";

const ResponsiveImg = styled("img")(({ theme }) => ({
  height: "35px",
  maxWidth: "100%",
  objectFit: "contain",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    height: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "25px",
  },

  [theme.breakpoints.down("xs")]: {
    height: "20px",
  },
}));
export default function Form() {
  const theme = useTheme();
  const { i18n, t } = useTranslation();
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const style = {
    toggleBotton: {
      display: "flex",
      flexDirection: "row",
      border: "1.5px solid #25826A",
      padding: "5px", // Reduce padding to prevent overflow
      borderRadius: "10px",
      width: "auto",
      alignItems: "center", // Align items vertically
      gap: "8px", // Add gap between buttons
      flexWrap: "nowrap", // Prevent items from wrapping
      background: "#25826a0f",
    },
    singleBotton: {
      padding: " 8px 25px 8px 25px", // Adjust padding for proper spacing
      cursor: "pointer",
      borderRadius: "10px",
      whiteSpace: "nowrap", // Prevent text from wrapping
    },
    currentLang: {
      color: "white !important",
      backgroundColor: (theme) => theme.palette.custom.main,
    },
    dontHaveAccount: {
      color: "#25826A",
      fontWeight: "bold",
      textDecoration: "underline",
      cursor: "pointer",
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const router = useRouter();
  const authObj = JSON.parse(localStorage.getItem("authObj"));
  const [isRemember, setIsRemember] = useState(authObj?.isRemember || false);

  const formik = useFormik({
    initialValues: {
      email: authObj?.isRemember === true ? authObj?.email : "",
      password: authObj?.isRemember === true ? authObj?.password : "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
          t("errors.invalid_email")
        )
        .required(t("errors.required_email")),

      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          t("errors.invalid_password")
        )
        .required(t("errors.required_password")),
    }),

    onSubmit: async (values) => {
      console.log(formik.errors);
      setLoading(true);

      try {
        const deviceId = await getDeviceId(); // Get the unique device ID
        const response = await apiRouterCall({
          method: "POST",
          endPoint: "login",
          bodyData: {
            emailorMobileNumber: values.email,
            password: values.password,
            deviceId: deviceId, // Send device ID
          },
        });
        console.log(response);
        if (response?.data?.responseCode === 200) {
          toast.success(response?.data?.responseMessage);
          dispatch(setUser(response?.data?.result));
          router.push("/dashboard/properties");
          console.log("API hit successfully", response);
          if (isRemember) {
            localStorage.setItem(
              "authObj",
              JSON.stringify({
                email: values.email,
                password: values.password,
                isRemember: true,
              })
            );
          }
          window.sessionStorage.setItem("isLoggedIn", true);
        } else {
          toast.error(response?.data?.responseMessage);
          console.log("this is the error in the API==>", response);
        }
      } catch (error) {
        console.log(error);
      } finally {
        window.sessionStorage.setItem("isLoggedIn", true);
        console.log("Form Submitted", values);
        setLoading(false);
      }
    },
  });

  // Google Authentication Handler
  const responseGoogle = async (response) => {
    setIsLoading(true);
    const token = response?.credential;
    const decoded = jwt.decode(token);

    try {
      const deviceId = await getDeviceId();
      const credentials = {
        email: decoded?.email.toLowerCase(),
        fullname: decoded?.name,
        deviceId: deviceId,
        socialId: decoded?.sub,
        socialType: "Google",
      };

      const res = await apiRouterCall({
        method: "POST",
        endPoint: "socialLogin",
        bodyData: credentials,
      });
      console.log(res);
      if (res.data.responseCode === 200) {
        window.sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("token", res.data.result.token);
        dispatch(setUser(res?.data?.result?.userInfo));
        toast.success("Logged in successfully.");
        router.push("/dashboard/properties");
      } else {
        toast.error(res?.data?.responseMessage);
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (selectedLanguage) => {
    formik.handleSubmit();
    console.log(i18n.language, selectedLanguage);
    console.log(i18n.isInitialized, "kdkd");
    localStorage.setItem("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    setCurrentLang(selectedLanguage); // Trigger re-render
  };

  useEffect(() => {
    const passwordInput = document.querySelector('input[name="password"]');
    if (passwordInput && passwordInput.value) {
      formik.setFieldValue("password", passwordInput.value);
    }
  }, []);
  return (
    <Box mt={10}>
      <Container maxWidth="sm">
        <Typography variant="title2">{t("login_section.title")}</Typography>
        <Typography variant="h6" color="#8f8787">
          {t("login_section.description")}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2}>
            <Typography variant="h6"> {t("login_section.email")}</Typography>
            <InputBox
              type="text"
              name="email"
              placeholder="example@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              placeholderColor="#333"
              maxLength={256}
            />
            {formik.touched.email && formik.errors.email && (
              <Typography color="#DF3939" variant="body1">
                {formik.errors.email}
              </Typography>
            )}
          </Box>
          <Box mt={1}>
            <Typography variant="h6">{t("login_section.password")}</Typography>
            <InputBox
              type="password"
              name="password"
              placeholder={t("login_section.password_placeholder")}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              placeholderColor="#333"
              maxLength={16}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography color="#DF3939" variant="body1">
                {formik.errors.password}
              </Typography>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box pl={1} mt={-1}>
              <FormControlLabel
                sx={{ color: "#8f8787", fontSize: "14px" }}
                control={
                  <Checkbox
                    //name="checkedC"
                    checked={isRemember}
                    onClick={() => setIsRemember(!isRemember)}
                    size="small"
                  />
                }
                label={t("login_section.remember_me")}
              />
            </Box>
            <Typography
              variant="body3"
              color="#25826A"
              fontWeight={600}
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/auth/forgotpassword")}
            >
              {t("login_section.forgot_password")}
              {/* </Link> */}
            </Typography>
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%" }}
              disbaled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Box>
          <Divider sx={{ color: "#8f8787", mt: 2 }}>
            {" "}
            {t("login_section.or")}
          </Divider>
          <Box mt={2} display="flex" justifyContent="center">
            <GoogleOAuthProvider
              clientId={process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID}
            >
              <GoogleLogin
                onSuccess={responseGoogle}
                onError={responseGoogle}
                text="Google"
                size="large"
                shape="square"
                scope="profile email"
                disabled={!check}
                className="custom-google-login-button"
              />
            </GoogleOAuthProvider>
          </Box>
          <br />
          <Typography variant="h6" textAlign={"center"}>
            {t("login_section.no_account")}&nbsp;
            <span
              style={style.dontHaveAccount}
              onClick={() => router.push("/auth/signup")}
            >
              {t("login_section.signup")}
            </span>
          </Typography>
        </form>
      </Container>
    </Box>
  );
}

Form.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
