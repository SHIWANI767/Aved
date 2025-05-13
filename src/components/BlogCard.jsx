import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import moment from "moment";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

const style = {
  box: {
    border: "1px solid #E2E8F0",
    minHeight: {
      xs: 250, // Extra Small Screens (mobile)
      sm: 280, // Small Screens
      md: 550, // Medium Screens
      lg: 480, // Large Screens
    },
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  },
};
export default function ImgMediaCard({ blogData }) {
  console.log("This is the blogData", blogData);
  const { t } = useTranslation();
  const stripHtmlTags = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "").trim(); // Removes HTML tags but keeps text formatting
  };

  return (
    <Card sx={{ ...style.box }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="230"
        image={blogData?.addBlogImage}
      />

      <CardContent sx={{ ...style.cardContentBox }}>
        <Box
          className="displayRow"
          marginTop="-10px"
          mb={1.5}
          sx={{ gap: "5px", justifyContent: "space-between" }}
        >
          <Typography variant="body3" color="primary" fontWeight="bold">
            {i18n.language === "en"
              ? blogData?.authorName
              : blogData?.authorName_ar || "--"}
          </Typography>
          <Typography variant="body3" color="primary" className='outfitFonts' fontWeight="bold">
            {moment(blogData?.createdAt).format("MMMM D, YYYY") || "--"}
          </Typography>
        </Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {i18n.language === "en"
            ? blogData?.blogTitle || "--"
            : blogData?.blogTitle_ar || "--"}
        </Typography>

        <Typography variant="body3" color="primary">
          {(() => {
            const plainText = stripHtmlTags(
              i18n.language === "en"
                ? blogData?.blogDescription
                : blogData?.blogDescription_ar || ""
            );
            const maxLength = window.innerWidth < 901 ? 190 : 280; // Inline condition based on screen width
            return plainText.length > maxLength
              ? `${plainText.substring(0, maxLength)}...`
              : plainText;
          })()}
        </Typography>
      </CardContent>
    </Card>
  );
}
