import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { IoAdd } from "react-icons/io5";
import i18n from "@/i18n";
import { IoMdClose } from "react-icons/io";

import { Paper, Box, Typography, useTheme } from "@mui/material";

const Accordions = ({ data, index, expandedIndexes, toggleAccordion }) => {
  const theme = useTheme(); // Access Material-UI theme
  const { question, answer } = data;

 const currentLang =  i18n.language;

  const styles = {
    mainBox: {
      borderRadius: "20px",
      padding: "0px !important",
      boxShadow: "0px 0px 17px 0px rgba(0, 0, 0, 0.09)",
    },
    accordionStyle: {
      borderRadius: "20px",
      background: "rgba(31, 43, 21, 1)",
      boxShadow: "none",
      "@media(max-width:767px)": {
        padding: "0px !important",
      },
    },
    accordionQues: {
      fontFamily: '"Raleway", serif',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: "25px",
      color: "rgba(0, 0, 0, 1)",
      "@media(max-width:420px)": {
        fontSize: "15px",
      },
    },
    accordionAns: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "30px",
      fontFamily: '"Raleway", serif',
      textAlign: currentLang ==="en" ? "left" : "right",
      color: "rgba(106, 106, 106, 1)", // Updated to theme color

      "& ol": {
        marginLeft: "-22px",
      },
    },
    accordionSummaryContent: {
      margin: "0",
      fontSize: "16px",
      fontWeight: 600,
      textAlign: "left",
      lineHeight: "25px",
      color: "rgba(0, 0, 0, 1)",
      "@media(max-width:767px)": {
        lineHeight: "20px",
      },
    },
  };

  return (
    <Paper elevation={1} sx={styles.mainBox} component={Box} mb={1.4}>
      <Box className="faqmainBox">
        <Accordion
          sx={styles.accordionStyle} // Updated to use sx
          expanded={expandedIndexes.includes(index)} // Check if this index is in expandedIndexes array
          onChange={() => toggleAccordion(index)} // Toggle accordion state
        >
          <AccordionSummary
            expandIcon={
              expandedIndexes.includes(index) ? (
                <img
                  src="/images/faq_less.svg"
                  alt="Image"
                  width="18px"
                  height="18px"
                /> // Minus icon for expanded state
              ) : (
                <img
                  src="/images/faq_more.svg"
                  alt="Image"
                  width="18px"
                  height="18px"
                /> // Plus icon for collapsed state
              )
            }
            aria-controls={`panel${index}-content`} // Unique aria controls per accordion
            id={`panel${index}-header`} // Unique ID per accordion
            sx={styles.accordionQues} // Updated to use sx
          >
            <Typography
              variant="h6"
              color="primary" // Hardcoded color can be replaced with theme color if needed
              sx={styles.accordionSummaryContent}
            >
              {question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={styles.accordionAns} // Updated to use sx
              dangerouslySetInnerHTML={{ __html: data.answer }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
};

export default Accordions;
