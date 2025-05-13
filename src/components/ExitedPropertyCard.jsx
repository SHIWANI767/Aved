"use client";

import { useState } from "react";
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
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PeopleIcon from "@mui/icons-material/People";
import i18n from "@/i18n";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { CountryFlag, formatDate } from "@/utils";
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
  background: "linear-gradient(45deg, #25826A, #35a47f)",
  fontSize: "14px",
  width: "100%",
  color: "white",
  padding: 16,
  borderRadius: "10px 10px 0 0",
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

// const SwiperBottomRightChip = styled(Chip)({
//   position: "absolute",
//   bottom: 4,
//   right: 8,
//   zIndex: 100,
//   background:
//     "radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #F6C100, #F6C100)",
//   fontSize: "12px",
//   fontWeight: "bold",
// });
const SwiperTopRightChip = styled(Chip)({
  position: "absolute",
  top: 4,
  right: 8,
  zIndex: 100,
  background:
    "radial-gradient(63.11% 63.11% at 31.97% 19.67%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, #F6C100, #F6C100)",
  fontSize: "12px",
  fontWeight: "bold",
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
    // backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay}
    backdropFilter: "blur(4px)",
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

export default function ExitedPropertyCard({ property }) {
  const { t } = useTranslation();
  return (
    <StyledCard>
      <ImageContainer>
        {/* <PropertyType>
          <Typography variant="body2" fontWeight="medium">
            {property.type}
          </Typography>
        </PropertyType> */}
        <SwiperTopLeftChip label={t("sold")} size="small" />
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

      <CardContent sx={{ pl: 0, pr: 0 }}>
        <Box sx={{ mb: 0 }}>
          <Box sx={{ display: "flex", gap: 0.2, mb: 1 }}>
            {/* <StyledChip label={property.code} variant="outlined" size="small" /> */}
            <StyledChip
              label={property?.location?.city}
              variant="outlined"
              size="small"
            />
            <StyledChip
              icon={<CountryFlag countryName={property?.location?.country} />}
              label={property?.location?.country}
              variant="outlined"
              size="small"
              sx={{
                color: "#25826A",
                borderColor: "#25826A",
              }}
            />
            <StyledChip
              label={`1 ${t(
                "share"
              )} = SAR ${property?.amountAsperShare.toFixed(2)}`}
              variant="outlined"
              size="small"
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
        <Box
          sx={{
            mb: 2,
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body4"
            color="secondary"
            className="outfitFonts"
            sx={{ mt: 0.5 }}
          >
            <CalendarTodayOutlinedIcon fontSize="17px" />{" "}
            {formatDate(property.updatedAt)}
          </Typography>
          {/* <Typography
            variant="body4"
            color="custom"
            className="outfitFonts"
            sx={{ mt: 0.5 }}
          >
            Sold out
          </Typography> */}
        </Box>

        <Box sx={propDescStyle(property)}>
          {" "}
          {property.descVisibility === false ? (
            <Box sx={style.lock}>
              <LockOutlinedIcon sx={{ fontSize: 60, color: "#25826A" }} />
            </Box>
          ) : (
            <>
              {" "}
              <StatRow sx={style.borderBottom}>
                <Typography variant="body4" color="secondary">
                  {t("exited")} {t("date")}
                </Typography>
                <Typography
                  variant="body4"
                  color="text.secondary"
                  fontWeight="medium"
                  className="outfitFonts"
                >
                  {formatDate(property?.updatedAt)}
                </Typography>
              </StatRow>
              <StatRow sx={style.borderBottom}>
                <Typography variant="body4" color="secondary">
                  {t("purchase_price")}
                </Typography>
                <Typography
                  variant="body4"
                  color="text.secondary"
                  fontWeight="medium"
                  className="outfitFonts"
                >
                  SAR {property?.financialDetails?.sellingPrice.toFixed(2)}
                </Typography>
              </StatRow>
              {/* <StatRow sx={style.borderBottom}>
                <Typography variant="body4" color="secondary">
                  Total rental income
                </Typography>
                <Typography
                  variant="body4"
                  color="text.secondary"
                  fontWeight="medium"
                  className="outfitFonts"
                >
                  AED {property.totalRentalIncome}
                </Typography>
              </StatRow> */}
            </>
          )}
        </Box>

        {/* <Box sx={{ mt: 2, mb: 1 }}>
          <Typography variant="caption" color="error.light">
            The returns mentioned above are expected and not guaranteed
          </Typography>
        </Box> */}
      </CardContent>
    </StyledCard>
  );
}
