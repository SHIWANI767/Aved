import { Container, Grid, Typography, Box, Button } from "@mui/material";
import Divider from "@mui/material/Divider";

import React from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ScrollAnimation from "react-animate-on-scroll";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export default function WhyChooseUs() {
  const router = useRouter();
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
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
        mt={8}
        mb={8}
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          {" "}
          <ScrollAnimation animateIn="slideInUp">
            <Box sx={style.headerSection}>
              <Box sx={style.divider} />
              <Typography variant="h5" sx={style.subtitle}>
                {t("why_choose_us.title")}
              </Typography>
            </Box>
            <Typography variant="h2">{t("why_choose_us.subtitle")}</Typography>
            <Box mt={3}>
              {" "}
              <Typography variant="body3" color="secondary">
                {t("why_choose_us.description")}
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
                  {t("why_choose_us.highlights.secure_investments")}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={style.listContent}>
                <span>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "#25826A" }} />
                </span>{" "}
                <Typography variant="h5">
                  {" "}
                  {t("why_choose_us.highlights.maximize_growth")}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={style.listContent}>
                <span>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "#25826A" }} />
                </span>{" "}
                <Typography variant="h5">
                  {" "}
                  {t("why_choose_us.highlights.market_analysis")}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={style.listContent}>
                <span>
                  <KeyboardDoubleArrowRightIcon sx={{ color: "#25826A" }} />
                </span>{" "}
                <Typography variant="h5">
                  {" "}
                  {t("why_choose_us.highlights.hassle_free_transactions")}
                </Typography>
              </Grid>
            </Grid>
          </ScrollAnimation>
          <ScrollAnimation animateIn="slideInUp">
            <Divider sx={{ borderColor: "#25826A", mt: 4 }} />
            <Box mt={5} onClick={() => router.push("/about-us")}>
              {" "}
              <Button variant="contained" color="primary">
                {" "}
                {t("know_more")}
              </Button>
            </Box>
          </ScrollAnimation>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <ScrollAnimation animateIn="slideInRight">
                <Box>
                  <img src="/images/Landing/investment_service1.jpg" alt="" />
                </Box>
                <br />
                <Box>
                  <img src="/images/Landing/investment_service2.jpg" alt="" />
                </Box>
              </ScrollAnimation>
            </Grid>

            <Grid
              item
              lg={5}
              md={5}
              sm={12}
              xs={12}
              sx={{ ...style.sideImg, display: { xs: "none", md: "flex" } }}
            >
              {" "}
              <ScrollAnimation animateIn="slideInRight">
                <Box>
                  <img
                    src="/images/Landing/investment_service3.jpg"
                    alt=""
                    height={"300vh"}
                    width={"100%"}
                  />
                </Box>
              </ScrollAnimation>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
