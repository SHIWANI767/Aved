import React from "react";
import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const containerStyle = {
  width: "95%",
  height: "280px",
  borderRadius: "12px",
  border: "none",
  padding: "10px",
};

const boxStyle = {
  border: "1px solid #E2E8F0",
  borderRadius: "12px",
  boxShadow:
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  overflow: "hidden",
};

const LocationItem = ({ property }) => {
  const { t } = useTranslation();

  const defaultDescription =
    "This is one of the premier investment opportunities at that place. This impressive community boasts luxury living, a range of dining and entertainment options, and urban luxury living.";

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const location = {
    name: [
      i18n.language === "en"
        ? property?.propertyDetails?.title
        : property?.propertyDetails?.title_ar,
      property?.propertyDetails?.location?.city,
      property?.propertyDetails?.location?.country,
    ]
      .filter(Boolean)
      .join(", "),
    description: property?.propertyDetails?.propertyOverview
      ? truncateText(
        property.propertyDetails.propertyOverview,
        defaultDescription.length
      )
      : defaultDescription,
    lat: property?.propertyDetails?.googleLocation?.latitude || "0", // Example latitude
    lng: property?.propertyDetails?.googleLocation?.longitude || "0", // Example longitude
  };

  return (
    <Box style={boxStyle}>
      <Box sx={{ padding: "20px !important" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "center",
          }}
          mb={1}
        >
          <LocationOnIcon />
          <Typography variant="h4" color="primary" textAlign="center">
            {t("property_details.location")}
          </Typography>
        </Box>
        <Typography variant="h6" color="primary">
          {location?.name ? location.name.length > 30 ? `${location.name.slice(0, 30)}...` : location.name : ""}
        </Typography>

      </Box>

      {/* Embedded Google Map using Iframe */}
      <iframe
        style={containerStyle}
        src={`https://www.google.com/maps?q=${location?.lat},${location?.lng}&hl=es;z=14&output=embed`}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </Box>
  );
};

export default LocationItem;
