import { Box, Container, Grid, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ExitedCard from "./ExitedCard"; // Your ExitedCard component
import { useEffect, useState } from "react";
import { getAPIHandler } from "@/api-services/service";
import { useTranslation } from "react-i18next";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1600 },
    items: 3, // Keep this as 3
  },
  largeDesktop: {
    breakpoint: { max: 1599, min: 1280 },
    items: 3, // Change from 4 to 3
  },
  tablet: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
  },
  smallTablet: {
    breakpoint: { max: 768, min: 769 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 767, min: 499 },
    items: 1,
  },
  smallMobile: {
    breakpoint: { max: 499, min: 1 },
    items: 1,
  },
};

export default function CarouselComp() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const getProperties = async () => {
    try {
      setLoading(true);
      const response = await getAPIHandler({
        endPoint: "getExitedPropertiesWeb",
      });
      if (response?.data?.responseCode === 200) {
        setProperties(response?.data?.properties || []);
      } else {
        console.log("Something went wrong");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <Container maxWidth={"lg"}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        mb={4}
        mt={15}
      >
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid item>
            <Box
              sx={{
                width: "82px",
                height: "2px",
                backgroundColor: "#25826a",
              }}
            />
          </Grid>
          <Grid item>
            <Typography fontSize="19px" color="#25826a" fontWeight="600">
              {t("exited_section.title")}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h2">{t("exited_section.des")}</Typography>
      </Box>

      <Box>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={false}
          autoPlay={false}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="transform 500ms cubic-bezier(0.42, 0, 0.58, 1)"
          transitionDuration={500}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {
            properties?.map((item, index) => (
              <Box sx={{ margin: "0 8px" }} key={index}>
                <ExitedCard data={item} />
              </Box>
            )
            )}
        </Carousel>
      </Box>
      {properties.length === 0 && !loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:'20px' , img: { height: { xs: '150px', sm: '250px' } } }}>
          <img src='/images/comingSoon.png' alt='comingSoon' />
        </Box>)}
    </Container>
  );
}
