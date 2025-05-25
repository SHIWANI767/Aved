"use client";
import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";
import Marquee from "react-fast-marquee";
import ScrollAnimation from "react-animate-on-scroll";
const MarquemainBox = styled("Box")(({ theme }) => ({
  position: "relative",
  zIndex: "999",
}));

const clientData = [
  {
    image: "/images/Client/part_1.png",
  },
  {
    image: "/images/Client/part_2.png",
  },
  {
    image: "/images/Client/part_3.png",
  },
  {
    image: "/images/Client/part_4.png",
  },
  {
    image: "/images/Client/part_5.jpg",
  },
  {
    image: "/images/Client/part_6.png",
  },
  {
    image: "/images/Client/part_2.png",
  },
  {
    image: "/images/Client/part_3.png",
  },
  {
    image: "/images/Client/part_4.png",
  },
  {
    image: "/images/Client/part_1.png",
  },
  {
    image: "/images/Client/part_2.png",
  },
];
export default function Client() {
  return (
    <MarquemainBox>
      <Box className="main-sectionGap" 
      style={{background:"#F8F9FB", padding:"50px 0"}}>
        <Container >
        <Box align="center" className="subSection1">
          <ScrollAnimation animateIn="zoomIn">
            <Typography
              variant="h2"
              style={{ textTransform: "uppercase" }}
             
            >
              Our Partners
            </Typography>
          </ScrollAnimation>
        </Box>
        <Box className="marquenbanner">
          <Marquee direction="left">
            <Box
              className="displaySpacebetween"
              style={{ gap: "100px" }}
              mt={4}
            >
              {clientData.map((data, i) => (
                <img
                  onDragStart={(e) => e.preventDefault()}
                  onContextMenu={(e) => e.preventDefault()}
                  src={data.image}
                  alt="images"
                  className="clienticon"
                />
              ))}
            </Box>
          </Marquee>
        </Box>
      </Container>
      </Box>
      
    </MarquemainBox>
  );
}
