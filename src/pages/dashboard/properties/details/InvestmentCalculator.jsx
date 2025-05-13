import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Slider, Typography, Grid } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import { useTranslation } from "react-i18next";
// import EditIcon from "@mui/icons-material/Edit";
import EditNoteIcon from "@mui/icons-material/EditNote";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const InvestmentCalculator = ({ property }) => {
  const { t } = useTranslation();
  const [investment, setInvestment] = useState(5000);
  const [investmentYears, setInvestmentYears] = useState(1);
  const propertyDetails = property?.propertyDetails || {};
  console.log(propertyDetails);
  const initialInvestment = investment;
  const grossYield = propertyDetails.projectGrossYield || 0;
  const netYield = propertyDetails.projectNetYield || 0;
  const appreciationPercentage = propertyDetails.annualAppreciation || 0;

  const currentYear = new Date().getFullYear();
  const endYear = property?.propertyDetails.endDate
    ? new Date(property?.propertyDetails.endDate).getFullYear()
    : currentYear;
  const maxInvestmentYears = Math.max(1, endYear - currentYear);

  const calculateData = () => {
    let cumulativeRentalIncome = 0;
    let cumulativeNetProfit = 0;
    let cumulativeAppreciation = 0;
    let lastYearAppreciation = 0;

    return Array.from({ length: investmentYears }, (_, index) => {
      const year = new Date().getFullYear() + index;

      // Rental Income Calculation
      const rentalIncome = initialInvestment * (grossYield / 100);
      cumulativeRentalIncome += rentalIncome;

      // Net Profit Calculation
      const netProfit = initialInvestment * (netYield / 100);
      cumulativeNetProfit += netProfit;

      // Appreciation Calculation (Compounded)
      let appreciation =
        lastYearAppreciation +
        (initialInvestment + lastYearAppreciation) *
          (appreciationPercentage / 100);
      lastYearAppreciation = appreciation;
      cumulativeAppreciation = appreciation;

      return {
        year,
        investment: initialInvestment,
        rentalIncome: cumulativeRentalIncome,
        netProfit: cumulativeNetProfit,
        appreciation: cumulativeAppreciation,
      };
    });
  };

  const chartData = calculateData();

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
      },
    },
    xaxis: {
      categories: chartData.map((d) => d.year),
    },
    yaxis: {
      labels: {
        formatter: (value) => Math.round(value),
      },
    },
    colors: ["#0A0A0A", "#FFC107", "#E63946", "rgb(37,130,106)"],
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false,
    },
  };
  const sliderStyles = {
    "& .MuiSlider-thumb": {
      width: 22,
      height: 22,
      background: "linear-gradient(135deg, #25826A,rgb(8, 85, 31))", // Gradient for modern feel
      border: "4px solid white",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow for floating effect
      transition: "transform 0.2s ease-in-out",
      // "&:hover": {
      //   transform: "scale(1.1)", // Slightly enlarge on hover for better UX
      // },
    },
    "& .MuiSlider-track": {
      height: 8,
      background: "linear-gradient(to right, #25826A, rgb(8, 85, 31))", // Smooth color gradient
      transition: "width 0.2s ease-in-out",
      borderRadius: 5,
    },
    "& .MuiSlider-rail": {
      height: 6,
      backgroundColor: "rgba(71, 73, 73, 0.4)", // Soft grey with transparency
      borderRadius: 5,
    },
  };

  const series = [
    {
      name: t("property_details.investment"),
      data: chartData.map((d) => d.investment),
    },
    {
      name: t("property_details.totalRentalIncome"),
      data: chartData.map((d) => d.rentalIncome),
    },
    {
      name: t("property_details.netProfit"),
      data: chartData.map((d) => d.netProfit),
    },
    {
      name: t("property_details.valueAppreciation"),
      data: chartData.map((d) => d.appreciation),
    },
  ];

  const investmentData = [
    {
      label: t("property_details.investment"),
      amount: `${investment.toLocaleString()}`,
      color: "#0A0A0A",
    },
    {
      label: t("annual_return"),
      amount: `${
        chartData[chartData.length - 1]?.rentalIncome.toLocaleString() || 0
      }`,
      color: "#FFC107",
    },
    {
      label: t("property_details.netProfit"),
      amount: `${
        chartData[chartData.length - 1]?.netProfit
          .toFixed(2)
          .toLocaleString() || 0
      }`,
      color: "#E63946",
    },
    {
      label: t("property_details.valueAppreciation"),
      amount: `${
        chartData[chartData.length - 1]?.appreciation.toLocaleString() || 0
      }`,
      color: "rgb(37,130,106)",
    },
    {
      width: true,
      label: t("total_profit"),
      amount: `${
        (
          chartData[chartData.length - 1]?.netProfit +
          chartData[chartData.length - 1]?.appreciation
        ).toLocaleString() || 0
      }`,
      color: "rgb(20 209 193 )",
    },
    {
      width: true,
      label: t("roi"),
      amount: `${
        (
          ((chartData[chartData.length - 1]?.netProfit +
            chartData[chartData.length - 1]?.appreciation) /
            investment) *
          100
        ).toFixed(2) || 0
      } %`, // ✅ Display ROI as a percentage without "SAR"
      color: "#c239e6",
    },
  ];
  console.log(
    "roisssss",
    chartData[chartData.length - 1]?.netProfit,
    chartData[chartData.length - 1]?.appreciation,
    investment
  );

  return (
    <Box pl={1}>
      <Box className="Caltitle" mt={2}>
        <CalculateIcon style={{ color: "#000" }} />
        <Typography variant="h3" color="primary">
          {t("property_details.investmentCalculator")}
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "12px",
        }}
      >
        <Grid container spacing={1}>
          {investmentData.map((item, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      bgcolor: item.color,
                    }}
                  />
                  <Typography variant="h5" color="primary">
                    {item.label}
                  </Typography>
                </Box>
                <Typography
                  variant="h5"
                  color="rgb(37,130,106)"
                  className="outfitFonts"
                >
                  {item.label === t("roi") ? item.amount : `SAR ${item.amount}`}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          padding: "15px",
          marginTop: "12px",
        }}
      >
        <Typography mt={2} variant="h5">
          {t("property_details.projectedInvestmentReturn")}
        </Typography>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={350}
          mt={1}
        />
      </Box>

      <Box mt={3}>
        <Typography
          variant="h6"
          fontWeight="500"
          color="primary"
          display={"flex"}
          alignItems={"center"}
          gap={1}
        >
          {t("property_details.initialInvestment")} SAR{" "}
          <input
            type="text"
            value={investment}
            onChange={(e) => {
              let value = e.target.value;

              // Allow clearing the input completely
              if (value === "") {
                setInvestment("");
                return;
              }

              // Ensure only numeric values
              if (/^\d*$/.test(value)) {
                // Convert multiple zeros (like 0000) to a single 0
                if (/^0+$/.test(value)) {
                  setInvestment(0);
                }
                // Apply max limit
                else if (Number(value) > propertyDetails?.propertyPrice) {
                  setInvestment(propertyDetails?.propertyPrice);
                } else {
                  setInvestment(value);
                }
              }
            }}
            onBlur={(e) => {
              let value = e.target.value;

              // If input is empty or below 1 share, reset it to the min allowed value
              if (
                value === "" ||
                isNaN(value) ||
                Number(value) < propertyDetails.amountAsperShare
              ) {
                setInvestment(propertyDetails.amountAsperShare);
              } else {
                setInvestment(Number(value)); // Convert back to number
              }
            }}
            style={{
              borderBottom: "1px solid rgba(0,0,0, 1)",
              borderLeft: 0,
              borderRight: 0,
              borderTop: 0,
              outline: "none",
              fontSize: "inherit",
              fontWeight: "inherit",
              width: "80px",
              textAlign: "left",
              background: "transparent",
            }}
          />
          <EditNoteIcon />
        </Typography>
        {/* Slider for Selecting Investment Amount */}
        <Slider
          value={investment || propertyDetails.amountAsperShare || 1000} // Prevents issues when input is empty
          min={propertyDetails.amountAsperShare || 1000}
          max={propertyDetails?.propertyPrice}
          step={1}
          onChange={(e, value) => setInvestment(value)}
          sx={sliderStyles}
        />
      </Box>

      <Box mt={3} mb={3}>
        <Typography variant="h6" fontWeight="500" color="primary">
          {t("property_details.numberOfInvestmentYears")}: {investmentYears}
        </Typography>
        <Slider
          value={investmentYears}
          min={1}
          max={maxInvestmentYears}
          step={1}
          onChange={(e, value) => setInvestmentYears(value)}
          sx={sliderStyles}
        />
      </Box>
    </Box>
  );
};

export default InvestmentCalculator;
