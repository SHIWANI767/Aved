import { Container, Grid, Typography, Paper, Box } from "@mui/material";
import React, { useState } from "react";
import styled from "@emotion/styled";
import Rating from "@mui/material/Rating";
import Marquee from "react-fast-marquee";
const CompanyCardPage = styled("Box")(({ theme }) => ({
  position: "relative",

  "& img": {
    width: "auto !important",
  },
  "& .seondondcardBox": {
    marginTop: "-44px",
  },

  "& .imageBox": {
    width: "auto !important",
  },
  "& .descriptionbox": {
    marginBottom: "40px",
  },
  "& .contentBoxMain": {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px", // Adds consistent spacing between cards
    justifyContent: "center", // Centers the cards horizontally
  },
}));

const cardData = [
  {
    imge: "/images/customer_rating.png",
    title: "Innovation",
    description:
      "Teamollo delivered the site with inthe timeline as they requested. Inthe end, the client found a 50% increase in traffic with in days since its launch. They also had an impressive ability to use technologies that the company hasn`t used, which have also proved to be easy to use and reliable.",
  },
  {
    imge: "/images/customer_rating.png",
    title: "Commitment",
    description:
      "Teamollo delivered the site with inthe timeline as they requested. Inthe end, the client found a 50% increase in traffic with in days since its launch. ",
  },
  {
    imge: "/images/customer_rating.png",
    title: "Teamwork",
    description:
      "Teamollo delivered the site with inthe timeline as they requested. Inthe end, the client found a 50% increase in traffic with in days since its launch. They also had an impressive ability to use technologies that the company hasn`t used, which have also proved to be easy to use and reliable.",
  },
  {
    imge: "/images/customer_rating.png",
    title: "Innovation",
    description:
      "Teamollo delivered the site with inthe timeline as they requested. Inthe end, the client found a 50% increase in traffic with in days since its launch. They also had an impressive ability to use technologies that the company hasn`t used, which have also proved to be easy to use and reliable.",
  },
  {
    imge: "/images/customer_rating.png",
    title: "Commitment",
    description:
      "Teamollo delivered the site with inthe timeline as they requested. Inthe end, the client found a 50% increase in traffic with in days since its launch. They also had an impressive ability to use technologies that the company hasn`t used, which have also proved to be easy to use and reliable.Teamollo delivered the site with inthe timeline as they requested. Inthe end, the client found a 50% increase in traffic with in days since its launch. ",
  },
  {
    imge: "/images/customer_rating.png",
    title: "Teamwork",
    description:
      "Teamollo delivered the site with inthe timeline as they requested. Inthe end, the client found a 50% increase in traffic with in days since its launch. They also had an impressive ability to use technologies that the company hasn`t used, which have also proved to be easy to use and reliable.",
  },
];

export default function CompanyCard() {
  const [value, setValue] = useState(5);
  return (
    <CompanyCardPage>
      <Box align="center" className="descriptionbox ">
        <Typography variant="h2" color="primary" mt={1}>
          Our Customer review & Rating
        </Typography>
        <Typography
          variant="body2"
          color="secondary"
          mb={2}
          style={{ maxWidth: "630px" }}
        >
          Lorem ipsum dolor sit amet consectetur. Egestas egestas aliquam
          tincidunt hendrerit malesuada. Quisque vel neque nunc placerat.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="flex-start">
        {/* <Marquee direction="left"> */}
        {cardData.map((card, index) => (
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
            key={index}
            // mt={index * 3}
            align="left"
          >
            <Paper elevation={1}>
              <Box>
                <Typography variant="body2" color="secondary" mb={7}>
                  {card.description}
                </Typography>

                <Box className="displayStart">
                  <img src={card.imge} alt="Card" width="48px" height="48px" />
                  <Box ml={2}>
                    <Typography variant="h5" color="primary" mb={1}>
                      {card.title}
                    </Typography>
                    <Rating
                      name="controlled-rating"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          // </Marquee>
        ))}
        {/* </Marquee> */}
      </Grid>

      {/* 
      <Grid container spacing={3} className="seondondcardBox">
        {cardData1.map((card, index) => (
          <Grid
            item
            lg={4}
            sm={6}
            xs={12}
            key={index}
            mt={index * 3}
            align="left"
          >
            <Paper elevation={1}>
              <Box>
                <img
                  src={card.imge}
                  alt="Card"
                  width="48px"
                  height="48px"
                  className="displayStart imageBox"
                />
                <Typography variant="h4" color="primary" mt={4}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="secondary" mt={2} mb={7}>
                  {card.description}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid> */}
    </CompanyCardPage>
  );
}
