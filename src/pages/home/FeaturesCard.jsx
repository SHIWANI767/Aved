import { Container, Grid, Typography, Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function FeaturesCard() {
    const { t } = useTranslation();

  const style = {
    cardStyle: {
      position: "relative",
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
      height: "fit-content",
      padding: "30px",
      backgroundColor: "#fff",
      borderBottom: "4px solid #25826A",
      overflow: "hidden",
      transition: "transform 0.5s ease-in-out",
      cursor: "pointer",

      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#25826A", // Background color on hover
        transform: "translateY(100%)", // Start from bottom
        transition: "transform 0.5s ease-in-out",
        zIndex: 0,
      },

      "&:hover::before": {
        transform: "translateY(0)", // Slide up on hover
      },

      "&:hover": {
        transform: "translateY(-50px)", // Slight scale-up effect
        color: "#fff",
      },

      // Apply hover effect to the image when hovering over the entire card
      "&:hover img": {
        filter: "brightness(0) invert(1) !important", // Changes the image to white on hover
      },
    },
    img: {
      height: "70px",
      width: "70px",
      position: "relative",
      zIndex: 1,
      // filter: "grayscale(100%) brightness(0) invert(28%) sepia(45%) saturate(673%) hue-rotate(134deg) brightness(91%) contrast(92%)"
      "&:hover": {
        filter: "brightness(0) invert(1) !important",
      },
    },
    text: {
      position: "relative",
      zIndex: 1, // Ensure text stays above background
    },
  };

  const cardContent = [
    {
      img: "/images/Landing/verified_house.png",
      title: t("features.verified_properties.title"),
      description: t("features.verified_properties.description"),
    },
    {
      img: "/images/Landing/Ownership.png",
      title: t("features.fractional_ownership.title"),
      description: t("features.fractional_ownership.description"),
    },
    {
      img: "/images/Landing/Portfolio.png",
      title: t("features.diversified_portfolio.title"),
      description: t("features.diversified_portfolio.description"),
    },
    {
      img: "/images/Landing/verified_house.png",
      title: t("features.earn_monthly_returns.title"),
      description: t("features.earn_monthly_returns.description"),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
        mt={10}
        mb={11}
      >
        {cardContent.map((item, index) => (
          <Grid
            item
            lg={3}
            md={3}
            sm={6}
            xs={12}
            key={index}
            style={{ cursor: "pointer" }}
          >
            <Box sx={style.cardStyle}>
              <img src={item.img} style={style.img} alt={item.title} />
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", marginTop: "10px", ...style.text }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginTop: "5px", ...style.text }}
              >
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
