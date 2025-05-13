import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useTranslation } from "react-i18next";

const buttonStyle = {
  marginTop: "10px",
  borderRadius: "50px",
  padding: "8px 20px",
  fontWeight: "bold",
  border: "1.5px solid #25826A",
  color: "#25826A",
  marginBottom: "15px",
  background: "#fff",
  "&:hover": {
    background: "#25826A",
    color: "#fff",
  },
  "@media(max-width: 768px)": {
    fontSize: "12px",
    padding: "8px 17px",
  },
};
export default function BriefSection({ property }) {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const investmentDetails = [
    {
      label: t("property_details.investmentCategories"),
      value:
        (property?.propertyDetails?.investmentCategory === "REAL_ESTATE" &&
          t("property_brief.realEstate")) ||
        (property?.propertyDetails?.investmentCategory ===
          "SMALL_MEDIUM_ENTERPRICE" &&
          t("property_brief.smallMediumEnterprise")) ||
        (property?.propertyDetails?.investmentCategory === "VENTURE_CAPITAL" &&
          t("property_brief.ventureCapital")),
    },
    {
      label: t("property_details.investmentRiskLevel"),
      value:
        (property?.propertyDetails?.investmentRiskLevel === "LOW" &&
          t("property_brief.low")) ||
        (property?.propertyDetails?.investmentRiskLevel === "MEDIUM" &&
          t("property_brief.medium")) ||
        (property?.propertyDetails?.investmentRiskLevel === "HEIGH" &&
          t("property_brief.high")) ||
        (property?.propertyDetails?.investmentRiskLevel === "VERY_HEIGH" &&
          t("property_brief.veryHigh")),
    },
    {
      label: t("property_details.investmentType"),
      value:
        (property?.propertyDetails?.investmentType === "LONG_TERM" &&
          t("property_brief.longTerm")) ||
        (property?.propertyDetails?.investmentType === "SORT_TERM" &&
          t("property_brief.shortTerm")) ||
        (property?.propertyDetails?.investmentType === "MEDIUM_TERM" &&
          t("property_brief.mediumTerm")),
    },
    {
      label: t("property_details.investmentStrategy"),
      value:
        (property?.propertyDetails?.investmentStrategy === "GROWTH" &&
          t("property_brief.growth")) ||
        (property?.propertyDetails?.investmentStrategy === "MONTHLY_INCOME" &&
          t("property_brief.monthlyIncome")) ||
        (property?.propertyDetails?.investmentStrategy === "ANNUAL_INCOME" &&
          t("property_brief.annualIncome")) ||
        (property?.propertyDetails?.investmentStrategy ===
          "SEMI_ANNUAL_INCOME" &&
          t("property_brief.semiAnnualIncome")) ||
        (property?.propertyDetails?.investmentStrategy === "VALUE" &&
          t("property_brief.value")) ||
        (property?.propertyDetails?.investmentStrategy === "EXIT" &&
          t("property_brief.exit")),
    },
    {
      label: t("property_details.exitTimeline"),
      value:
        (property?.propertyDetails?.exitTime === "1_2_YEARS" &&
          t("property_brief.oneToTwoYears")) ||
        (property?.propertyDetails?.exitTime === "2_5_YEARS" &&
          t("property_brief.twoToFiveYears")) ||
        (property?.propertyDetails?.exitTime === "MORE_THAN_5" &&
          t("property_brief.moreThanFiveYears")),
    },
    {
      label: t("property_details.liquidity"),
      value:
        (property?.propertyDetails?.liquidity === "EASY" &&
          t("property_brief.easy")) ||
        (property?.propertyDetails?.liquidity === "MODERATE" &&
          t("property_brief.moderate")) ||
        (property?.propertyDetails?.liquidity === "DIFFICULT" &&
          t("property_brief.difficult")),
    },
    {
      label: t("property_details.historicalReturns"),
      value:
        (property?.propertyDetails?.historicalReturns === "AVAILABLE" &&
          t("property_brief.available")) ||
        (property?.propertyDetails?.historicalReturns === "NOT_AVAILABLE" &&
          t("property_brief.notAvailable")),
    },
    {
      label: t("property_details.legalStructure"),
      value:
        (property?.propertyDetails?.legalStructure === "DIRECT_OWNERSHIP" &&
          t("property_brief.directOwnership")) ||
        (property?.propertyDetails?.legalStructure === "PARTNERSHIP" &&
          t("property_brief.partnershipSharedPartnership")) ||
        (property?.propertyDetails?.legalStructure === "FUND" &&
          t("property_brief.funds")) ||
        (property?.propertyDetails?.legalStructure === "SHARES" &&
          t("property_brief.share")),
    },
    {
      label: t("property_details.propertyManagement"),
      value:
        (property?.propertyDetails?.management === "IN_HOUSE" &&
          t("property_brief.inHouseCompanyManagement")) ||
        (property?.propertyDetails?.management === "THIRD_PARTY" &&
          t("property_brief.thirdParty")),
    },
  ];

  const showSeeMoreButton = investmentDetails.length > 5;
  const visibleDetails = showAll
    ? investmentDetails
    : investmentDetails.slice(0, 5);
  return (
    <Box
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        background: "#fff",
        padding: "20px",
      }}
      // mb={1}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          marginTop: "4.5px",
        }}
      >
        <AssignmentIcon />
        <Typography variant="h4" color="primary" textAlign="center">
          {t("property_details.brief")}
        </Typography>
      </Box>

      <Grid container spacing={1} mt={2}>
        {visibleDetails.map((item, index) => (
          <React.Fragment key={index} mb={1}>
            <Grid container alignItems="center" px={2} mt={1} mb={1.4}>
              {" "}
              {/* Added padding for spacing */}
              <Grid item xs={7}>
                <Typography
                  variant="body3"
                  fontWeight="bold"
                  color="rgb(37,130,106)"
                >
                  {item.label}
                </Typography>
              </Grid>
              <Grid item xs={5} textAlign="right">
                <Typography variant="body3" color="secondary">
                  {item.value}
                </Typography>
              </Grid>
            </Grid>

            {index < visibleDetails.length - 1 && (
              <Divider sx={{ borderColor: "#E2E8F0", width: "100%", my: 1 }} />
            )}
          </React.Fragment>
        ))}
      </Grid>

      {showSeeMoreButton && (
        <Box textAlign="center" mt={3.12} mb={1.5}>
          <Button
            onClick={() => setShowAll(!showAll)}
            sx={buttonStyle}
          >
            {showAll
              ? t("property_details.seeLess")
              : t("property_details.seeMore")}
          </Button>
        </Box>
      )}
    </Box>
  );
}
