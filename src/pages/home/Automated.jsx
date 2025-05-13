import React from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";

export default function Automated() {
  return (
    <Box className="automatedSection">
      <img
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        src="images/curveleft.png"
        alt="image"
        className="curveLeft"
      />
      <img
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        src="images/curveright.png"
        alt="image"
        className="curveright"
      />
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} sm={6} lg={6}>
            <Box>
              <img
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                src="images/automated.png"
                alt="image"
                className="bannerrightimg"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sm={6} lg={6}>
            <Box mt={2} mb={2}>
              <Typography variant="h2">
                Created Automated Trading Rules, 24x7
              </Typography>
            </Box>
            <Typography variant="body2">
              In publishing and graphic design, form of a document ora typeface
              without relying on meaningful content.
            </Typography>
            <Box mt={2}>
              <Button variant="contained" color="primary">
                Start for free
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
