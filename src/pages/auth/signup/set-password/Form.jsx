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

  // const handleChange = (selectedLanguage) => {
  //   console.log(i18n.language, selectedLanguage);
  //   console.log(i18n.isInitialized, "kdkd");
  //   localStorage.setItem("language", selectedLanguage);
  //   i18n.changeLanguage(selectedLanguage);
  //   setCurrentLang(selectedLanguage); // Trigger re-render
  // };

  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          t("errors.invalid_password")
        )
        .required(t("errors.required_password")),

      cpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], t("errors.passwords_must_match"))
        .required(t("errors.required_cpassword")),
    }),

    onSubmit: async (values) => {
      const _id = localStorage.getItem("user_id");
      console.log(_id);

      setLoading(true);
      try {
        const response = await apiRouterCall({
          method: "POST",
          endPoint: "setPassword",
          bodyData: {
            _id: _id,
            password: values.password,
            confirmPassword: values.cpassword,
          },
        });
        if (response.data.responseCode === 200) {
          toast.success(response.data.responseMessage);
          console.log("Password set successfully", response);
          router.push("/auth/signup/phone-input");
        } else {
          toast.error(response.data.responseMessage);
          console.log("error while hitting", response);
        }
      } catch (err) {
        console.log("this is my error", err);
      } finally {
        console.log(formik.errors);
        setLoading(false);
      }
    },
  });

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
        <Typography variant="title2">
          {/* {t("signup_section.title")} */}
          Set Password
        </Typography>
        <Typography variant="h6" color="#8f8787">
          {/* {t("signup_section.description")} */}
          Set a secure password to access Nesba's features.
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={1}>
            <Typography variant="h6">
              {" "}
              {t("signup_section.password")}
            </Typography>
            <InputBox
              type="password"
              name="password"
              placeholder={t("signup_section.password_placeholder")}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              placeholderColor="#333"
              maxLength={16}
            />
            {formik.touched.password && formik.errors.password && (
              <Typography
                color="#DF3939"
                variant="body1"
                style={{ wordWrap: "break-word", whiteSpace: "normal" }}
              >
                {formik.errors.password}
              </Typography>
            )}
          </Box>
          <Box mt={1}>
            <Typography variant="h6">
              {t("signup_section.confirm_password")}
            </Typography>
            <InputBox
              type="password"
              name="cpassword"
              placeholder={t("signup_section.confirm_password_placeholder")}
              value={formik.values.cpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.cpassword && !!formik.errors.cpassword}
              placeholderColor="#333"
              maxLength={16}
            />
            {formik.touched.cpassword && formik.errors.cpassword && (
              <Typography color="#DF3939" variant="body1">
                {formik.errors.cpassword}
              </Typography>
            )}
          </Box>

          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ width: "100%" }}
            >
              {loading ? "Loading..." : "Next"}
            </Button>
            {/* <Divider sx={{ color: "#8f8787", mt: 2 }}>
              {t("signup_section.or")}
            </Divider>
            <Typography variant="h6" textAlign={"center"} mt={2}>
              Ask me later ?&nbsp;
              <span
                style={style.dontHaveAccount}
                onClick={() => router.push("/auth/login")}
              >
                Skip
              </span>
            </Typography> */}
          </Box>
        </form>
      </Container>
    </Box>
  );
}
