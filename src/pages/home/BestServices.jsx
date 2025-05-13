import React from "react";
import { Box, Grid, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import ScrollAnimation from "react-animate-on-scroll";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";



const MainComponent = styled("div")(({ theme }) => ({
  padding: "40px 0",
  backgroundColor: "#F8FAFC",
  position: "relative",

  "& .mainTitle": {
    textAlign: "center",
    marginBottom: "40px",
  },

  "& .headerSection": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    marginBottom: "12px",
  },

  "& .subtitle": {
    color: "#25826a",
    fontWeight: 500,
  },

  "& .divider": {
    width: "70px",
    height: "2.5px",
    backgroundColor: "#25826a",
  },

  "& .serviceCard": {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    position: "relative",
    padding: "0 10px 0px 10px",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out",
  },

  "& .serviceCard:hover": {
    transform: "translateY(-5px)", // Slight lift on hover
  },

  // Parent Image Animation (Top to Bottom)
  "& .parentImage": {
    position: "relative",
    marginBottom: "20px",

    "&::before": {
      content: '""',
      position: "absolute",
      top: "-100%",
      left: 0,
      width: "100%",
      height: "98.5%",
      backgroundColor: "#25826a",
      opacity: 0.3,
      transition: "top 0.4s ease-in-out",
      zIndex: 1, // Overlay above image
      clipPath: "inset(0 0 0 0)", // Add clipping to constrain animation
    },

    "& img": {
      width: "100%",
      borderRadius: "0px",
      objectFit: "cover",
      transition: "transform 0.5s ease-in-out",
    },
  },

  // Side Image Animation (Bottom to Top)
  "& .sideImage": {
    position: "absolute",
    bottom: "-17px",
    right: "20px",
    width: "80px",
    height: "80px",
    borderRadius: "5px 5px 0 0",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)" /* Increased shadow */,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    overflow: "hidden",
    borderBottom: "3px solid #25826a",
    transition: "background-color 0.3s ease-in-out, transform 0.3s ease-in-out", // Add smooth animation

    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "100%",
      backgroundColor: "#25826a",
      transform: "translateY(100%)",
      transition: "transform 0.5s ease-in-out, opacity 0.3s ease-in-out",
      opacity: 0, // Initially hidden
      zIndex: 1,
    },

    "& img": {
      width: "50px",
      height: "50px",
      position: "relative",
      zIndex: 2,
      transition: "transform 0.3s ease-in-out", // Add scale animation
    },
  },

  // Apply Hover Effects
  "& .serviceCard:hover .parentImage::before": {
    top: "0", // Moves overlay from top to bottom
  },

  "& .serviceCard:hover .parentImage img": {
    // transform: 'scale(1)', // Slight zoom
  },

  "& .serviceCard:hover .sideImage::before": {
    transform: "translateY(0)", // Moves overlay from bottom to top
    opacity: 0.9,
  },

  "& .serviceCard:hover .sideImage img": {
    transform: "scale(1.04)", // Slight zoom
    filter: "brightness(0) invert(1)",
  },

  "& .cardContent": {
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "16px",
  },
  "& .btnHandler": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  "& .serviceCard:hover .cardContent h4": {
    color: "#25826a", // Change the title color on card hover
    transition: "color 0.3s ease-in-out", // Smooth color transition
  },
  "& .serviceCard:hover .btnHandler button": {
    backgroundColor: "#23222a", // Button hover effect
    color: "#ffffff",
    transform: "scale(1.05)", // Slight zoom
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Add shadow
    transition: "all 0.3s ease-in-out",
  },
}));

export default function BestServices() {
  const {t} = useTranslation();
  const currentLang = i18n.language
  const servicesData = [
    {
      id: 1,
      title: t("investment_services.card1.title"),
      description:
      t("investment_services.card1.des"),
      image: "images/service1.png",
      icon: "images/Landing/Splash2.png",
      alt: "Family Insurance",
    },
    {
      id: 2,
      title: t("investment_services.card2.title"),
      description:
      t("investment_services.card2.des"),
      image: "images/service2.png",
      icon: "images/Landing/Splash2.png",
      alt: "Business Insurance",
    },
    {
      id: 3,
      title: t("investment_services.card3.title"),
      description: t("investment_services.card3.des"),
      image: "images/service3.png",
      icon: "images/Landing/Splash2.png",
      alt: "Trusted Company",
    },
  ];
  return (
    <Container maxWidth={"lg"} sx={{ mt: 10 }}>
      <MainComponent>
        {/* Section Header */}
        <ScrollAnimation animateIn="slideInLeft">
          <Box className="mainTitle">
            <Box className="headerSection">
              <Box className="divider" />
              <Typography variant="h5" className="subtitle">
              {t("investment_services.title")}
              </Typography>
            </Box>
            <Typography variant="h2" color="#23222a">
            {t("investment_services.desc")}
            </Typography>
          </Box>
        </ScrollAnimation>

        {/* Cards */}
        <ScrollAnimation animateIn="slideInRight">
          <Box className="cardBox">
            <Grid container spacing={3} justifyContent="center">
              {servicesData.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <Box className="serviceCard">
                    <Box className="parentImage">
                      <img src={service.image} alt={service.alt} />
                      <Box className="sideImage">
                        <img src={service.icon} alt={`${service.alt} icon`} />
                      </Box>
                    </Box>
                    <Box className="cardContent">
                      <Typography variant="h4" color="#23222a">
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="#505050"
                        style={{ maxWidth: "300px" }}
                        align={currentLang ==="en" ? "left" : "right"}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                    {/* <Box className="btnHandler">
                      <Button variant="contained" color="primary">
                        Read More
                      </Button>
                    </Box> */}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ScrollAnimation>
      </MainComponent>
    </Container>
  );
}
