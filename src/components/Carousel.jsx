import { Box, Container, Grid, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ExitedCard from "@/pages/home/ExitedCard";
import { useEffect, useState } from "react";
import { getAPIHandler } from "@/api-services/service";
import { useTranslation } from "react-i18next";
import Slides from "@/components/Slides/AuthSlide";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 1, // Change to 1
  },
  largeDesktop: {
    breakpoint: { max: 1599, min: 1280 },
    items: 1, // Change to 1
  },
  tablet: {
    breakpoint: { max: 1280, min: 1024 },
    items: 1, // Change to 1
  },
  smallTablet: {
    breakpoint: { max: 768, min: 769 },
    items: 1, // Change to 1
  },
  mobile: {
    breakpoint: { max: 767, min: 499 },
    items: 1, // Change to 1
  },
  smallMobile: {
    breakpoint: { max: 499, min: 1 },
    items: 1, // Change to 1
  },
};

export default function CarouselComp() {
  const { t, i18n } = useTranslation();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Update properties when language changes
    setProperties([
      {
        img: "/images/Login/income.png",
        heading: t("investment_tips.0.heading"),
        subHeading: t("investment_tips.0.subHeading"),
      },
      {
        img: "/images/Login/income.png",
        heading: t("investment_tips.1.heading"),
        subHeading: t("investment_tips.1.subHeading"),
      },
      {
        img: "/images/Login/income.png",
        heading: t("investment_tips.2.heading"),
        subHeading: t("investment_tips.2.subHeading"),
      },
    ]);
  }, [i18n.language]); // Trigger update when language changes
  const [loading, setLoading] = useState(true);

  return (
    <Container sx={{ padding: "0px !important", height: "100vh" }}>
      <Box
        sx={{
          ".custom-dot-list-style": {
            position: "absolute",
            bottom: "50px", // Move dots up
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
      >
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          arrows={false} // Hide arrow buttons
          customTransition="transform 500ms cubic-bezier(0.42, 0, 0.58, 1)"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {properties.length === 0 && !loading ? (
            <Typography
              variant="h6"
              color="gray"
              fontWeight="500"
              mt={10}
              mb={10}
              textAlign={"center"}
              // width={"300%"}
            >
              Comming Soon ...
            </Typography>
          ) : (
            properties?.map((item, index) => (
              <Box sx={{ margin: "0 0px" }} key={index}>
                <Slides
                  img={item.img}
                  heading={item.heading}
                  subHeading={item.subHeading}
                />
              </Box>
            ))
          )}
        </Carousel>
      </Box>
    </Container>
  );
}
