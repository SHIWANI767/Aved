import React from "react";
import dynamic from "next/dynamic";
import { Grid, Typography, Box } from "@mui/material";
import Loader from "@/components/PageLoader/Loader";
import { useTranslation } from "react-i18next";

// Dynamically import ApexCharts to avoid "window is not defined" error
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <p>Loading Chart...</p>,
});

export default function PortfolioPieChart({ data = {}, loading }) {
  const { t } = useTranslation();
  console.log(data);

  const portfolioData = [
    {
      value: data?.totalAnnualRevenue ?? 0,
      label: t("annual_return"),
      color: "#25826A",
    },
    {
      value: data?.totalMonthlyIncome ?? 0,
      label: t("monthly_return"),
      color: "#F57C00",
    },
    {
      value: data?.totalSemiannuaReturn ?? 0,
      label: t("semi_return"),
      color: "#9f3fa5",
    },
    {
      value: data?.totalExitedReturn ?? 0,
      label: t("exited_return"),
      color: "#d12c11",
    },
  ];

  const chartOptions = {
    chart: {
      type: "donut",
    },
    labels: portfolioData.map((item) => item.label),
    colors: portfolioData.map((item) => item.color),
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: t("total_value_sar"),
              formatter: function () {
                return data?.totalInvested?.toLocaleString() ?? "0";
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false,
      position: "bottom",
    },
  };
  if (loading) {
    return <Loader />;
  } else
    return (
      <>
        <style jsx global>{`
          .apexcharts-tooltip {
            background: #fff !important;
            color: #000 !important;
            border: 1px solid #ddd !important;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          }
        `}</style>

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={12} md={5} lg={6} style={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Chart
                options={chartOptions}
                series={
                  portfolioData.every((item) => item.value === 0)
                    ? [1]
                    : portfolioData.map((item) => item.value)
                }
                type="donut"
                width="370"  // increase as needed
                height="370"
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={6} >
            {portfolioData.map((item, index) => (
              <Box
                key={index}
                textAlign={"left"}
                sx={{ borderLeft: `5px solid ${item.color}`, mt: 4, pl: 1 }}
              >
                <Typography color={"primary"} variant="body2">
                  {item.label}:
                </Typography>
                <Typography variant="h5" className="outfitFonts">
                  <span style={{ color: "#25826A" }}>
                    SAR {item?.value?.toLocaleString()}
                  </span>{" "}
                  {t("from_total_portfolio")}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </>
    );
}
