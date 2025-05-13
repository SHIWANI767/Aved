import React, { useState } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useTranslation } from "react-i18next";

const boxStyle = {
  border: "1px solid #E2E8F0",
  borderRadius: "12px",
  boxShadow:
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  overflow: "hidden",
  padding: "20px",
  background: "#fff",
  textAlign: "center",
};

const documentStyle = (isHighlighted) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: isHighlighted ? "2px solid #25826A" : "1px solid #E2E8F0",
  boxShadow: isHighlighted ? "0 0 10px rgba(37,130,106,0.3)" : "none",
  backgroundColor: isHighlighted ? "rgba(37,130,106,0.1)" : "#f9f9f9",
  color: isHighlighted ? "#25826A" : "#A0AEC0",
  fontWeight: isHighlighted ? "bold" : "normal",
  cursor: "pointer !important",
  overflow: "hidden",
});

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

export default function DocumentsSection({ property }) {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const showSeeMoreButton = property.length > 3;
  const visibleDocs = showAll ? property : property.slice(0, 3);

  const handleDownload = (url, index) => {
    if (!url) {
      console.error("Document URL is missing!");
      return;
    }

    // Open in a new tab
    const newTab = window.open(url, "_blank");
    if (newTab) {
      newTab.opener = null;
    }

    // Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Document_${index + 1}.pdf`); // Generic filename
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={boxStyle}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
        }}
        mb={1}
        mt={2}
      >
        <AssignmentTurnedInIcon />
        <Typography variant="h4" color="primary" textAlign="center">
          {t("property_details.documents")}
        </Typography>
      </Box>
      <Typography variant="body3" color="secondary">
        {t("property_details.confidentialPropertyDocuments")}
      </Typography>
      <Box mt={2}>
        {visibleDocs.map((url, index) => (
          <Paper
            key={index}
            sx={documentStyle}
            onClick={() => handleDownload(url, index)}
            style={{ cursor: "pointer" }}
          >
            <CloudDownloadIcon fontSize="small" />
            <Typography variant="body3">
              {t("property_details.download")} :{" "}
              {t("property_details.document")} {index + 1}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Show the "See More" button only if there are more than 3 documents */}
      {showSeeMoreButton && (
        <Button onClick={() => setShowAll(!showAll)} sx={buttonStyle}>
          {showAll ? t("property_details.seeLess") : t("property_details.seeMore")}
        </Button>
      )}
    </Box>
  );
}
