import React, { useState } from "react";
import { Container, Typography, Box, Grid } from "@mui/material";

import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const FeaturesComponent = styled("Box")(({ theme }) => ({
  position: "relative",
  "& p": {
    // maxWidth: "167px",
  },
  "& .featuresBox": {
    marginBottom: "70px",
  },
  "& .servicessBox": {
    position: "relative",
    "&::after": {
      content: '""', // Required for ::after pseudo-element
      position: "absolute",
      top: 0,
      width: "2px",
      height: "100%",
      background: "#211e3e59",
    },

  },
}));



export default function Features() {
  
  const {t} = useTranslation()
  const subheadings = [
  "Snap up arbitrage trades across exchanges with zero latency and pinpoint accuracy.",
  "Built-in features shield you from slippage and high transaction fees, so every trade is a winner.",
  "Effortlessly monitor bot performance and tweak strategies through our intuitive dashboard.",
  "Tailor your trading game plan to match your goals and market vibes.",
  "Manage high volumes across exchanges without missing a beat.",
  "Each feature should have a sleek, engaging icon that represents automation, performance, risk management, and ease of use.",

];

const headings = [
  "Instant Arbitrage Execution",
  "Risk Management",
  "User-Friendly Interface",
  "Customizable Strategies",
  "Scalability",
  "Visuals",
];
const icon = [
  "/images/Features/features_1.png",
  "/images/Features/features_2.svg",
  "/images/Features/features_3.svg",
  "/images/Features/features_4.svg",
  "/images/Features/features_5.svg",
  "/images/Features/features_6.svg",
];
  return (
    <>
      <FeaturesComponent>
        <Container className="marginTopSection">
          <Box className="featuresBox">
            <Typography variant="h2" color="primary" className="headerText">
              Features
            </Typography>

            <Typography
              variant="h4"
              color="primary"
              className="headerText1"
              mt={1}
            >
              Seamless Automation and User Control
            </Typography>
          </Box>

          <img
            src="/images/Features/border_top.svg"
            alt="Features"
            className="featurestop"
          />
          <Grid container spacing={0}>
            {subheadings.map((text, index) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                key={index}
                // className="gapservicesBox"
                className="servicessBox "
              >
                <Box className="dott"></Box>
                <Box
                  style={{
                    padding: "20px",
                  }}
                >
                  <img
                    src={icon[index]}
                    alt="Icon"
                    width="70px"
                    height="70px"
                  />
                  <Typography
                    variant="h4"
                    color="primary"
                    mt={2}
                    dangerouslySetInnerHTML={{ __html: headings[index] }}
                  />
                  <Typography variant="body2" color="secondary" mt={0.4} mb={2}>
                    {text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </FeaturesComponent>
    </>
  );
}
