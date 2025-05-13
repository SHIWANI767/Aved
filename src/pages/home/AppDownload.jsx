import React, { useContext, useEffect } from "react";
import { Box, Button, Container, Typography, styled } from "@mui/material";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/router";
import ScrollAnimation from "react-animate-on-scroll";
import { UseTranslation, useTranslation } from "next-i18next";
const AppDownloadBox = styled(Box)(({ theme, color = "#f0f0f0" }) => ({
  "& .botmainBox": {
    filter: "hue-rotate(375deg)",
    zIndex: 1,
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: "url(/images/app_banner.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    borderRadius: "20px",
    marginTop: "100px",
    marginBottom: "80px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "40px",
      marginBottom: "60px",
    },
  },
  "& .contentBox": {
    padding: "114px 110px",
    [theme.breakpoints.down("sm")]: {
      padding: "30px",
    },
  },
  "& p": {
    maxWidth: "600px",
  },
  "& h1": {
    fontSize: "54px",
    fontWeight: "700",
  },
  "& .appdownloadmargin": {
    [theme.breakpoints.down("sm")]: {
      gap: "20px !important",
    },
  },
  "& img": {
    width: "auto",
    maxWidth: "265px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      maxWidth: "130px",
    },
  },
}));

export default function AppDownload() {
  const auth = useContext(AppContext);
  const { t } = useTranslation();
  const router = useRouter();
  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("About");
    }
  }, [auth]);

  return (
    <AppDownloadBox>
      <Container className="">
        <ScrollAnimation animateIn="slideInUp">
          <Box className="botmainBox main-sectionGap">
            <Box className="contentBox" align="center">
              <ScrollAnimation animateIn="slideInLeft">
                <Typography variant="h2" color="#fff" mb={2.5}>
                  {t("download_app.title")}
                </Typography>
              </ScrollAnimation>
              <ScrollAnimation animateIn="slideInRight">
                <Typography variant="h5" color="#ffffff" mb={5}>
                  {t("download_app.description1")} <br></br>
                  {t("download_app.description2")}
                  <br></br>
                  {t("download_app.description3")}
                </Typography>
              </ScrollAnimation>

              <Box
                className="displayCenter appdownloadmargin"
                gap="40px"
                mb={4}
              >
                <ScrollAnimation animateIn="slideInLeft">
                  <img
                    src="/images/android.png"
                    alt="Profile 1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.example.android",
                        "_blank"
                      );
                    }}
                  />
                </ScrollAnimation>
                <ScrollAnimation animateIn="slideInRight">
                  <img
                    src="/images/ios.png"
                    alt="Profile 1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(
                        "https://apps.apple.com/app/id1234567890",
                        "_blank"
                      );
                    }}
                  />
                </ScrollAnimation>
              </Box>
            </Box>
          </Box>
        </ScrollAnimation>
      </Container>
    </AppDownloadBox>
  );
}
