import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import LiveTracking from "./LiveTracking";
import { Box, Divider, Grid } from "@mui/material";

const DirectCardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  background: "rgba(255, 255, 255, 0.03)",
  "& h6": {
    fontSize: "16px",
    color: "#21C763",
  },
  "& .graytext": {
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "right",
    width: "100%",
  },
  "& .MuiAccordion-root.Mui-expanded": {
    margin: "0px !important",
  },
  "& .MuiAccordionSummary-root": {
    background: "rgba(255, 255, 255, 0.05) !important",
    padding: "0px 6px",
    minHeight: "29px",
    borderRadius: "5px",
    margin: "0px 0 5px",
  },
  "& .MuiSvgIcon-root": {
    color: "#fff",
    fontSize: "17px",
  },
  "& .MuiAccordionSummary-content": {
    margin: "3px 0",
  },
  "& .MuiCollapse-wrapperInner": {
    paddingLeft: "0px",
  },
  "& .MuiAccordion-rounded:last-child": {
    borderRadius: "0px",
  },
  "& .MuiAccordionSummary-content.Mui-expanded ": {
    margin: "3px 0",
  },
  "& .MuiAccordionSummary-root.Mui-expanded ": {
    minHeight: "29px",
  },
  "& .trackbutton": {
    color: "#fff",
  },
  "& .MuiDivider-root": {
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  "& .mainClass": {
    // backgroundColor: "rgba(255, 255, 255, 0.07)",
    // padding: "12px 10px 6px",
    // borderRadius: "10px",
  },
  "& .MuiPaper-root.MuiAccordion-root:before": {
    position: "absolute",
    left: 0,
    top: "-1px",
    right: 0,
    height: "1px",
    content: '""',
    opacity: 1,
    backgroundColor: "transparent",
  },
  "& .arbitrageBox": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: "6px 10px 11px",
    borderRadius: "10px",
  },
}));

const ExpandButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  [`@media (max-width: 599px)`]: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
}));

