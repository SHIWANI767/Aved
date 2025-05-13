"use client";
import { Box, Container, Grid, styled, Typography } from "@mui/material";
import React from "react";
const ProjextBox = styled("Box")(({ theme }) => ({
  "& img": {
    width: "128px",
    height: "128px",
    [theme.breakpoints.down("sm")]: {
      width: "60px",
      height: "60px",
    },
  },
}));

const clientData = [
  {
    image: "/images/Project/project_1.svg",
    number: "15k+",
    name: "Active user",
  },
  {
    image: "/images/Project/project_2.svg",
    number: "15k+",
    name: "Active user",
  },
  {
    image: "/images/Project/project_3.svg",
    number: "15k+",
    name: "Active user",
  },
];
export default function Projext() {
  return (
    <ProjextBox>
      <Container className="marginTopSection">
        <Grid container spacing={2}>
          {clientData.map((data, i) => (
            <>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <Box className="displayStart" gap="0px">
                  <img src={data.image} alt="images" />
                  <Box style={{ marginLeft: "-10px" }}>
                    <Typography variant="h2" color="primary">
                      {data.number}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      {data.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </ProjextBox>
  );
}
