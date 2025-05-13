import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

export default function Slides({ img, heading, subHeading }) {
  const theme = useTheme();

  const style = {
    outerBox: {},
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: (theme) => theme.palette.custom.main,
        backgroundImage: "url(/images/Login/backgroundimg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid
        container
        className="displayCenter"
        flexDirection={"column"}
        height={"100vh"}
        padding={"0% 5% 0% 5%"}
      >
        <Grid item>
          <img src={img} alt="" />
        </Grid>
        <Grid item mt={5} textAlign={"center"}>
          <Typography variant="title" color={"white"}>
            {heading}
          </Typography>
          <br />
          <br />
          <Typography variant="body1" color={"white"}>
            {subHeading}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
