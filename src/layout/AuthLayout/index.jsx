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
export default function AuthLayout({ children }) {
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

  const handleChange = (selectedLanguage) => {
    console.log(i18n.language, selectedLanguage);
    console.log(i18n.isInitialized, "kdkd");
    localStorage.setItem("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    setCurrentLang(selectedLanguage); // Trigger re-render
  };
  return (
    <Container maxWidth="lg" sx={{ padding: "4% 1% 0 1% " }}>
      <Grid container>
        <Grid item lg={6} md={6} sm={6} xs={6} alignContent={"center"}>
          {" "}
          <ResponsiveImg
            src="/images/Login/logo.png"
            alt="Logo"
            onClick={() => router.push("/")}
          />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={6}
          xs={6}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Box sx={style.toggleBotton}>
            <Box
              sx={{
                ...style.singleBotton,
                ...(currentLang === "en" ? style.currentLang : {}),
              }}
              onClick={() => handleChange("en")}
            >
              <Typography variant="body1">English</Typography>
            </Box>

            <Box
              sx={{
                ...style.singleBotton,
                ...(currentLang === "ar" ? style.currentLang : {}),
              }}
              onClick={() => handleChange("ar")}
            >
              <Typography variant="body1">اوربی</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider
        sx={{
          backgroundColor: "#25826A",
          marginTop: 4,
        }}
      />
      <Box mt={2}>{children}</Box>
    </Container>
  );
}