const DirectCard = ({ value, type, ExecuteButtonType, showPlacedExchange }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <DirectCardPaper elevation={2} style={{ padding: "12px" }}>
      <Box className="mainClass">
        <Box className="displaySpacebetween">
          <Typography variant="h6">Buy</Typography>
          <Typography variant="body2" color="primary">
            {value.buyPrice}&nbsp;&nbsp;
            <span
              style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "10px" }}
            >
              RFUEL
            </span>
          </Typography>
          <img
            onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
            src={value.currencyImage}
            alt=""
            width="100%"
            style={{ maxWidth: "29px", margin: "5px 0" }}
          />
        </Box>
        <Accordion style={{ background: "transparent", boxShadow: "none" }}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">{value.title}</Typography>
            <Box>
              <AccordionSummary
                style={{ background: "transparent", boxShadow: "none" }}
                expandIcon={<ExpandMoreIcon color="fff" />}
              >
                <Typography variant="body1">{value.price}</Typography>
              </AccordionSummary>
              <Typography
                variant="body1"
                style={{ fontSize: "10px", margin: "3px 0px" }}
                color="secondary"
              >
                0.036 USDT (₹2.6797) per RFUEL
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1">Gatelo</Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "10px", marginTop: "5px" }}
                color="secondary"
              >
                USDT
              </Typography>
            </Box>
          </Box>
          <AccordionDetails
            style={{ padding: "0px", boxShadow: "none", display: "block" }}
          >
            <Divider />
            <Box mt={1} mb={1}>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {value.buyPriceText}
                </Typography>
                <Typography variant="body1" className="graytext">
                  {value.buyPriceValue}
                </Typography>
              </div>
              <div
                className="displayCenter"
                style={{ marginTop: "3px", marginBottom: "3px" }}
              >
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {value.tradingText}
                </Typography>
                <Typography variant="body1" className="graytext">
                  {value.tradingValue}
                </Typography>
              </div>
              <div className="displayCenter">
                <Typography
                  variant="body1"
                  color="primary"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  {value.finalBuyText}
                </Typography>
                <Typography variant="body1" className="graytext">
                  {value.finalBuyValue}
                </Typography>
              </div>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* {type === "volume" && (
        <Box className="mainClass" mt={1}>
          <Box className="displaySpacebetween">
            <Typography variant="h6" style={{ color: "#00C2FF" }}>
              Convert
            </Typography>
            <Typography variant="body2" color="primary">
              {value.buyPrice}&nbsp;&nbsp;
              <span
                style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "10px" }}
              >
                RFUEL
              </span>
            </Typography>
            <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
              src={value.convertImage}
              alt=""
              width="100%"
              style={{ maxWidth: "29px" }}
            />
          </Box>
          <Accordion style={{ background: "transparent", boxShadow: "none" }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">{value.title}</Typography>
              <Box>
                <AccordionSummary
                  style={{ background: "transparent", boxShadow: "none" }}
                  expandIcon={<ExpandMoreIcon color="fff" />}
                >
                  <Typography variant="body1">{value.price}</Typography>
                </AccordionSummary>
                <Typography
                  variant="body1"
                  style={{ fontSize: "10px", margin: "3px 0px" }}
                  color="secondary"
                >
                  0.036 USDT (₹2.6797) per RFUEL
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">{value.convertTo}</Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: "10px" }}
                  color="secondary"
                >
                  INR
                </Typography>
              </Box>
            </Box>
            <AccordionDetails
              style={{ padding: "0px", boxShadow: "none", display: "block" }}
            >
              <Divider />
              <Box mt={1} mb={1}>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {value.buyPriceText}
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {value.buyPriceValue}
                  </Typography>
                </div>
                <div
                  className="displayCenter"
                  style={{ marginTop: "3px", marginBottom: "3px" }}
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {value.tradingText}
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {value.tradingValue}
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {value.finalBuyText}
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {value.finalBuyValue}
                  </Typography>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      )} */}
      <Box className="mainClass" mt={1}>
        <div>
          <div className="displaySpacebetween">
            <Typography variant="h6" style={{ color: "#FF1010" }}>
              Sell
            </Typography>
            <Typography variant="body2" color="primary">
              14192.00&nbsp;&nbsp;
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "10px",
                  margin: "5px 0",
                }}
              >
                RFUEL
              </span>
            </Typography>
            <img
              onDragStart={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()}
              src={value.sellImage}
              alt=""
              width="100%"
              style={{ maxWidth: "29px", margin: "5px 0" }}
            />
          </div>
          <Accordion
            style={{
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">{value.title}</Typography>
              <Box>
                <AccordionSummary
                  style={{ background: "transparent", boxShadow: "none" }}
                  expandIcon={<ExpandMoreIcon color="fff" />}
                >
                  <Typography variant="body1">5233.1703 USDT</Typography>
                </AccordionSummary>
                <Typography
                  variant="body1"
                  style={{ fontSize: "10px", margin: "3px 0px" }}
                  color="secondary"
                >
                  ₹3.01 per RFUEL
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">{value.exchange}</Typography>
                <Typography
                  variant="body1"
                  style={{ fontSize: "10px", marginTop: "5px" }}
                  color="secondary"
                >
                  USDT
                </Typography>
              </Box>
            </Box>
            <AccordionDetails
              style={{ padding: "0px", boxShadow: "none", display: "block" }}
            >
              <Divider />

              <Box mt={1} mb={1}>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {value.sellNameText}
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {value.sellNameValue}
                  </Typography>
                </div>
                <div
                  className="displayCenter"
                  style={{ marginTop: "3px", marginBottom: "3px" }}
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {value.cryptoTradingText}
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {value.cryptoTradingValue}
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {value.cryptoNetText}
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {value.cryptoNetValue}
                  </Typography>
                </div>
                <div
                  className="displayCenter"
                  style={{ marginTop: "3px", marginBottom: "3px" }}
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {value.tradingChargesText}
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {value.tradingChargesValue}
                  </Typography>
                </div>
                <div className="displayCenter">
                  <Typography
                    variant="body1"
                    color="primary"
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {value.finalSellText}
                  </Typography>
                  <Typography variant="body1" className="graytext">
                    {value.finalSellValue}
                  </Typography>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        </div>
      </Box>
      <Box mt={1} className="arbitrageBox">
        <Grid container spacing={1} alignItems="center">
          <Grid item lg={7} md={7} sm={7} xs={12}>
            <Typography variant="body1" color="secondary" textAlign="left">
              Arbitrage
            </Typography>

            <Box style={{ marginBottom: "4px" }}>
              <Typography variant="body1" color="primary" textAlign="left">
                10.40%(₹3964.706)
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={5} md={5} sm={5} xs={12}>
            <ExpandButton
              variant="outlined"
              color="primary"
              fullWidth
              style={{ padding: "10px 18px" }}
              onClick={handleOpen}
            >
              TRACK LIVE
            </ExpandButton>
          </Grid>
        </Grid>
        <Accordion style={{ background: "transparent", boxShadow: "none" }}>
          <div className="displaySpacebetween">
            <AccordionSummary
              style={{ background: "transparent", boxShadow: "none" }}
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="body1">1.20 mins</Typography>
            </AccordionSummary>
          </div>
          <AccordionDetails
            style={{ padding: "0px", boxShadow: "none", display: "block" }}
          >
            <div className="displaySpacebetween" style={{ marginTop: "16px" }}>
              <Box>
                <Typography variant="body1" color="secondary">
                  1st Level Arbitrage
                </Typography>
                <Typography variant="body1" color="primary">
                  10.40%(₹3964.706)
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="secondary">
                  2nd Level Arbitrage
                </Typography>
                <Typography variant="body1" color="primary">
                  10.40%(₹3964.706)
                </Typography>
              </Box>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>
      <LiveTracking setOpen={setOpen} open={open} />
    </DirectCardPaper>
  );
};

export default DirectCard;
