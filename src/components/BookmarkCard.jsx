"use client";

import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  styled,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import PeopleIcon from "@mui/icons-material/People";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CountryFlag, formatDate } from "@/utils";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { apiRouterCall } from "@/api-services/service";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AppContext from "src/context/AppContext";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "90%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  //   overflow: 'hidden',
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
}));

const ImageContainer = styled(Box)({
  position: "relative",
  paddingTop: "56.25%", // 16:9 aspect ratio
  "& .swiper": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  "& .swiper-slide img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const PropertyType = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 16,
  left: 16,
  zIndex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  padding: "8px 16px",
  borderRadius: "20px",
  color: "white",
}));

const StyledChip = styled(Chip)({
  margin: "0 4px 0 0",
  // height: "24px",
  padding: "5px",
  fontSize: "11px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StatRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
});
const SwiperTopLeftChip = styled(Chip)({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 100,
  backgroundColor: "#52524f8a",
  fontSize: "12px",
  width: "100%",
  color: "white",
  padding: 16,
  borderRadius: "10px 10px 0 0",
});

const SwiperBottom = styled(Chip)({
  position: "absolute",

  left: 0,
  bottom: 0,
  zIndex: 10,
  backgroundColor: "#52524f8a",
  fontSize: "12px",
  width: "100%",
  color: "white",
  padding: 16,
  borderRadius: "0 0 10px 10px ",
});

const SwiperBottomRightChip = styled(Chip)({
  position: "absolute",
  bottom: 4,
  right: 8,
  zIndex: 100,
  background: "linear-gradient(45deg, #25826a, #35a47f)",
  fontSize: "12px",
  color: "white",
});
const SwiperBottomLeftChip = styled(Chip)({
  position: "absolute",
  bottom: 4,
  left: 8,
  zIndex: 100,
  background:
    "radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #efecdf, #cfc8ae)",
  fontSize: "12px",
  fontWeight: "bold",
});
const Boxbook = styled(Box)({
  position: "absolute",
  top: 4,
  right: 8,
  zIndex: 100,
  //   background: "linear-gradient(45deg, #25826a, #35a47f)",
  fontSize: "10px",
  color: "white",
});
const SwiperTopLeftChip1 = styled(Chip)({
  position: "absolute",
  top: 4,
  left: 8,
  zIndex: 100,
  background: "linear-gradient(45deg, #25826a, #35a47f)",
  fontSize: "10px",
  color: "white",
});

const style = {
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  borderBottom: {
    borderBottom: "1px dashed rgba(106, 106, 106, 0.4)",
    paddingBottom: "3px",
  },
  lock: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10% 0",
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Dark overlay}
    backdropFilter: "blur(4px)",
    borderRadius: "10px",
  },
};
const propDescStyle = (property) => ({
  position: "relative",
  overflow: "hidden",
  ...(property.descVisibility === false && {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight dark overlay
    pointerEvents: "none", // Disable interactions if needed
    borderRadius: "20px",
  }),
});

