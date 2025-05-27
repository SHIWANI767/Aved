"use client";
import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const ProjectSlider = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "rgb(92, 77, 68)",
        marginTop: "-100px",
         "@media(max-width:768px)": {
          marginTop: "-34px",
        },
        "@media(max-width:767px)": {
          marginTop: "-4px",
        },
      }}
    >
      <Container>
         <Grid container spacing={0} alignItems="center">
        {/* Left Side - Text */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ px: { xs: 0, paddingTop: "100px", md: 0 } }}
          style={{ paddingTop: "120px" }}
          className="filtermarket"
        >
          <Typography
            variant="h3"
            component="h1"
            color="#fff"
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: "2rem", md: "3.5rem" },
              lineHeight: 1.2,
            }}
          >
            Aved Real Estate <br /> Luxury Marketplace
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              color: "#ffffffad",
              maxWidth: 500,
            }}
          >
            We are recognized for exceeding client expectations and delivering
            great results through dedication, ease of process, and extraordinary
            services to our worldwide clients.
          </Typography>
        </Grid>

        {/* Right Side - Image */}
        <Grid item xs={12} md={6} className="imageright">
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 300, md: 500 },
            }}
            className="rightprojrctImage"
          >
            <Image
              src="/images/Project/slider3.jpg" // Put your actual image in /public
              alt="Hero Image"
              layout="fill"
              objectFit="cover"
              priority
            />
          </Box>
        </Grid>
      </Grid>
      </Container>
     
    </Box>
  );
};

export default ProjectSlider;
