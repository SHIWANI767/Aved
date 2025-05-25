import { Container, Grid, Typography, Button, Box } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import ScrollAnimation from "react-animate-on-scroll";

const FantasticPage = styled("Box")(({ theme }) => ({
  position: "relative",
  "& h2": {
    textTransform: "uppercase",
    lineHeight: "70px",
    fontWeight: "600",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "35px",
    },
  },
  "& p": {
    // maxWidth: "550px",
  },
  "& img": {
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      maxWidth: "100%",
      height: "auto",
    },
  },
}));

export default function Description() {
  return (
    <FantasticPage>
      <Container maxWidth="lg" className="marginTopSection">
        <Grid container spacing={2} alignItems="center">
          <Grid item lg={5} md={6} sm={12} xs={12}>
            <ScrollAnimation animateIn="slideInLeft">
              <Typography
                variant="h2"
                color="#000"
                style={{ textTransform: "uppercase" }}
              >
                Shaping the world of things to come
              </Typography>
            </ScrollAnimation>
          </Grid>
          <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ScrollAnimation animateIn="slideInRight">
              <Typography variant="h3" color="#000" mb={2} mt={2}>
                We’d love to share more with you, please complete this form and
                our dedicated team will get back to you shortly.
              </Typography>

              <Typography variant="body2" color="secondary" mb={2} mt={2}>
                In markets from renewable energy, sports and entertainment, to
                data centers and healthcare, we work to ensure the built
                environment leaves a lasting positive impact. Together, we
                strive to make your project better than you imagined possible.
              </Typography>
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Container>
    </FantasticPage>
  );
}