export default function BookmarkCard({ property, fetchData, getProp }) {
  const router = useRouter();
  const theme = useTheme(); // Get theme
  const user = useSelector((state) => state.user);
  const auth = useContext(AppContext);
  const { t } = useTranslation();

  console.log(user?.userInfo?.verifyAccount);

  const getTimeRemaining = (deadline) => {
    const now = new Date();
    const target = new Date(deadline);
    const diff = target - now; // Difference in milliseconds

    if (diff <= 0) return "Expired"; // If deadline has passed

    const msInMinute = 60 * 1000;
    const msInHour = 60 * msInMinute;
    const msInDay = 24 * msInHour;

    const days = Math.floor(diff / msInDay);
    const hours = Math.floor((diff % msInDay) / msInHour);

    if (days > 0) {
      return `${days} D ${hours} hr`; // Example: 23 D 5 hr
    } else {
      const minutes = Math.floor((diff % msInHour) / msInMinute);
      return `${hours} hr ${minutes} min`; // Example: 5 hr 30 min
    }
  };
  const toggleBookmark = async () => {
    console.log(property);
    try {
      const response = await apiRouterCall({
        method: "DELETE",
        endPoint: "removeBookmark",
        token: user?.userInfo?.token,
        bodyData: {
          user: user?.userInfo?._id,
          property: property?._id,
        },
      });

      if (response?.data?.message) {
        if (
          response?.data?.message ===
            "You have successfully bookmarked the property." ||
          response?.data?.message === "Bookmark removed successfully"
        ) {
          toast.success(response?.data?.message);
          fetchData(true);
        } else {
          toast.error(response?.data?.message);
        }
        console.log(
          `Property ${
            isBookmarked ? "removed from" : "added to"
          } bookmark successfully`
        );
        // dispatch(toggleBookmarkState());
      }
    } catch (error) {
      console.log(error);
    } finally {
      auth.setBookmarkCounts(true);
    }
  };
  return (
    <StyledCard>
      <ImageContainer>
        {/* <PropertyType>
          <Typography variant="body2" fontWeight="medium">
            {property.type}
          </Typography>
        </PropertyType> */}
        <SwiperTopLeftChip size="small" />
        {/* <SwiperBottom  size="small" /> */}
        <SwiperBottomRightChip
          icon={<PeopleIcon color="white" />} // ✅ Correct way to add the icon
          label={`${t("investors")}: ${
            Array.isArray(property?.investors)
              ? property.investors.length
              : typeof property?.investors === "number"
              ? property.investors
              : 0
          }`}
          size="small"
          sx={{ paddingRight: i18n.language === "en" ? "0px" : "10px" }}
        />
        {/* <SwiperBottomLeftChip
          icon={<AccessAlarmIcon />} // ✅ Correct way to add the icon
          label={` ${getTimeRemaining(property?.timeLine[2]?.date)}`}
          size="small"
        /> */}
        <Boxbook onClick={() => toggleBookmark()}>
          <BookmarkOutlinedIcon />
        </Boxbook>
        {/* <SwiperTopLeftChip1
          label={
            property?.investmentRiskLevel === "LOW"
              ? "Low"
              : property?.investmentRiskLevel === "MEDIUM"
              ? "Medium"
              : property?.investmentRiskLevel === "HEIGH"
              ? "High"
              : property?.investmentRiskLevel === "VERY_HEIGH"
              ? "Very High"
              : ""
          }
          size="small"
        /> */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            swiper.pagination.el.style.setProperty(
              "--swiper-pagination-color",
              "#27866c"
            ); // Dot color
            swiper.pagination.el.style.setProperty(
              "--swiper-pagination-bullet-inactive-color",
              "#ccc"
            ); // Inactive dot color
            swiper.pagination.el.style.setProperty(
              "--swiper-pagination-bullet-inactive-opacity",
              "1"
            ); // Full opacity for inactive dots
            swiper.pagination.el.style.setProperty(
              "--swiper-pagination-bullet-size",
              "10px"
            ); // Dot size
            swiper.pagination.el.style.setProperty(
              "--swiper-pagination-bullet-active-color",
              "green"
            ); // Active dot color
          }}
          style={{}}
        >
          {property?.photos?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Property ${index + 1}`}
                style={{ borderRadius: "10px" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ImageContainer>

      <CardContent sx={{ pl: 0, pr: 0 }} onClick={() => getProp()}>
        <Box sx={{ mb: 0 }}>
          <Box sx={{ display: "flex", gap: 0.2, mb: 1, flexWrap: "wrap" }}>
            <StyledChip
              icon={<CalendarTodayIcon color="custom" />}
              label={`From ${formatDate(property?.dateIssuedOnPlatform)}`}
              variant="outlined"
              size="small"
              sx={{
                color: theme.palette.custom.main,
                borderColor: theme.palette.custom.main,
              }}
            />
            <StyledChip
              icon={<CountryFlag countryName={property?.location?.country} />}
              label={property?.location?.country}
              variant="outlined"
              size="small"
              sx={{
                color: theme.palette.custom.main,
                borderColor: theme.palette.custom.main,
              }}
            />

            <StyledChip
              label={`1 Share = SAR ${property?.amountAsperShare.toFixed(2)}`}
              variant="outlined"
              size="small"
              sx={{
                color: theme.palette.custom.main,
                borderColor: theme.palette.custom.main,
              }}
            />
          </Box>
          <Typography variant="h5" color="text.secondary" sx={style.title}>
            {i18n.language === "en"
              ? property?.title
              : property?.title_ar || property?.title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            marginTop: "5px",
          }}
        >
          <Typography
            variant="h4"
            color="text.secondary"
            component="p"
            fontWeight="bold"
            className="outfitFonts"
          >
            SAR {property?.propertyPrice.toLocaleString()}
            {".00"}
          </Typography>
        </Box>
        <Box sx={{ mb: 2, mt: 1 }}>
          <Typography
            variant="body4"
            color="secondary"
            className="outfitFonts"
            sx={{ mt: 0.5 }}
          >
            {(
              (property?.fundingReceived / property?.propertyPrice) *
              100
            ).toFixed(2)}
            {`% ${t("funded")}`}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(
              (property?.fundingReceived / property?.propertyPrice) *
              100
            ).toFixed(2)}
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

        <Box sx={propDescStyle(property)}>
          {" "}
          {user?.userInfo?.verifyAccount === false ? (
            <Box sx={style.lock}>
              <LockOutlinedIcon sx={{ fontSize: 60, color: "#25826A" }} />
            </Box>
          ) : (
            <>
              {" "}
              <StatRow sx={style.borderBottom}>
                <Typography variant="body4" color="secondary">
                  {t("annual_rental_yield")}
                </Typography>
                <Typography
                  variant="body4"
                  color="text.secondary"
                  fontWeight="medium"
                  className="outfitFonts"
                >
                  {property?.projectGrossYield.toFixed(2)}%
                </Typography>
              </StatRow>
              <StatRow sx={style.borderBottom}>
                <Typography variant="body4" color="secondary">
                  {t("net_rental_yield")}
                </Typography>
                <Typography
                  variant="body4"
                  color="text.secondary"
                  fontWeight="medium"
                  className="outfitFonts"
                >
                  {property?.projectNetYield.toFixed(2)}%
                </Typography>
              </StatRow>
              
              <StatRow sx={style.borderBottom}>
                <Typography variant="body4" color="secondary">
                  {t("annual_appreciation")}
                </Typography>
                <Typography
                  variant="body4"
                  color="text.secondary"
                  fontWeight="medium"
                  className="outfitFonts"
                >
                  {property.annualAppreciation.toFixed(2)}%
                </Typography>
              </StatRow>
              <StatRow sx={style.borderBottom}>
                <Typography variant="body4" color="secondary">
                {t("roi")}
                </Typography>
                <Typography
                  variant="body4"
                  color="text.secondary"
                  fontWeight="medium"
                  className="outfitFonts"
                >
                  {property.annualizedReturn.toFixed(2)}%
                </Typography>
              </StatRow>
            </>
          )}
        </Box>

        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography variant="body1" color="secondary">
            {t("returns_disclaimer")}{" "}
            <span 
            // style={{ textDecoration: "underline" }}
            >
              {" "}
              {t("learn_more")}
            </span>
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
}
