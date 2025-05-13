import AppContext from "@/context/AppContext";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";

const PopularMainBox = styled("Box")(({ theme }) => ({
  "& .bgFrBox": {
    position: "relative",
    borderRadius: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      maxWidth: "100%",
      height: "auto",
    },
    "& .bgImg": {
      position: "absolute",
      height: "100%",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    "& p": {
      fontSize: "18px",
      fontWeight: "500",
    },
    "& .iconBox": {
      position: "relative",
      display: "block",
      right: "30px",
      height: "505px",
      width: "auto",
      marginTop: "40px",
      [theme.breakpoints.down("lg")]: { height: "405px", width: "auto" },
      [theme.breakpoints.down("md")]: {
        height: "285px",
        width: "auto",
        right: "10px",
      },
      [theme.breakpoints.down("sm")]: {
        right: "-30px",
        bottom: "0px",
        maxWidth: "none",
        height: "225px",
        width: "auto",
      },
    },
    "& .contentBoxMain": {
      position: "relative",
    },
    "& .contentBox": {
      position: "relative",
      padding: "50px 0 163px",
      [theme.breakpoints.down("sm")]: {
        padding: "20px 0 3px",
        marginLeft: "30px",
        marginRight: "30px",
      },
    },
  },
}));

export default function Who_we_Are() {
  const auth = useContext(AppContext);
  const router = useRouter();
  return (
    <PopularMainBox>
      <Container maxWidth="lg">
        <Box className="bgFrBox">
          <Image
            src="/images/subtract_1.png"
            alt=""
            className="bgImg"
            width="1800"
            height="984"
            quality={70}
            priority={true}
          />
          <Grid
            container
            spacing={0}
            className="contentBoxMain"
            alignItems="flex-start"
          >
            <Grid item xs={12} md={6} sm={6} lg={6}>
              <Box align="left" ml={5} className="contentBox">
                <Typography variant="h2" color="#0d0618" className="headerText">
                  Who am i
                </Typography>

                <Typography
                  variant="h4"
                  color="#0D0618"
                  mt={1}
                  className="headerText1"
                >
                  We Are the Arbitrage Technology Experts
                </Typography>
                <Box mt={2}>
                  <Typography
                    variant="body2"
                    color="#35284A"
                    className="text-capital"
                    mb={3}
                  >
                    Arbii.bot is a powerhouse in financial technology,
                    laser-focused on delivering top-tier arbitrage trading
                    solutions. Our state-of-the-art bots allow traders to seize
                    price inefficiencies across centralized and decentralized
                    exchanges with lightning speed. Here’s the kicker: we don’t
                    manage or hold your funds—our bots execute trades on your
                    behalf, so you remain in complete control of your assets.
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<IoIosArrowForward />}
                  >
                    Learn more
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={1}
              sm={1}
              lg={1}
              className="whoGridBox"
            ></Grid>
            <Grid item xs={12} md={5} sm={5} lg={5}>
              <Box>
                <Image
                  src="/images/arbii_bot2.png"
                  className="iconBox"
                  width="600"
                  height="550"
                  quality={95}
                  priority={true}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PopularMainBox>
  );
}
