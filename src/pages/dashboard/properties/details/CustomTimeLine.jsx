import React from "react";
import { Box, Typography } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { motion } from "framer-motion";
import moment from "moment";

// Import Icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Completed
import HourglassTopIcon from "@mui/icons-material/HourglassTop"; // Active
import PendingActionsIcon from "@mui/icons-material/PendingActions"; // Upcoming
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const getStageColor = (date) => {
  const today = moment().startOf("day");
  const stageDate = moment(date).startOf("day");

  if (stageDate.isBefore(today)) return "#25826A"; // Completed (Green)
  if (stageDate.isSame(today)) return "#007bff"; // Active (Blue)
  return "#ccc"; // Upcoming (Gray)
};

const getStageIcon = (date) => {
  const today = moment().startOf("day");
  const stageDate = moment(date).startOf("day");

  if (stageDate.isBefore(today))
    return <CheckCircleIcon sx={{ color: "white", fontSize: 18 }} />;
  if (stageDate.isSame(today))
    return <HourglassTopIcon sx={{ color: "white", fontSize: 18 }} />;
  return <PendingActionsIcon sx={{ color: "white", fontSize: 18 }} />;
};

const CustomTimeLine = ({ property }) => {
  // Filter out invalid stage (Stage 6)
  const validStages = property.filter((item) => item.stage !== "Stage 6");
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        boxShadow:
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        background: "#fff",
        padding: "20px 20px 15px 20px",
        marginBottom: "20px",
      }}
    >
      {/* Title Section */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Typography variant="h3" color="primary">
          {t("property_details.investmentTimeline")}
        </Typography>
      </Box>

      {/* Timeline Component */}
      <Timeline sx={{ padding: "6px 0" }}>
        {validStages.map((event, index) => {
          const currentColor = getStageColor(event.date);
          const nextStage = validStages[index + 1];
          const nextColor = nextStage ? getStageColor(nextStage.date) : "#ccc";

          return (
            <TimelineItem key={index}>
              {/* Prevents extra blank space */}
              <TimelineOppositeContent sx={{ flex: 0, padding: "6px 0" }} />

              <TimelineSeparator>
                {/* Animated Dot */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <TimelineDot
                    sx={{
                      backgroundColor: currentColor,
                      width: 18,
                      height: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getStageIcon(event.date)}
                  </TimelineDot>
                </motion.div>

                {/* Connector Line with Dynamic Color */}
                {index !== validStages.length - 1 && (
                  <TimelineConnector
                    sx={{ backgroundColor: nextColor, height: 50 }}
                  />
                )}
              </TimelineSeparator>

              {/* Event Content */}
              <TimelineContent>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Typography variant="h5" color={currentColor}>
                    {i18n.language === "en"
                      ? event.stage
                      : event.stage_ar || event.stage}
                    :
                    {i18n.language === "en"
                      ? event.name
                      : event.name_ar || event.name}
                  </Typography>
                  <Typography variant="title1" color="secondary" className="outfitFonts" mt={1}>
                    {moment(event.date).format("DD MMM YYYY")}
                  </Typography>
                </motion.div>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
};

export default CustomTimeLine;
