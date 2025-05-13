import { Container, Grid, Typography, Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";

import React from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ScrollAnimation from "react-animate-on-scroll";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function OurCompany() {
  const router = useRouter();
  const user = useSelector((state) => state.user)
  const { t } = useTranslation();

  const style = {
    listContent: {
      display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   paddingLeft:"0px !important",
    },
    headerSection: {
      display: "flex",
      alignItems: "center",
      // justifyContent: 'center',
      gap: "15px",
      marginBottom: "12px",
    },

    subtitle: {
      color: "#25826a",
      fontWeight: 700,
    },

    trackBox: {
      display: "flex",
      // justifyContent:'center',
      alignItems: "center",
      gap: "20px",
    },

    divider: {
      width: "70px",
      height: "2px",
      backgroundColor: "#25826a",
    },
    sideImg: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    img: {
      height: "58vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "@media(max-width: 1320px)": {
        height: "71vh",
        width: "100%",
      },
      "@media(max-width: 1200px)": {
        height: "72vh",
        width: "100%",
      },
      "@media(max-width: 900px)": {
        height: "45vh",
        width: "100%",
      },
      "@media(max-width: 600px)": {
        height: "40vh",
        width: "100%",
      },
      "@media(max-width: 400px)": {
        height: "35vh",
        width: "100%",
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={2}
        // justifyContent="space-between"
        // alignItems="center"
        mt={12}
        mb={12}
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <ScrollAnimation animateIn="slideInLeft">
            <Box sx={style.img}>
              <img
                src="/images/Project/aboutCompany.avif"
                alt="CompanyImage"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                }}
              />
            </Box>
          </ScrollAnimation>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          {" "}
          <ScrollAnimation animateIn="slideInUp">
            <Box sx={style.headerSection}>
              <Box sx={style.divider} />
              <Typography variant="h5" sx={style.subtitle}>
                {t("about_nesba.title")}
              </Typography>
            </Box>
            <Typography variant="h2">{t("about_nesba.subtitle")}</Typography>
            <Box mt={3}>
              {" "}
              <Typography variant="body3" color="secondary">
                {t("about_nesba.description")}
              </Typography>
            </Box>
          </ScrollAnimation>
          <ScrollAnimation animateIn="slideInUp">
            <Grid container spacing={3} mt={4}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={style.listContent}>
                <span>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "#25826A" }} />
                </span>{" "}
                <Typography variant="h5">
                  {" "}
                  {t("about_nesba.highlights.regulated_by_authority")}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={style.listContent}>
                <span>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "#25826A" }} />
                </span>{" "}
                <Typography variant="h5">
                  {" "}
                  {t("about_nesba.highlights.market_insights")}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={style.listContent}>
                <span>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "#25826A" }} />
                </span>{" "}
                <Typography variant="h5">
                  {" "}
                  {t("about_nesba.highlights.flexible_options")}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={style.listContent}>
                <span>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "#25826A" }} />
                </span>{" "}
                <Typography variant="h5">
                  {" "}
                  {t("about_nesba.highlights.investor_support")}
                </Typography>
              </Grid>
            </Grid>
          </ScrollAnimation>
          <ScrollAnimation animateIn="slideInUp">
            <Divider sx={{ borderColor: "#25826A", mt: 4 }} />
            <Box mt={5} sx={style.trackBox}>
              {" "}
              <Button variant="contained" color="primary" onClick={() => user?.isAuthenticated ? router.push('/dashboard/properties') : router.push('/auth/login')}>
                {" "}
                {t("invest_now")}
              </Button>
              <Box
                sx={{
                  borderRadius: "50%",
                  height: "50px",
                  width: "50px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.2)",
                  },
                }}
                onClick={() => {
                  window.location.href = "tel:+9660549749708";
                }}
              >
                <LocalPhoneIcon style={{ color: "#25826a" }} />
              </Box>
              <Box>
                <Typography variant="body3"> {t("need_help")}</Typography>
                <Typography variant="h6" color="#25826a">
                  +966-0549749708
                </Typography>
              </Box>
            </Box>
          </ScrollAnimation>
        </Grid>
      </Grid>
    </Container>
  );
}
