import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  LinearProgress,
  TablePagination,
  Tooltip,
  Box,
  Button,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PortfolioPieChart from "./PortfolioPieChart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExitWindow from "@/components/ExitWindow";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/router";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import MyInvestments from "./MyInvestment";
import RentalStrategy from "./RentalStrategy";
import { useTranslation } from "react-i18next";

const style = {
  box: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    color: "#000", // Default text color
    cursor: "pointer",
  },
  cardBox: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    minHeight:"130px",
    color: "#000", // Default text color
    cursor: "pointer",

    "&::before": {
      content: '""',
      position: "absolute",
      bottom: 0, // Start from bottom
      left: 0, // Start from left
      width: "100%",
      height: "100%",
      background: "linear-gradient(45deg, #25826a63, #35a47f1f)",
      transform: "scaleX(0) scaleY(0)", // Initially hidden
      transformOrigin: "bottom left", // Start animation from bottom left
      transition: "transform 0.6s ease-in-out",
      zIndex: 0,
    },

    "&:hover::before": {
      transform: "scaleX(1) scaleY(1)", // Expands to cover the box
    },

    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.2) 0px 8px 16px -2px, rgba(0, 0, 0, 0.25) 0px 4px 8px -3px",
      transform: "translateY(-4px)",
      // color: "#fff", // Change text color on hover
    },

    position: "relative",
    zIndex: 1,

    "& *": {
      position: "relative",
      zIndex: 2, // Ensures text stays above the gradient background
    },
  },
  limitBox: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.4) 0px 8px 16px -2px, rgba(0, 0, 0, 0.35) 0px 4px 8px -3px",
      transform: "translateY(-4px)",
    },

    // textAlign: "center",
  },
  icon: {
    color: "#25826A",
    fontSize: "30px",
  },
  tableContainer: {
    whiteSpace: "pre",
    mt: 2,
    borderRadius: "16px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    overflowX: "auto", // Enables horizontal scrolling
    "&::-webkit-scrollbar": {
      height: "8px", // Makes scrollbar visible
      display: "block",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888", // Scrollbar color
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555", // Darker color on hover
    },
  },
};
const portfolioData = {
  totalInvested: 330000,
  totalAnnualRevenue: 16500,
  totalMonthlyIncome: 2750,
  numberOfProperties: 3,
  annualLimit: 367000,
  investedInLast12Months: 0,
  availableToInvest: 367000,
};

