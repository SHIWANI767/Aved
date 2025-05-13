import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  Switch,
  LinearProgress,
  Dialog,
  Divider,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import DirectCard from "./DirectCard";
import LiveTable from "./LiveTable";
import { styled } from "@mui/system";

const LivetableBox = styled(Box)(({ theme }) => ({
  "& .MuiDivider-root": {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
}));
const GreenBox = styled(Box)`
  width: 36px;
  height: 36px;
  background-color: #5cd748;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const RedBox = styled(Box)`
  width: 36px;
  height: 36px;
  background-color: #ff3939;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const directdata = [
  {
    buyPrice: "14192.00",
    currencyImage: "/images/gatelo.png",
    price: "5233.1703 USDT",
    title: "RFUEL",
    buyPriceText: "Buy price:",
    buyPriceValue: " $5276.1045",
    tradingText: "Trading charges:",
    tradingValue: "$5276.1045",
    finalBuyText: "Final buy price:",
    finalBuyValue: "  $5276.10457",
    convertImage: "/images/bitbns.png",
    convertText1: "OXT",
    convertText2: "BCH",
    convertTo: "BitBns",
    sellImage: "/images/gatelo.png",
    exchange: "Gatelo",
    sellNameValue: " $5276.1045",
    sellNameText: "Sell price:",
    cryptoTradingText: "Crypto trading charges:",
    cryptoTradingValue: "  $13.1903(0.25%)",
    cryptoNetText: "Crypto transfer network:",
    cryptoNetValue: "   $5289.2984",
    tradingChargesText: " Trading charges:",
    tradingChargesValue: "$5289.2984",
    finalSellText: "Final sell price:",
    finalSellValue: " $5289.2984",
  },
];
function LiveTracking({ open, setOpen }) {
  const [checkout, setCheckout] = useState(false);
  const [age, setAge] = useState(1);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <LivetableBox>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xxl"
          fullWidth
          className="paperClass"
        >
          <Box
            className="livetrackBox"
            sx={{
              position: "relative",
              [(theme) => theme.breakpoints.down("xs")]: {
                padding: "10px",
              },
              "& .MuiSelect-selectMenu": {
                fontSize: "14px",
              },
              "& .greenprogressbar": {
                position: "relative",
              },
            }}
          >
            <IconButton
              className="cancelBtn"
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                top: "-18px",
                right: "-18px",
                width: "60px",
                height: "60px",
                "& svg": {
                  fontWeight: "700",
                  fontSize: "30px",
                },
              }}
            >
              <IoClose />
            </IconButton>
            <Grid container spacing={1} alignItems="center">
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box>
                  <Typography
                    variant="h2"
                    color="primary"
                    style={{ fontSize: "35px" }}
                  >
                    Live tracking
                  </Typography>
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box display="flex" alignItems="center">
                  <Box className="displayStart">
                    <Typography variant="body1" color="primary">
                      Asks
                    </Typography>
                    <RedBox className="redBox" ml={2}></RedBox>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={50}
                    sx={{
                      height: 10,
                      width: "100%",
                      borderRadius: 5,
                      backgroundColor: "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      colorPrimary: {
                        width: "50%",
                        backgroundColor: "transparent",
                        border: "1px solid gray",
                      },
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        backgroundColor: "#FF3939",
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box display="flex" alignItems="center">
                  <Box className="displayStart">
                    <Typography variant="body1" color="primary">
                      Bids
                    </Typography>
                    <GreenBox className="greenBox" ml={2}></GreenBox>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={50}
                    sx={{
                      height: 10,
                      width: "100%",
                      borderRadius: 5,
                      backgroundColor: "transparent",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      colorPrimary: {
                        width: "50%",
                        backgroundColor: "transparent",
                        border: "1px solid gray",
                      },
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        backgroundColor: "#5CD748",
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box mt={4} mb={3}>
              <Divider />
            </Box>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Box className="displayStart" mb={3}>
                  <Switch
                    onChange={handleChange}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <Typography variant="body2" color="primary">
                    With Volume
                  </Typography>
                </Box>
                {directdata.map((data, index) => (
                  <Box align="center" key={index}>
                    <DirectCard data={data} />
                  </Box>
                ))}
              </Grid>
              <Grid item lg={8} md={8} sm={6} xs={12}>
                <Box mb={3}>
                  <Typography variant="h5" color="primary">
                    Order Book
                  </Typography>
                  <LiveTable />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </LivetableBox>
    </>
  );
}

export default LiveTracking;
