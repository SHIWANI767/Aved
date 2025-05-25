import React from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { FaLowVision } from "react-icons/fa";
import { GrOptimize } from "react-icons/gr";

const VisionMissionSection = () => {
  const theme = useTheme();

  return (
    <Box className="main-sectionGap">
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          color="primary"
          mb={4}
          sx={{ textTransform: "uppercase" }}
        >
          Our Vision & Mission
        </Typography>

        <Grid container spacing={4} alignItems="center">
          {/* Vision */}
          <Grid item xs={12} md={6}>
            
            <Box className="missionCard">
            <Box className ="visionIcon displayCenter" mb={3}><FaLowVision /></Box>
              <Typography
                variant="h3"
              
                sx={{ textTransform: "uppercase", mb: 2 }}
              >
                Our Vision
              </Typography>
              <Typography variant="h6" color="secondary" lineHeight="30px">
                We aim to establish ourselves as one of the leading companies in
                the real estate development sector in the Middle East and North
                Africa (MENA) region.
              </Typography>
            </Box>
          </Grid>
       
          {/* Image with hover animation */}
          <Grid item xs={12} md={6}>
          <Box className="missionCard">
          <Box className ="visionIcon displayCenter" mb={3}><GrOptimize /></Box>
              <Typography
                variant="h3"
                
                sx={{ textTransform: "uppercase", mb: 2 }}
              >
                Our Mission
              </Typography>
              <Typography variant="h6" lineHeight="30px">
                We aim to establish ourselves as one of the leading companies in
                the real estate development sector in the Middle East and North
                Africa (MENA) region.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default VisionMissionSection;
