import React, { useState } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import Accordions from "@/components/Accordions";
import { useTranslation } from "react-i18next";

const StyledFaqSection = styled(Box)(({ theme }) => ({
    background:"#F8F9FB",
  padding:"50px 0 80px",
  "& .descriptionbox": {
    marginBottom: "40px",
  },
  "& .faqMainBox": {
    "& .heading": {
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.6)",
    },
    "& .description": {
      fontWeight: 400,
      color: "#FFF",
    },

    "& .custumContainerBox": {
      // maxWidth: "768px",
    },
  },
}));

const FaqManin = () => {
  const { t } = useTranslation();

  const accordionData = [
    {
      id: 1, // Add unique id
      question: t("faq_section.set1.question"),
      answer: t("faq_section.set1.answer"),
    },
    {
      id: 2,
      question: t("faq_section.set2.question"),
      answer: t("faq_section.set2.answer"),
    },

    {
      id: 5,
      question: t("faq_section.set3.question"),
      answer: t("faq_section.set3.answer"),
    },
    {
      id: 5,
      question: t("faq_section.set4.question"),
      answer: t("faq_section.set4.answer"),
    },
    {
      id: 5,
      question: t("faq_section.set5.question"),
      answer: t("faq_section.set5.answer"),
    },
  ];
  // State to track the currently expanded accordion index
  const [expandedIndex, setExpandedIndex] = useState(0); // Default to the first accordion being open

  const toggleAccordion = (index) => {
    // If the clicked accordion is already open, close it. Otherwise, open it.
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <StyledFaqSection>
      <Container maxWidth="md" className="custumContainerBox">
        <Box align="center" className="descriptionbox">
          <ScrollAnimation animateIn="zoomIn" style={{ width: "100%" }}>
            <Typography variant="h2" color="primary" mt={1}>
              {t("faq_section.title")}
            </Typography>
          </ScrollAnimation>
        </Box>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            {accordionData.map((data, index) => (
              <ScrollAnimation
                animateIn="slideInDown"
                delay={index * 300}
                style={{ width: "100%" }}
              >
                <Accordions
                  key={index}
                  data={data}
                  index={index}
                  expandedIndexes={[expandedIndex]} // Pass the currently expanded index as an array
                  toggleAccordion={toggleAccordion}
                />
              </ScrollAnimation>
            ))}
          </Grid>
        </Grid>
        <Box align="center" mt={2}>
          <Button variant="contained" color="secondary">
            Read more
          </Button>
        </Box>
      </Container>
    </StyledFaqSection>
  );
};

export default FaqManin;
