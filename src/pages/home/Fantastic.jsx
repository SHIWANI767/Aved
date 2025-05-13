import { Container, Grid, Typography, Button, Box } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import ScrollAnimation from "react-animate-on-scroll";
import Image from "next/image";
const FantasticPage = styled("Box")(({ theme }) => ({
  position: "relative",
  "& h1": {
    maxWidth: "700px",
  },
  "& p": {
    maxWidth: "550px",
  },
  "& img": {
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      maxWidth: "100%",
      height: "auto",
    },
  },
}));

export default function Fantastic() {
  return (
    <FantasticPage>
      <Container maxWidth="lg" className="marginTopSection">
        <Grid container spacing={2} alignItems="center">
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ScrollAnimation animateIn="slideInLeft">
              <Typography variant="h6" color="primary" mt={1}>
                Than play the fantastic game
              </Typography>
            </ScrollAnimation>
            <ScrollAnimation animateIn="slideInUp">
              <Typography variant="body2" color="secondary" mb={2} mt={2}>
                Qoterra provides advanced features that enable business to get
                all the benefits of chat management
              </Typography>
            </ScrollAnimation>
            <Button variant="contained" color="primary">
              Get Involved
            </Button>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <ScrollAnimation animateIn="slideInRight">
              <Box
                className="displayStart"
                style={{ alignItems: "flex-start" }}
              >
                <Image
                  src="/images/fantistic.png"
                  alt="Banner"
                  width="682"
                  height="485"
                  quality={90}
                  priority={true}
                  className="BannerImage1"
                />
              </Box>
            </ScrollAnimation>
          </Grid>
        </Grid>
      </Container>
    </FantasticPage>
  );
}
