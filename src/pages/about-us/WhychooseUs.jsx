// pages/index.js
import { Box, Container, Grid, Typography } from "@mui/material";

import ScrollAnimation from "react-animate-on-scroll";
import Image from "next/image";
import ConstructionIcon from "@mui/icons-material/Construction";
import HomeIcon from "@mui/icons-material/Home";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import PaymentIcon from "@mui/icons-material/Payment";
import BuildIcon from "@mui/icons-material/Build";

export default function WhychooseUs() {
  const features = [
    {
      label: "Ensuring Quality in Construction",
      icon: "construction",
      descrionption:
        "At AVED, quality is not simply a promise; it is a guarantee.",
    },
    {
      label: "A New Take on Luxury Living",
      icon: "home",
      descrionption:
        " AVED's commitment to luxury goes beyond visual aesthetics; it involves redefining the modern lifestyle.",
    },
    {
      label: "Creative Expertise that Exceeds Limits ",
      icon: "creditCard",
      descrionption:
        "AVED plays a pivotal role in fostering creativity in the field of real estate development.",
    },
    {
      label: "Innovative Designs",
      icon: "event",
      descrionption:
        "AVED is synonymous with luxury innovation, and its dedication is evident in each of its projects, where cutting-edge technology seamlessly meets luxurious designs.",
    },
    {
      label: "Ensuring Quality in Construction",
      icon: "transfer",
      descrionption:
        "At AVED, quality is not simply a promise; it is a guarantee.",
    },
    {
      label: "A New Take on Luxury Living",
      icon: "move",
      descrionption:
        " AVED's commitment to luxury goes beyond visual aesthetics; it involves redefining the modern lifestyle.",
    },
  ];
  const iconMap = {
    construction: <ConstructionIcon />,
    home: <HomeIcon />,
    creditCard: <CreditCardIcon />,
    event: <EventIcon />,
    transfer: <SwapHorizIcon />,
    move: <MoveToInboxIcon />,
  };

  return (
    <Container className="main-sectionGap">
    <Box
      sx={{ flexGrow: 1,  backgroundColor: "#fff" }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Side */}
        <Grid item xs={12} md={7}>
          <ScrollAnimation animateIn="fadeInLeft">
            <Typography variant="h2" mb={3}>
              Why Choose Aved?
            </Typography>
          </ScrollAnimation>
          {/* <ScrollAnimation animateIn="fadeInUp">
            <Typography
              variant="body2"
              color="#232323"
              style={{ fontWeight: "300", fontSize: "18px" }}
              mt={3}
              sx={{ mb: 3 }}
            >
              Aved One allows homeowners and tenants to fully manage their
              property from their phone anytime anywhere.
            </Typography>
          </ScrollAnimation> */}

          <Grid container spacing={1} mb={4}>
            {features.map((feature, index) => (
              <Grid item xs={6} sm={6} key={index}>
                <Box display="flex" alignItems="flex-start" sx={{ mb: 1 }}>
                  <Box className="digitalIcon1 displayCenter" sx={{ mr: 1 }}>
                    {iconMap[feature.icon]}
                  </Box>
                  <Box style={{marginTop:"-10px"}}> 
                    <Typography
                      variant="h6"
                      color="#5c4d44"
                      sx={{ fontWeight: 400, fontSize: "18px" }}
                    >
                      {feature.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#232323"
                      sx={{ fontWeight: 300, fontSize: "18px" }}
                    >
                      {feature.descrionption}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Side: Image */}
        <Grid item xs={12} md={5} textAlign="center">
          <ScrollAnimation animateIn="fadeInRight">
            <img
              src="/images/Team/WHYchooseUS.jpg"
              alt="Digital"
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </ScrollAnimation>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
}
