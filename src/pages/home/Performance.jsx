import React, { useState } from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";

import { styled } from "@mui/system";
import PerformaceSelect from "./PerformaceSelect";

import DiscreteSliderSteps from "./DiscreteSliderSteps";

import Matrics from "./Matrics";

const PerformanceComponent = styled("Box")(({ theme }) => ({
  position: "relative",

  "& .featuresBox": {
    marginBottom: "70px",
  },
}));

export default function Performance() {
  return (
    <>
      <PerformanceComponent>
        <Container className="marginTopSection">
          <Box className="featuresBox">
            <Typography variant="h2" color="primary" className="headerText">
              AI Performance on Historical Data
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

          <Grid container spacing={{ xs: 2, md: 6 }}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography variant="body2" className="secondaryText" mb={2.4}>
                CURRENCY
              </Typography>
              <PerformaceSelect />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Typography variant="body2" className="secondaryText" mb={2.4}>
                STRATEGY
              </Typography>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Grid container spacing={{ xs: 2, md: 6 }}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography variant="body2" className="secondaryText" mb={2.4}>
                  LENGTH OF INVETMENT, MONTH
                </Typography>
                <DiscreteSliderSteps />
                <Box className="displaySpacebetween">
                  {" "}
                  <Typography
                    variant="body2"
                    className="secondaryText"
                    mb={2.4}
                  >
                    500
                  </Typography>{" "}
                  <Typography
                    variant="body2"
                    color="primary"
                    className="secondaryText"
                    mb={2.4}
                  >
                    750
                  </Typography>{" "}
                  <Typography
                    variant="body2"
                    className="secondaryText"
                    mb={2.4}
                  >
                    1000
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography variant="body2" className="secondaryText" mb={2.4}>
                  INITIAL AMOUNT, $
                </Typography>
                <DiscreteSliderSteps />
                <Box className="displaySpacebetween">
                  {" "}
                  <Typography
                    variant="body2"
                    className="secondaryText"
                    mb={2.4}
                  >
                    500
                  </Typography>{" "}
                  <Typography
                    variant="body2"
                    color="primary"
                    className="secondaryText"
                    mb={2.4}
                  >
                    750
                  </Typography>{" "}
                  <Typography
                    variant="body2"
                    className="secondaryText"
                    mb={2.4}
                  >
                    1000
                  </Typography>
                </Box>
              </Grid>
              {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography variant="body2" className="secondaryText" mb={2.4}>
                  INITIAL AMOUNT, $
                </Typography>

              </Grid> */}
            </Grid>
            <Box className="generatedBox ">
              <Box className="gradienborderBox">
                <Paper
                  elevation={2}
                  style={{ background: "#1D112F", padding: "20px" }}
                >
                  <Box
                    className="displaySpacebetween"
                    style={{ flexWrap: "wrap" }}
                  >
                    <Typography
                      variant="h2"
                      color="#fff"
                      className="geneatedText"
                    >
                      Total Volume Generated
                    </Typography>
                    <Box
                      className="displayStart"
                      style={{ gap: "10px", flexWrap: "wrap" }}
                    >
                      <img
                        src="/images/green_stra.svg"
                        alt="Coin"
                        className="staButton"
                      />
                      <img
                        src="/images/yellow_stra.svg"
                        alt="Coin"
                        className="staButton"
                      />
                      <img
                        src="/images/dark_stra.svg"
                        alt="Coin"
                        className="staButton"
                      />
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>
            <Matrics />
          </Box>
        </Container>
      </PerformanceComponent>
    </>
  );
}