export default function Portfolio() {
  const router = useRouter();
  const [appreciation, setAppreciation] = useState(0);
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getPortFolioOfUser = async () => {
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getPortFolioOfUser",
        token: user?.userInfo?.token,
      });

      console.log(res);
      setAppreciation(0);
      if (res?.data?.responseCode === 200) {
        setData(res?.data?.data || {});
        let appreciation = 0;
        res?.data?.data?.investments?.map((item) => {
          setAppreciation((prev) => prev + item?.appreciationSAR);
        });
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log("Error while getting portfoliodata", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPortFolioOfUser();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom mt={3}>
        {t("portfolio")}
      </Typography>

      {/* Portfolio Value */}
      <Card sx={style.box}>
        <CardContent>
          <Typography variant="h5">{t("portfolio_value")}</Typography>
          <Typography variant="h3" className="outfitFonts">
            SAR {data?.totalInvested?.toLocaleString() || "N/A"}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={style.box} style={{ marginTop: "24px" }}>
        <CardContent sx={{ cursor: "pointer" }}>
          <Typography
            variant="h3"
            color="primary"
            sx={{ justifyContent: "flex-start", marginBottom: "16px" }}
          >
            {t("portfolio_strategy")}
          </Typography>
          <PortfolioPieChart data={data} loading={loading} />
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Grid container spacing={3} mt={2} mb={3}>
        <Grid item xs={12} md={4}>
          <Card sx={style.cardBox}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayIcon sx={style.icon} />
                  <Typography variant="h5"> {t("monthly_income")}</Typography>
                  <Tooltip title="This is your expected monthly income">
                    <InfoOutlinedIcon
                      fontSize="small"
                      sx={{ cursor: "pointer", color: "grey.600" }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="h5" className="outfitFonts">
                  SAR {data?.totalMonthlyIncome?.toLocaleString() || "N/A"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Card sx={style.cardBox}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarTodayIcon sx={style.icon} />{" "}
                  <Typography variant="h5">Expected Monthly Income</Typography>
                  <Tooltip title="This is your expected monthly income">
                    <InfoOutlinedIcon
                      fontSize="small"
                      sx={{ cursor: "pointer", color: "grey.600" }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="h5" className="outfitFonts">
                  SAR {totalMonthlyIncome.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}

        <Grid item xs={12} md={4}>
          <Card sx={style.cardBox}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MonetizationOnIcon sx={style.icon} />{" "}
                  <Typography variant="h5">
                    {" "}
                    {t("total_rental_income")}
                  </Typography>
                  <Tooltip title="This represents the total annual rental income from your investments.">
                    <InfoOutlinedIcon
                      fontSize="small"
                      sx={{ cursor: "pointer", color: "grey.600" }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="h5" className="outfitFonts">
                  SAR {data?.totalRentReceived?.toLocaleString() || "N/A"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={style.cardBox}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TrendingUpOutlinedIcon sx={style.icon} />{" "}
                  <Typography variant="h5">
                    {" "}
                    {t("total_appreciation")}
                  </Typography>
                  <Tooltip title="Unrealised gains or losses from the latest valuations of the owned properties in your portfolio.">
                    <InfoOutlinedIcon
                      fontSize="small"
                      sx={{ cursor: "pointer", color: "grey.600" }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="h5" className="outfitFonts">
                  SAR {appreciation?.toLocaleString() || "N/A"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={style.cardBox}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccountBalanceWalletOutlinedIcon sx={style.icon} />
                  <Typography variant="h5">
                    {" "}
                    {t("total_investments")}
                  </Typography>
                  <Tooltip title="Total number of investments you own in your portfolio.">
                    <InfoOutlinedIcon
                      fontSize="small"
                      sx={{ cursor: "pointer", color: "grey.600" }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="h5" className="outfitFonts">
                  {data?.numberOfProperties || "N/A"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={style.cardBox}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AssessmentOutlinedIcon sx={style.icon} />{" "}
                  <Typography variant="h5">
                    {" "}
                    {t("total_active_investments")}
                  </Typography>
                  <Tooltip title="Total number of active investments you own in your portfolio.">
                    <InfoOutlinedIcon
                      fontSize="small"
                      sx={{ cursor: "pointer", color: "grey.600" }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="h5" className="outfitFonts">
                  {data?.noOfProperties?.availableCount || "N/A"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={style.cardBox}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LockOutlinedIcon sx={style.icon} />{" "}
                  <Typography variant="h5">
                    {" "}
                    {t("total_closed_investments")}
                  </Typography>
                  <Tooltip title="Total number of closed investments you own in your portfolio.">
                    <InfoOutlinedIcon
                      fontSize="small"
                      sx={{ cursor: "pointer", color: "grey.600" }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="h5" className="outfitFonts">
                  {data?.noOfProperties?.exitedCount || "N/A"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid item xs={12} md={4}>
          <Card sx={style.cardBox}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SavingsOutlinedIcon sx={style.icon} />{" "}
                  <Typography variant="h5">Annual Rental Yield</Typography>
                  <Tooltip title="Your portfolio's annualised property yield % is based on the realised rental income that the property generated over the past 12 months">
                    <InfoOutlinedIcon
                      fontSize="small"
                      sx={{ cursor: "pointer", color: "grey.600" }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="h5" className="outfitFonts">
                  {numberOfProperties}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>

      {/* Annual Investment Limit */}
      <Typography variant="h3" gutterBottom>
        {t("annual_investment_limit")}
      </Typography>
      <Card sx={{ ...style.limitBox, mt: 3, mb: 3 }}>
        <CardContent>
          <Typography variant="body3">
            {t("annual_limit")}:{" "}
            <Typography variant="body4" className="outfitFonts">
              SAR 367,000.00
            </Typography>
          </Typography>
          <Typography variant="body3">
            <br />
            {t("invested_last_12_months")}:{" "}
            <Typography variant="body4" className="outfitFonts">
              SAR{" "}
              {data?.oneYearInvestment?.[0]?.totalInvestment?.toLocaleString() ||
                "0"}
            </Typography>
          </Typography>{" "}
          <br />
          <Typography variant="body3">
            {t("available_to_invest")}:{" "}
            <Typography variant="body4" className="outfitFonts">
              {" "}
              SAR{" "}
              {!isNaN(
                367000 - (data?.oneYearInvestment?.[0]?.totalInvestment || 0)
              )
                ? (
                    367000 -
                    (data?.oneYearInvestment?.[0]?.totalInvestment || 0)
                  ).toLocaleString()
                : "0"}
            </Typography>
          </Typography>
          <LinearProgress
            variant="determinate"
            value={
              (data?.oneYearInvestment?.[0]?.totalInvestment / 367000) * 100 ||
              0
            }
            sx={{ mt: 2, mb: 1, height: 10 }}
            color="custom"
          />
          <Typography variant="body4" className="outfitFonts">
            {!isNaN(data?.oneYearInvestment?.[0]?.totalInvestment / 367000)
              ? (
                  ((data?.oneYearInvestment?.[0]?.totalInvestment || 0) /
                    367000) *
                  100
                ).toFixed(2)
              : "0"}
            % {t("of_limit_used")}
          </Typography>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <MyInvestments investments={data?.investments} loading={loading} />
      <br />
      <RentalStrategy />

      <Box mb={5} mt={4}>
        <ExitWindow />
      </Box>
    </Container>
  );
}

Portfolio.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
