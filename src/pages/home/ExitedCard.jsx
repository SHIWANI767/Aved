import React from "react";
import { Box, Typography, Paper, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const ExitedCard = ({ data }) => {
  const { t } = useTranslation();
  console.log(data.photos[0]);

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
  const overviewText = i18n.language === "en"
  ? extractFirstParagraph(data?.propertyOverview)
  : extractFirstParagraph(data?.propertyOverview_ar);
  return (
    <Paper
      elevation={3}
      sx={{
        position: "relative",
        height: "50vh",
        borderRadius: "16px",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Full Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${data?.photos[0]})`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      ></Box>

      {/* Content Section (25% Height) */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "8px",
          right: "8px",
          height: "28%",
          background: "hsla(0, 1.60%, 12.00%, 0.60)",
          backdropFilter: "blur(3px)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: "0 16px 20px 16px",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "0px",
        }}
      >
        {/* Payment Plan Tag */}
        <Box
          sx={{
            position: "absolute",
            top: "-22px",
            right: "0px",
            backgroundColor: "#f2c94c",
            color: "#000",
            padding: "4px 8px",
            borderRadius: "8px 8px 0 0 ",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {`${new Date(data?.endDate).toLocaleDateString("en-US")} End Date`}
        </Box>

        <Box>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              color: "#fff",
              marginBottom: "4px",
            }}
          >
            {i18n.language === "en"
              ? data?.title
              : data?.title_ar}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body3"
            sx={{
              fontSize: "12px",
              color: "#ccc",
            }}
          >
            From SAR
          </Typography>

          {/* Price */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              marginTop: "4px",
            }}
          >
            {data?.propertyPrice?.toLocaleString("en-US")}
          </Typography>

          {/* Developer Info */}
          <Tooltip title={overviewText} arrow placement="top">
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px",
                color: "#ccc",
                marginTop: "2px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // Limits to 2 lines before adding "..."
                overflow: "hidden",
              }}
            >
{overviewText}
            </Typography>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};

export default ExitedCard;
