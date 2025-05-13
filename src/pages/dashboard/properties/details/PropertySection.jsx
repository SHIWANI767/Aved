import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Box,
  Paper,
  LinearProgress,
  TextField,
  InputAdornment,
  styled,
  Stack,
  Avatar,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ApiIcon from "@mui/icons-material/Api";
import InvestmentCalculator from "./InvestmentCalculator";
import Timeline from "./CustomTimeLine";
import CustomTimeLine from "./CustomTimeLine";
import LocationItem from "./LocationItem";
import FinancialSection from "./FinancialSection";
import DocumentsSection from "./DocumentSection";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useSelector, useDispatch } from "react-redux";

import BriefSection from "./BriefSection";
import { parse } from "uuid";
import { useContext, useState } from "react";
import { apiRouterCall } from "@/api-services/service";
// import { ConstantAlphaFactor } from "three";
import toast from "react-hot-toast";
import AppContext from "@/context/AppContext";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { formatDate } from "@/utils";

const MainComponent = styled("div")({
  "& .Caltitle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    paddingLeft: "12px",
  },
});
const style = {
  borderBottom: {
    borderBottom: "1px dashed rgba(106, 106, 106, 0.4)",
    paddingBottom: "3px",
  },
};

export default function PropertySection({ property }) {
  const { t } = useTranslation();
  const [addAmount, setAddAmount] = useState(
    property?.propertyDetails?.amountAsperShare
  );
  const [loading, setLoading] = useState(false);
  const auth = useContext(AppContext);
  const user = useSelector((state) => state.user);
  const extractFirstParagraph = (htmlString) => {
    if (!htmlString) return "";

    // Parse HTML string into a DOM structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Try extracting from <p> tag
    let firstParagraph = doc.querySelector("p")?.textContent?.trim();

    // If <p> is empty, try extracting from <li>
    if (!firstParagraph) {
      firstParagraph = doc.querySelector("li")?.textContent?.trim();
    }

    // If still empty, check for a <div> (CKEditor sometimes uses divs)
    if (!firstParagraph) {
      firstParagraph = doc.querySelector("div")?.textContent?.trim();
    }

    // If still empty, check for any other text content
    if (!firstParagraph) {
      firstParagraph = doc.body.textContent?.trim() || "";
    }

    return firstParagraph || "No Overview Available"; // Fallback if no text found
  };

  const investmentDetails = [
    {
      label: t("property_exited_date"),
      value: formatDate(property?.propertyDetails?.updatedAt),
    },
    {
      label: t("property_details.totalInvestors"),
      value: Array.isArray(property?.propertyDetails?.investors)
        ? property?.propertyDetails?.investors.length
        : typeof property?.propertyDetails?.investors === "number"
        ? property?.propertyDetails?.investors
        : 0,
    },
    {
      label: t("property_details.annualAppreciation"),
      value:
        property?.propertyDetails?.annualAppreciation % 1 === 0
          ? `${property?.propertyDetails?.annualAppreciation} %`
          : `${property?.propertyDetails?.annualAppreciation?.toFixed(2)} %`,
    },
    // {
    //   label: t("property_details.projectedNetYield"),
    //   value:
    //     property?.propertyDetails?.projectNetYield % 1 === 0
    //       ? `${property?.propertyDetails?.projectNetYield} %`
    //       : `${property?.propertyDetails?.projectNetYield?.toFixed(2)} %`,
    // },
    ...(property?.propertyDetails?.projectNetYield_appearance
      ? [
          {
            label: t("property_details.projectedNetYield"),
            value:
              property?.propertyDetails?.projectNetYield % 1 === 0
                ? `${property?.propertyDetails?.projectNetYield} %`
                : `${property?.propertyDetails?.projectNetYield?.toFixed(2)} %`,
          },
        ]
      : []),
    
    {
      label: t("property_details.annualInvestmentReturn"),
      value:
        property?.propertyDetails?.annualizedReturn % 1 === 0
          ? `${property?.propertyDetails?.annualizedReturn} %`
          : `${property?.propertyDetails?.annualizedReturn?.toFixed(2)} %`,
    },
  ];

  const maxPreviewText =
    "A mature real estate market with a high return on investment";
  const maxWords = maxPreviewText.split(" ").length;

  const [isExpanded, setIsExpanded] = useState(false);

  const overview =
    i18n.language === "en"
      ? extractFirstParagraph(property?.propertyDetails?.propertyOverview)
      : extractFirstParagraph(property?.propertyDetails?.propertyOverview_ar) ||
        "";
  const words = overview.split(" ");
  const addCart = async () => {
    setLoading(true);
    try {
      const response = await apiRouterCall({
        method: "POST",
        endPoint: "addToCart",
        token: user?.userInfo?.token,
        bodyData: {
          propertyId: property?.propertyDetails?._id,
          amount: addAmount,
          shareAmount: addAmount / property?.propertyDetails?.amountAsperShare,
          shareValue: property?.propertyDetails?.amountAsperShare,
        },
      });
      if (response?.data?.responseCode === 200) {
        toast.success(response?.data?.responseMessage);
        auth.setCartCount(true);
      } else {
        toast.error(response?.data?.responseMessage);
        console.log("Thisis the error in cart", response);
      }
    } catch (error) {
      console.log(error, "This is the error in the catch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainComponent mt={1}>
      <Grid container spacing={3}>
        {/* Left Section */}
        <Grid item xs={12} sm={12} md={12} lg={7.55}>
          <Box
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
          >
            <Box style={{ marginBottom: "5px", padding: "20px" }}>
              <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <PlagiarismIcon sx={{ color: "#000" }} />
                <Typography variant="h3" color="primary">
                  {t("property_details.overview")}
                </Typography>
              </Box>
              <Typography
  variant="h4"
  color="rgb(37,130,106)"
  mt={1}
  noWrap
  sx={{
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%", // or a specific width like "300px"
  }}
>
{i18n.language === "en"
    ? property?.propertyDetails?.title
    : property?.propertyDetails?.title_ar ||
      property?.propertyDetails?.title}
</Typography>

              <Box mt={2} display="flex" flexWrap="wrap" gap={1} mb={3}>
                <Chip
                  icon={<ApartmentIcon style={{ color: "rgb(37,130,106)" }} />}
                  label={
                    property?.propertyDetails?.isRented ? "Rented" : "Ready"
                  }
                  sx={{
                    color: "rgb(37,130,106)",
                    borderColor: "rgb(37,130,106)",
                    paddingRight: i18n.language === "en" ? "0px" : "10px",
                  }}
                  variant="outlined"
                />
                <Chip
                  icon={<SquareFootIcon style={{ color: "rgb(37,130,106)" }} />}
                  label={`${Number(property?.propertyDetails?.location?.area)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} sq.ft`}
                  sx={{
                    color: "rgb(37,130,106)",
                    borderColor: "rgb(37,130,106)",
                    paddingRight: i18n.language === "en" ? "0px" : "10px",
                  }}
                  variant="outlined"
                />
                <Chip
                  icon={<LocationOnIcon style={{ color: "rgb(37,130,106)" }} />}
                  label={property?.propertyDetails?.location?.city}
                  sx={{
                    color: "rgb(37,130,106)",
                    borderColor: "rgb(37,130,106)",
                    paddingRight: i18n.language === "en" ? "0px" : "10px",
                  }}
                  variant="outlined"
                />
              </Box>
              <Box
                sx={{
                  borderTop: "1px solid #E2E8F0",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                <Box mt={1}>
                  <Typography variant="h5" color="primary">
                    {property?.propertyDetails?.location?.propertyNumber}&nbsp;{" "}
                    {property?.propertyDetails?.location?.city} ,{" "}
                    {property?.propertyDetails?.location?.state} ,{" "}
                    {property?.propertyDetails?.location?.country}
                  </Typography>
                  <Typography variant="body3" mt={0.5} color="secondary">
                    {isExpanded || words.length <= maxWords
                      ? overview
                      : words.slice(0, maxWords).join(" ") + " ..."}

                    {words.length > maxWords && (
                      <Box
                        component="span"
                        sx={{
                          color: "rgb(37,130,106)",
                          cursor: "pointer",
                          ml: 0.3,
                        }}
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? `. ${t("read_less")}` : t("read_more")}
                      </Box>
                    )}
                  </Typography>
                </Box>

                <Box mt={2} mb={1}>
                  <Typography mt={1.5} variant="h5" color="primary">
                    {`${
                      Number.isInteger(
                        property?.propertyDetails?.projectGrossYield
                      )
                        ? property?.propertyDetails?.projectGrossYield
                        : property?.propertyDetails?.projectGrossYield?.toFixed(
                            2
                          ) || "0"
                    } %`}{" "}
                    {t("property_details.annualGrossYield")}
                  </Typography>

                  <Typography variant="body3" mt={0.5} color="secondary">
                    {t("property_details.withNetYieldOf")}{" "}
                    {`${
                      Number.isInteger(
                        property?.propertyDetails?.projectNetYield
                      )
                        ? property?.propertyDetails?.projectNetYield
                        : property?.propertyDetails?.projectNetYield?.toFixed(
                            2
                          ) || "0"
                    } %`}{" "}
                    {t("property_details.onTheInvestment")}
                  </Typography>
                </Box>
              </Box>

              {/* Amenities */}
              {
                property?.propertyDetails?.amenities?.length > 0 &&
                <Box
                sx={{
                  pt: 0.5,
                  maxWidth: "1200px",
                  mx: "auto",
                  "@media(max-width:767px)": {
                    px: 0,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <ApiIcon style={{ color: "#000" }} />
                  <Typography variant="h3" color="primary">
                    {t("property_details.amenities")}
                  </Typography>
                </Box>
                <Swiper
                  spaceBetween={20}
                  loop={property?.propertyDetails?.amenities.length > 3}
                  autoplay={
                    (property?.propertyDetails?.amenities.length > 1 &&
                      window.innerWidth < 600) ||
                    (property?.propertyDetails?.amenities.length > 2 &&
                      window.innerWidth >= 600)
                      ? { delay: 2000, disableOnInteraction: false }
                      : false
                  }
                  modules={[Autoplay]}
                  breakpoints={{
                    600: { slidesPerView: 1 },
                    700: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 },
                  }}
                >
                  {property?.propertyDetails?.amenities.map((step, index) => (
                    <SwiperSlide key={index}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: "12px",
                          border: "1px solid rgb(37,130,106)",
                          minHeight: 100,
                          textAlign: "left",
                          display: "flex",
                          marginBottom: "20px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <Stack direction="row" spacing={2}>
                          <Avatar
                            alt={step.title}
                            src={step.image}
                            style={{ height: "50px", width: "50px" }}
                          />
                        </Stack>
                        <Typography
                          variant="h5"
                          color="rgb(37,130,106)"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "50%", // Ensure it fits within the box
                          }}
                        >
                          {i18n.language === "en"
                            ? step.title || "N/A"
                            : step.title_ar || "N/A"}
                        </Typography>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
              }
              
            </Box>
          </Box>
        </Grid>

        {/* Right Section (Fixed Card) */}
        <Grid
          item
          xs={12}
          md={12}
          lg={4.45}
          sx={{ position: "sticky", top: 20 }}
        >
          <Box
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
          >
            <Box sx={{ padding: "20px !important" }} mt={1}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                <MonetizationOnIcon />
                <Typography variant="h4" color="primary" textAlign="center">
                  {t("investment_value")}
                </Typography>
              </Box>
              <Typography
                variant="h3"
                fontWeight="bold"
                color="rgb(37,130,106)"
                mt={1}
                className="outfitFonts"
                textAlign="center"
              >
                <span style={{ fontSize: "18px" }} className='outfitFonts'>SAR </span>{" "}
                {parseFloat(
                  property?.propertyDetails?.propertyPrice
                ).toLocaleString()}
              </Typography>
              {property?.propertyStatus !== "exited" && (
                <>
                  {" "}
                  <Box mt={1.5} mb={1}>
                    <LinearProgress
                      variant="determinate"
                      value={property?.propertyDetails?.percentFilled}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#25826A",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5" color="text.secondary" className='outfitFonts'>
                      {property?.propertyDetails?.percentFilled % 1 === 0
                        ? `${property?.propertyDetails?.percentFilled} %`
                        : `${property?.propertyDetails?.percentFilled.toFixed(
                            2
                          )} %`}{" "}
                      {t("property_details.funded")}
                    </Typography>

                    <Typography variant="h5" color="text.secondary" className='outfitFonts'>
                      SAR{" "}
                      {parseFloat(
                        property?.propertyDetails?.remainingAmount.toFixed(2)
                      ).toLocaleString()}{" "}
                      {t("property_details.available")}
                    </Typography>
                  </Box>
                </>
              )}
              <Grid container spacing={2} mt={1.25}>
                {investmentDetails.map((item) => (
                  <>
                    <Grid item xs={8}>
                      <Typography
                        variant="body3"
                        fontWeight="bold"
                        color="secondary"
                      >
                        {item.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body3" color="primary" className='outfitFonts'>
                        {item.value}
                      </Typography>
                    </Grid>
                  </>
                ))}
                {property?.propertyStatus === "exited" && (
                  <>
                    <Grid item xs={8}>
                      <Typography
                        variant="body3"
                        fontWeight="bold"
                        color="secondary"
                      >
                        {"Selling Price"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body3" color="primary">
                        {(property?.propertyDetails?.financialDetails
                          ?.sellingPrice &&
                          Number(
                            property.propertyDetails.financialDetails.sellingPrice.toFixed(
                              2
                            )
                          ).toLocaleString()) ||
                          "N/A"}
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        variant="body3"
                        fontWeight="bold"
                        color="secondary"
                      >
                        {"Profite"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <Typography variant="body3" color="primary">
                        {property?.propertyDetails?.propertyPrice &&
                        property?.propertyDetails?.financialDetails
                          ?.sellingPrice
                          ? (
                              ((Number(
                                property.propertyDetails.financialDetails
                                  .sellingPrice
                              ) -
                                Number(
                                  property.propertyDetails.propertyPrice
                                )) /
                                Number(
                                  property.propertyDetails.propertyPrice
                                )) *
                              100
                            ).toFixed(2) + "%"
                          : "N/A"}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
              <Box mt={2}>
                {property?.propertyStatus == "available" && (
                  <Grid container spacing={2} alignItems="center">
                    {/* Number Input Field with Currency Icon */}
                    <Grid item xs={12} sm={7}>
                      <TextField
                        type="number"
                        fullWidth
                        value={addAmount}
                        variant="outlined"
                        placeholder="Amount"
                        onChange={(e) => {
                          let inputValue = e.target.value;
                          if (inputValue.length > 8) {
                            inputValue = inputValue.slice(0, 8); // Trim input to max 8 characters
                          }
                          setAddAmount(inputValue); // Allow temporary invalid input while typing
                        }}
                        onBlur={() => {
                          const minValue =
                            property?.propertyDetails?.amountAsperShare || 0;
                          if (Number(addAmount) < minValue) {
                            setAddAmount(minValue); // Enforce the minimum amount on blur
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              🇸🇦 SAR
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          border: "1px solid #E2E8F0",
                          borderRadius: "8px", // Optional: Add rounded corners
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "none", // Removes default MUI border
                            },
                          },
                        }}
                      />
                    </Grid>

                    {/* Add to Cart Button */}
                    <Grid item xs={12} sm={5}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={addCart}
                        disabled={
                          loading ||
                          addAmount <
                            property?.propertyDetails?.amountAsperShare
                        }
                      >
                        {loading ? t("loading") : t("add_to_cart")}
                      </Button>
                    </Grid>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        flexDirection: "column",
                        px: 2,
                      }}
                    >
                      <Box
                        mt={2}
                        mb={1.5}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          // flexWrap: "wrap",

                          py: 1,
                        }}
                        gap={1}
                      >
                        {["+2000", "+5000", "+10000"].map((label, index) => (
                          <Chip
                            key={index}
                            label={label}
                            variant="outlined"
                            onClick={() =>
                              setAddAmount(Number(label) + Number(addAmount))
                            }
                            sx={{
                              color: "rgb(88, 109, 103)", // Text color
                              cursor: "pointer",
                              backgroundColor: "rgba(37,130,106, 0.1)", // Light green background (10% opacity)
                              borderColor: "rgb(37,130,106)", // Border color

                              "&:hover": {
                                backgroundColor: "rgb(37,130,106) !important", // Solid green on hover
                                color: "#fff", // White text on hover
                              },
                            }}
                          />
                        ))}
                      </Box>
                      <Typography variant="subTitle1" color="primary" mt={1}>
                        {t("property_details.note")}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          borderTop: "1px solid #E2E8F0",
          paddingTop: "20px",
          marginTop: "20px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={7.55}>
            <Box
              style={{
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "15px",
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              }}
            >
              <Box mt={2} mb={3.5}>
                <InvestmentCalculator property={property} />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4.45}>
            <LocationItem property={property} />
            <Box mt={4}>
              <BriefSection property={property} />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={7.55} mt={1}>
            <FinancialSection property={property?.propertyDetails?._id} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4.45} mt={1}>
            <DocumentsSection property={property?.propertyDetails?.documents} />
          </Grid>

          <Grid item xs={12} md={12}>
            <Box mt={2}>
              <CustomTimeLine property={property?.propertyDetails?.timeLine} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainComponent>
  );
}
