import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useSelector } from "react-redux";
import { apiRouterCall } from "@/api-services/service";
import { useTranslation } from "react-i18next";

const boxStyle = {
  border: "1px solid #E2E8F0",
  borderRadius: "12px",
  boxShadow:
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  overflow: "hidden",
  padding: "20px 20px 10px 20px",
  background: "#fff",
};

const toggleStyle = {
  display: "flex",
  border: "1.5px solid #25826A",
  padding: "5px",
  borderRadius: "10px",
  width: "fit-content",
  background: "#25826a0f",
  margin: "auto",
};

const tabStyle = {
  padding: "10px 20px",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  "@media(max-width: 600px)": {
    padding: "7px 13px",
  },
  "@media(max-width: 500px)": {
    padding: "3px 7px",
  },
};

const activeTabStyle = {
  color: "white",
  backgroundImage: "linear-gradient(45deg, #25826A, #35a47f)",
  boxShadow: "0 3px 5px 2px rgba(37, 130, 106, .3)",
};

export default function FinancialSection({ property }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("summary");
  const [getData, setGetData] = useState();
  const user = useSelector((state) => state.user);

  const getFinancialData = async () => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        endPoint: "getFinacialDetailsUser",
        paramsData: {
          propertyId: property,
        },
        token: user?.userInfo?.token,
      });
      if (response?.data?.responseCode === 200) {
        setGetData(response?.data?.data);
        console.log("This is the financial Data");
      } else {
        console.log("This is my error", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFinancialData();
    const savedTab = localStorage.getItem("financialTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const financialData = {
    summary: [
      {
        label: t("property_details.totalAcquisition"),
        value: `SAR ${new Intl.NumberFormat("en-US").format(
          getData?.acquisition?.acqTotalCost || 0
        )}`,
      },
      {
        label: t("property_details.totalRevenue"),
        value: `SAR ${new Intl.NumberFormat("en-US").format(
          getData?.revenue?.annualRevenue || 0
        )}`,
      },
      {
        label: t("property_details.netProfit"),
        value: `SAR ${new Intl.NumberFormat("en-US").format(
          getData?.netProfit?.Profit || 0
        )}`,
        isHighlighted: true,
      },
    
      // ✅ Conditionally add netROI if grossYieldPercentage_appearance is true
      ...(getData?.revenue?.grossYieldPercentage_appearance
        ? [
            {
              label: t("property_details.netYield"),
              value: `${getData?.netProfit?.netROI?.toFixed(2) || 0} % `,
              isHighlighted: true,
            },
          ]
        : []),
    
      {
        label: t("total_appreciation"),
        value: `${getData?.summary?.financialAppreciation?.toFixed(2) || 0} % `,
        isHighlighted: true,
      },
      {
        label: t("property_details.annualInvestmentReturn"),
        value: `${
          (
            getData?.summary?.financialAppreciation + getData?.netProfit?.netROI
          )?.toFixed(2) || 0
        } % `,
        isHighlighted: true,
      },
    
      // Any more conditional blocks can follow this pattern...
    ],
    
    property: [
      // ✅ VAT Percentage (Conditional)
      ...(getData?.acquisition?.vatPercentage_appearance
        ? [
            {
              label: t("property_details.tax"),
              value: `${
                getData?.acquisition?.vatPercentage
                  ? Number.isInteger(getData.acquisition.vatPercentage)
                    ? getData.acquisition.vatPercentage
                    : getData.acquisition?.vatPercentage?.toFixed(2)
                  : 0
              } %`,
            },
          ]
        : []),
    
      // ✅ App Fees (Conditional)
      ...(getData?.acquisition?.appFeesPercentage_appearance
        ? [
            {
              label: t("property_details.appFees"),
              value: `${
                getData?.acquisition?.appFeesPercentage
                  ? Number.isInteger(getData.acquisition.appFeesPercentage)
                    ? getData.acquisition.appFeesPercentage
                    : getData.acquisition.appFeesPercentage?.toFixed(2)
                  : 0
              } %`,
              isHighlighted: true,
            },
          ]
        : []),
    
      // ✅ Transaction Fees (Conditional)
      ...(getData?.acquisition?.transactionFeesPercentage_appearance
        ? [
            {
              label: t("property_details.transactionFees"),
              value: `${
                getData?.acquisition?.transactionFeesPercentage
                  ? Number.isInteger(getData.acquisition.transactionFeesPercentage)
                    ? getData.acquisition.transactionFeesPercentage
                    : getData.acquisition.transactionFeesPercentage?.toFixed(2)
                  : 0
              } %`,
              isHighlighted: true,
            },
          ]
        : []),
    
      // ✅ Commission (Conditional)
      // ...(getData?.acquisition?.commission_appearance
      //   ? [
      //       {
      //         label: t("property_details.commission"),
      //         value: `${
      //           getData?.acquisition?.commission
      //             ? Number.isInteger(getData.acquisition.commission)
      //               ? getData.acquisition.commission
      //               : getData.acquisition.commission?.toFixed(2)
      //             : 0
      //         } %`,
      //       },
      //     ]
      //   : []),
    
      // // ✅ Others Fee (Conditional)
      // ...(getData?.acquisition?.othersFee_appearance
      //   ? [
      //       {
      //         label: t("property_details.othersFee"),
      //         value: `${
      //           getData?.acquisition?.othersFee
      //             ? Number.isInteger(getData.acquisition.othersFee)
      //               ? getData.acquisition.othersFee
      //               : getData.acquisition.othersFee?.toFixed(2)
      //             : 0
      //         } %`,
      //       },
      //     ]
      //   : []),
    
      // ✅ Property Price (Always shown)
      {
        label: t("property_details.propertyPrice"),
        value: `SAR ${new Intl.NumberFormat("en-US").format(
          getData?.acquisition?.propertyPrice || 0
        )}`,
      },
    ],
    
    rental: [
      // ✅ Gross Yield (conditionally shown)
      ...(getData?.revenue?.grossYieldPercentage_appearance
        ? [
            {
              label: t("property_details.grossYield"),
              value: `${
                getData?.revenue?.grossYieldPercentage != null
                  ? Number.isInteger(getData.revenue.grossYieldPercentage)
                    ? getData.revenue.grossYieldPercentage
                    : getData.revenue.grossYieldPercentage?.toFixed(2)
                  : 0
              } %`,
            },
          ]
        : []),
    
      // ✅ Net Yield (conditionally shown)
      ...(getData?.revenue?.netYieldPercentage_appearance
        ? [
            {
              label: t("property_details.netYield"),
              value: `${
                getData?.revenue?.netYieldPercentage != null
                  ? Number.isInteger(getData.revenue.netYieldPercentage)
                    ? getData.revenue.netYieldPercentage
                    : Number(getData.revenue.netYieldPercentage).toFixed(2)
                  : 0
              } %`,
            },
          ]
        : []),
    
      // ✅ Annual Revenue (conditionally shown)
      ...(getData?.revenue?.annualRevenue_appearance
        ? [
            {
              label: t("property_details.annualRevenue"),
              value: `SAR ${new Intl.NumberFormat("en-US").format(
                getData?.revenue?.annualRevenue || 0
              )}`,
            },
          ]
        : []),
    
      // ✅ Monthly Revenue (conditionally shown)
      ...(getData?.revenue?.monthlyRevenue_appearance
        ? [
            {
              label: t("property_details.monthly"),
              value: `SAR ${new Intl.NumberFormat("en-US").format(
                getData?.revenue?.monthlyRevenue || 0
              )}`,
              isHighlighted: true,
            },
          ]
        : []),
    
      // ✅ Q&H Returns (conditionally shown)
      // ...(getData?.revenue?.qandhReturns_appearance
      //   ? [
      //       {
      //         label: t("property_details.qandhReturns"),
      //         value: `SAR ${new Intl.NumberFormat("en-US").format(
      //           getData?.revenue?.qandhReturns || 0
      //         )}`,
      //       },
      //     ]
      //   : []),
    
      // ✅ Exited Revenue (conditionally shown)
      // ...(getData?.revenue?.exitedRevenue_appearance
      //   ? [
      //       {
      //         label: t("property_details.exitedRevenue"),
      //         value: `SAR ${new Intl.NumberFormat("en-US").format(
      //           getData?.revenue?.exitedRevenue || 0
      //         )}`,
      //       },
      //     ]
      //   : []),
    
      // // ✅ Flipping Revenue (conditionally shown)
      // ...(getData?.revenue?.flippingRevenue_appearance
      //   ? [
      //       {
      //         label: t("property_details.flippingRevenue"),
      //         value: `SAR ${new Intl.NumberFormat("en-US").format(
      //           getData?.revenue?.flippingRevenue || 0
      //         )}`,
      //       },
      //     ]
      //   : []),
    ],
    
    costOfRevenue: [
      // ✅ Service Fee (conditionally shown)
      ...(getData?.costOfRevenue?.serviceFee_appearance
        ? [
            {
              label: t("property_details.serviceFee"),
              value: `${
                getData?.costOfRevenue?.serviceFee != null
                  ? Number.isInteger(getData.costOfRevenue.serviceFee)
                    ? getData.costOfRevenue.serviceFee
                    : Number(getData.costOfRevenue.serviceFee).toFixed(2)
                  : 0
              } %`,
            },
          ]
        : []),
    
      // ✅ Maintenance Fee (conditionally shown)
      ...(getData?.costOfRevenue?.maintenanceFee_appearance
        ? [
            {
              label: t("property_details.maintenanceFee"),
              value: `SAR ${new Intl.NumberFormat("en-US").format(
                getData?.costOfRevenue?.maintenanceFee || 0
              )}`,
            },
          ]
        : []),
    
      // ✅ General Fee (conditionally shown)
      ...(getData?.costOfRevenue?.generalFee_appearance
        ? [
            {
              label: t("property_details.generalFee"),
              value: `${
                getData?.costOfRevenue?.generalFee != null
                  ? Number.isInteger(getData.costOfRevenue.generalFee)
                    ? getData.costOfRevenue.generalFee
                    : Number(getData.costOfRevenue.generalFee).toFixed(2)
                  : 0
              } %`,
              isHighlighted: true,
            },
          ]
        : []),
    
      // ✅ Total Cost of Revenue (always shown)
      {
        label: t("property_details.totalCostOfRevenue"),
        value: `SAR ${new Intl.NumberFormat("en-US").format(
          getData?.costOfRevenue?.totalCost || 0
        )}`,
        isHighlighted: true,
      },
    ],
    
    netProfit: [
      {
        label: t("property_details.revenue"),
        value: `SAR ${new Intl.NumberFormat("en-US").format(
          getData?.netProfit?.netRevenue || 0
        )}`,
      },
      {
        label: t("property_details.cost"),
        value: `SAR ${new Intl.NumberFormat("en-US").format(
          getData?.netProfit?.netCost || 0
        )}`,
      },
      {
        label: t("property_details.profit"),
        value: `SAR ${new Intl.NumberFormat("en-US").format(
          getData?.netProfit?.Profit || 0
        )}`,
      },
      {
        label: t("property_details.netYield"),
        value: `${getData?.netProfit?.netROI?.toFixed(2) || 0} % `,
        isHighlighted: true,
      },
      {
        label: t("total_appreciation"),
        value: `${getData?.summary?.financialAppreciation?.toFixed(2) || 0} % `,
        isHighlighted: true,
      },
      {
        label: t("property_details.annualInvestmentReturn"),
        value: `${
          (
            getData?.summary?.financialAppreciation + getData?.netProfit?.netROI
          )?.toFixed(2) || 0
        } % `,
        isHighlighted: true,
      },
    ],
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("financialTab", tab);
  };

  return (
    <Box sx={boxStyle}>
      <Box mb={2} mt={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "center",
          }}
          mb={2}
        >
          <PaymentsIcon />
          <Typography variant="h4" color="primary" textAlign="center">
            {t("property_details.financials")}
          </Typography>
        </Box>
        <Box sx={toggleStyle}>
          {["summary", "property", "rental", "costOfRevenue", "netProfit"].map(
            (tab) => (
              <Box
                key={tab}
                sx={
                  activeTab === tab
                    ? { ...tabStyle, ...activeTabStyle }
                    : tabStyle
                }
                onClick={() => handleTabChange(tab)}
              >
                <Typography variant="body4">
                  {tab === "summary"
                    ? t("property_details.financials")
                    : tab === "property"
                    ? t("property_details.investmentCost")
                    : tab === "rental"
                    ? t("property_details.revenue")
                    : tab === "costOfRevenue"
                    ? t("property_details.costOfRevenue")
                    : t("property_details.profit")}
                </Typography>
              </Box>
            )
          )}
        </Box>
      </Box>

      <Grid container spacing={2} mt={2} mb={3}>
        {financialData[activeTab].map((item, index, array) => {
          const isLastItem = index === array.length - 1;

          return (
            <React.Fragment key={index}>
              <Grid
                item
                xs={8}
                sx={{
                  color: isLastItem ? "rgb(37,130,106)" : "rgb(37,130,106)",
                  borderBottom: isLastItem ? "none" : "1px solid #E2E8F0",
                  paddingBottom: isLastItem ? "0px" : "12px",
                  marginTop: isLastItem ? "3px" : "3px",
                }}
              >
                <Typography
                  variant="body3"
                  fontWeight="bold"
                  color={isLastItem ? "rgb(37,130,106)" : "rgb(37,130,106)"}
                >
                  {item.label}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  color: isLastItem ? "rgb(37,130,106)" : "rgb(37,130,106)",
                  borderBottom: isLastItem ? "none" : "1px solid #E2E8F0",
                  paddingBottom: isLastItem ? "0px" : "12px",
                  marginTop: isLastItem ? "3px" : "3px",
                }}
              >
                <Typography
                  variant="body3"
                  className="outfitFonts"
                  color={isLastItem ? "rgb(37,130,106)" : "rgb(37,130,106)"}
                  sx={{ float: "right" }}
                >
                  {item.value}
                </Typography>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </Box>
  );
}
