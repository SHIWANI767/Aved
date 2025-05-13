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
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputBox from "@/components/InputBoxes/InputBox";
import { useTheme } from "@mui/material/styles";
import i18n from "@/i18n";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { apiRouterCall } from "@/api-services/service";
import { setUser, logout } from "@/store/slices/userSlice";

import toast from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt from "jsonwebtoken";
import { getDeviceId } from "@/utils";
import { useDispatch } from "react-redux";

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
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

  const [loading, setLoading] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      referalCode: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t("errors.name_min_length"))
        .matches(/^(?!\d+$).*$/, t("errors.name_no_only_numbers")) // Ensures the name is not only numbers
        .required(t("errors.required_name")),
      email: Yup.string()
        .matches(
          /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,
          t("errors.invalid_email")
        )
        .required(t("errors.required_email")),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await apiRouterCall({
          method: "POST",
          endPoint: "signup",
          bodyData: {
            fullName: values.name,
            email: values.email,
            invitationCode: values.referalCode,
          },
        });

        if (response.data.responseCode === 200) {
          toast.success("OTP have been sent to your mail.");
          router.push({
            pathname: "/auth/signup/optverification",
            query: { email: values.email },
          });
          localStorage.setItem("user_id", response?.data?.result?.userId);
          const newExpiration = Math.floor(Date.now() / 1000) + 180;
          localStorage.setItem("otp_expiration", newExpiration);
          console.log("This is my _id", response?.data?.result?.userId);
          console.log("Form Submitted", values);
          console.log(
            process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID,
            "this is the client id"
          );
        } else {
          console.log(
            process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID,
            "this is else the client id"
          );
          toast.error(
            response?.data?.responseMessage || response?.data?.message
          );
          console.log("Thisis else data", response);
        }
      } catch (err) {
        console.log("mera ye error hai", err);
      }
      console.log(formik.errors);
      console.log("Form Out =>");
      setLoading(false);
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

      if (res.data.responseCode === 200) {
        if (res?.data?.result?.userInfo?.mobileNumber) {
          window.sessionStorage.setItem("isLoggedIn", true);
          dispatch(setUser(res?.data?.result?.userInfo));
        } else {
          router.push("/auth/signup/phone-input");
          return;
        }

        toast.success("Sign up successfull!");
        localStorage.setItem("user_id", res?.data?.result?.userInfo?._id);
        window.sessionStorage.setItem("isLoggedIn", true);
        router.push("/dashboard/properties");

        const newExpiration = Math.floor(Date.now() / 1000) + 180;
        // localStorage.setItem("otp_expiration", newExpiration);
      } else {
        toast.error(res?.data?.responseMessage);
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "85vh",
        overflowX: "auto", // Enable horizontal scrolling
        whiteSpace: "nowrap", // Prevent line breaks
        scrollbarWidth: "thin", // Firefox
        "&::-webkit-scrollbar": {
          height: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1",
        },
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="title2">{t("signup_section.title")}</Typography>
        <Typography variant="h6" color="#8f8787">
          {t("signup_section.description")}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2}>
            <Typography variant="h6"> {t("signup_section.name")}</Typography>
            <InputBox
              type="text"
              name="name"
              placeholder={t("signup_section.name_placeholder")}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && !!formik.errors.name}
              placeholderColor="#333"
              maxLength={90}
            />
            {formik.touched.name && formik.errors.name && (
              <Typography color="#DF3939" variant="body1">
                {formik.errors.name}
              </Typography>
            )}
          </Box>
          <Box mt={1}>
            <Typography variant="h6"> {t("signup_section.email")}</Typography>
            <InputBox
              type="text"
              name="email"
              placeholder={t("signup_section.email_placeholder")}
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
            <Typography variant="h6">
              {t("signup_section.referral_code")}
            </Typography>
            <InputBox
              type="text"
              name="referalCode"
              placeholder={t("signup_section.referral_code_placeholder")}
              value={formik.values.referalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.referalCode && !!formik.errors.referalCode}
              placeholderColor="#333"
              maxLength={20}
            />
            {formik.touched.referalCode && formik.errors.referalCode && (
              <Typography color="#DF3939" variant="body1">
                {formik.errors.referalCode}
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
                    checked={check}
                    onClick={() => setCheck(!check)}
                    size="small"
                  />
                }
                label={
                  <Typography sx={{ color: "#8f8787" }}>
                    {t("accept")}{" "}
                    <a
                      onClick={() => window.open("/terms-conditions", "_blank")}
                      style={{
                        fontWeight: "600",
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {t("terms_and_conditions")}
                    </a>{" "}
                    &{" "}
                    <a
                      onClick={() => window.open("/privacy-policy", "_blank")}
                      style={{
                        fontWeight: "600",
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      {t("privacy_policy")}
                    </a>
                  </Typography>
                }
              />
            </Box>
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              disabled={!check || loading}
              sx={{ width: "100%" }}
            >
              {loading ? "Loading..." : "Next"}
            </Button>
          </Box>
          <Divider sx={{ color: "#8f8787", mt: 2 }}>
            {t("signup_section.or")}
          </Divider>
          {/* Google Login Button */}
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
                locale={i18n.language === "ar" ? "ar" : "en"}
              />
            </GoogleOAuthProvider>
          </Box>
          <Typography variant="h6" textAlign={"center"}>
            {t("signup_section.already_have_account")}&nbsp;
            <span
              style={style.dontHaveAccount}
              onClick={() => router.push("/auth/login")}
            >
              {t("signup_section.signin")}
            </span>
          </Typography>
        </form>
      </Container>
    </Box>
  );
}
