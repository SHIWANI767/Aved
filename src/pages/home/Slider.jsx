// App.js
import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollAnimation from "react-animate-on-scroll";
// Banner Images Data
const bannerData = {
  desktop: [
    {
      image: "/images/Slider/banner_1.jpg",
      heading: "Grand Polo Club & Resort  ",
      description: "Equestrian Opulence, Beyond Imagination.",
    },
    {
      image: "/images/Slider/banner_2.jpg",
      heading: "Grand Polo Club & Resort",
      description: "Equestrian Opulence, Beyond Imagination.",
    },
    {
      image: "/images/Slider/banner_1.jpg",
      heading: "Albero at Dubai Creek Harbour",
      description: "Unfold a New Life",
    },
    {
      image: "/images/Slider/banner_1.jpg",
      heading: "Golf Verge at Emaar South",
      description: "Unfold a New Life",
    },
    {
      image: "/images/Slider/banner_1.jpg",
      heading: "Albero at Dubai Creek Harbour",
      description: "Unfold a New Life",
    },
    // Add more slides as needed
  ],
};

// Slider Settings
const sliderSettings = {
  arrows: false,
  dots: true,
  infinite: true,
  centerMode: true,
  centerPadding: "0px",
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1300,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

// Main Component
const Slider = () => {
  const renderSlides = (images) =>
    images.map(({ image, heading, description }, index) => (
      <Box className="bannerBox" key={index} sx={{ position: "relative" }}>
        <img
          src={image}
          alt={`Slide ${index + 1}`}
          className="silderbannerimg"
          width="1080"
          height="1920"
        />

        <Box className="gradientOverlay" />

        <Container>
          <Box className="slide-caption">
            <img
              src="/images/Slider/GP-LOGO-2.png"
              width="151px"
              height="40px"
              className="slidettopLogo"
            />
            <img
              src="/images/Slider/NEWLY_LAUNCHED_EN.svg"
              alt="Image"
              width="163px"
              height="28px"
              className="slide-badge"
            />
            <ScrollAnimation animateIn="slideInUp">
              <Typography
                variant="h2"
                color="#fff"
                className="bannerheading-text"
              >
                {heading}
              </Typography>
              <Typography
                variant="body2"
                mt={1}
                color="#fff"
                className="bannerdescriptionText"
              >
                {description}
              </Typography>
            </ScrollAnimation>
            <Button variant="contained" color="primary">
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>
    ));

  return (
    <Box
      className="sliderHomepage"
      style={{ position: "relative", zIndex: "999" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SlickSlider {...sliderSettings}>
            {renderSlides(bannerData.desktop)}
          </SlickSlider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Slider;
