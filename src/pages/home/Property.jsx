// pages/index.js
import {
  Box,
  Grid,
  Typography,
 
  Container,
} from "@mui/material";

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

export default function Property() {
  const features = [
    { label: "Construction updates", icon: "construction" },
    { label: "Ownership updates", icon: "home" },
    { label: "Access card requests", icon: "creditCard" },
    { label: "Amenities booking", icon: "event" },
    { label: "Property-related transfers", icon: "transfer" },
    { label: "Move In/Out requests", icon: "move" },
    { label: "Online payment", icon: "payment" },
    { label: "ECM & Home services", icon: "build" },
  ];
  const iconMap = {
    construction: <ConstructionIcon />,
    home: <HomeIcon />,
    creditCard: <CreditCardIcon />,
    event: <EventIcon />,
    transfer: <SwapHorizIcon />,
    move: <MoveToInboxIcon />,
    payment: <PaymentIcon />,
    build: <BuildIcon />,
  };

  return (

    <Box
    className="main-sectionGap"
      sx={{ flexGrow: 1,  backgroundColor: "#fff" }}
    >
      <Container>
      <Grid container spacing={4} alignItems="center">
        {/* Left Side */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body2"
            className="digitalText"
            color="#9D9D9C"
            gutterBottom
            fontWeight="700"
            fontSize="12px"
          >
            A DIGITAL EXPERIENCE
          </Typography>
          <ScrollAnimation animateIn="fadeInLeft">
            <Typography variant="h2" mt={1}>
              THE ONE APP YOU NEED FOR
              <br />
              ALL YOUR PROPERTY NEEDS
            </Typography>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp">
            <Typography
              variant="body2"
              color="#232323"
              style={{ fontWeight: "300", fontSize: "18px" }}
              mt={3}
              sx={{ mb: 3 }}
            >
              Emaar One allows homeowners and tenants to fully manage their
              property from their phone anytime anywhere.
            </Typography>
          </ScrollAnimation>

          <Grid container spacing={1} mb={4}>
            {features.map((feature, index) => (
              <Grid item xs={6} key={index}>
                <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                  <Box className="digitalIcon displayCenter" sx={{ mr: 1 }}>
                    {iconMap[feature.icon]}
                  </Box>
                  <Typography
                    variant="body2"
                    color="#232323"
                    className="digitalText1"
                    sx={{ fontWeight: 300, fontSize: "18px" }}
                  >
                    {feature.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <hr />

          <Box className="displayStart" gap="20px" mt={4}>
            <Box className="downloadaved displayCenter">
              <Typography variant="h2" fontSize="36px" lineHeight="38px">
                Aved <br />
                <span style={{ fontWeight: "300" }}>One</span>
              </Typography>
            </Box>
            <Typography variant="h2" fontSize="36px" lineHeight="38px">
              Download <br /> Aved One app
            </Typography>
          </Box>
          <Box className="displayStart" gap="10px" mt={4}>
            <img
              src="/images/google-play.png"
              alt="Google Play"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/",
                  "_blank"
                )
              }
            />

            <img
              src="/images/apple.png"
              alt="Apple App Store"
              style={{ cursor: "pointer", marginLeft: "12px" }}
              onClick={() =>
                window.open(
                  "https://www.apple.com/",
                  "_blank"
                )
              }
            />
          </Box>
        </Grid>

        {/* Right Side: Image */}
        <Grid item xs={12} md={6} textAlign="center">
          <ScrollAnimation animateIn="fadeInRight">
            <img
              src="/images/digital-experiance.png"
              alt="Digital"
              width="100%"
            />
          </ScrollAnimation>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
}
