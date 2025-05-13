import { Box, Container, Typography, Button, Grid } from "@mui/material";
import React from "react";

export default function Earnings({ earningProfile }) {
  const checkdata = earningProfile
    ? Math.floor(earningProfile?.totalProfit).toString()
    : "245";
  const profitArray = [...checkdata.split("")];

  return (
    <Box pb={0} style={{ position: "relative" }}>
      <img
        src="/images/lifetime_banner.svg"
        alt="Lifetime"
        className="lifetimeBanner"
      />
      <Box className="marginTopSection">
        <Container maxWidth="md">
          <Box className="featuresBox" align="center">
            <Typography variant="h2" color="primary" className="headerText">
              Lifetime Licence Availability
            </Typography>

            <Typography
              variant="h4"
              color="primary"
              className="headerText1"
              mt={1}
            >
              Secure your Lifetime License to Arbii.bot before it’s gone!"
            </Typography>
          </Box>
        </Container>
        <Container maxWidth="md">
          <Box className="lincenseContainer">
            <Grid container spacing={{ xs: 2, md: 4 }}>
              {profitArray.map((item, i) => (
                <Grid item xs={4} key={i} className="lincenseContainer1">
                  <Typography
                    variant="h3"
                    color="secondary"
                    // style={{ background: "#0e0719" }}
                    style={{
                      background: "#0e0719",
                      color: i === 0 ? "#00FF9B" : "#fff", // Change color of the first item
                    }}
                  >
                    {item}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box className="displaySpacebetween lifeeBox" mt={4}>
            <Button
              variant="contained"
              color="primary"
              style={{ textTransform: "uppercase" }}
              onClick={() => window.open("https://t.me/arbitrage_mobi_bot")}
            >
              {/* GET LITFETIME ACCESS ↗ */}
              Get Your Lifetime License Now ↗
            </Button>
            <Typography variant="h4" color="primary">
              Remaining Out OF 5/300
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
