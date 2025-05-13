import Accordions from "@/components/Accordions";
import { Box, Grid, Container, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { accordianData } from "@/data";
import { useRouter } from "next/router";

const StyledFaqSection = styled("Box")(({ theme }) => ({
  "& .faqMainBox": {
    "& .heading": {
      fontWeight: 500,
      color: "rgba(255, 255, 255, 0.6)",
    },
    "& .descriptionbox": {
      marginBottom: "100px",
    },
    "& .description": {
      fontWeight: 400,
      color: "#FFF",
    },
    "& .blogmainBox1": {
      padding: "0px 0 80px",
      marginTop: "50px",
    },
  },
}));

export default function FaqCommonCom() {
  const router = useRouter();
  const faqListPath = location.pathname === "/static/list-faq";
  const checkFaqDataArray = faqListPath
    ? accordianData
    : (accordianData && accordianData.slice(0, 5)) || [];
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => {
    setExpanded(expanded === panel ? false : panel); // Toggle accordion open/close
  };
  return (
    <StyledFaqSection>
      <Container className="rotaeBox marginTopSection">
        <Box mb={3}>
          <Typography
            variant="h2"
            color="primary"
            className="headerText"
            mb={5}
            style={{ textAlign: "center" }}
          >
            FREQUENTLY ASKED QUESTIONS
          </Typography>
        </Box>
        <Box className="faqMainBox" mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              {checkFaqDataArray.map((item) => (
                <Accordions
                  key={item.id}
                  data={item}
                  index={item}
                  expanded={expanded}
                  handleChange={handleChange}
                />
              ))}
            </Grid>
          </Grid>
          {!faqListPath && accordianData?.length > 5 && (
            <Box align="end">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => router.push("/static/list-faq")}
              >
                View More
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </StyledFaqSection>
  );
}
