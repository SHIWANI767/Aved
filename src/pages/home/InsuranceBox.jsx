import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";
import ScrollAnimation from "react-animate-on-scroll";
import { styled } from "@mui/system";
import { getAPIHandler } from "@/api-services/service";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const InsuranceBox = styled(Box)(({ theme }) => ({
  marginTop: "16px",
  "& .responsive-box": {
    color: "#000",
    padding: "10px",
    paddingTop: "25px",
    paddingBottom: "25px",
    border: "1px solid #25826a",
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",

    // Media query for smaller screens (below 1024px)
    "@media (max-width: 1024px)": {
      flexDirection: "column", // Stack the items vertically on smaller screens
    },
  },
  "&responsiveConatiner": {
    "@media (max-width: 1024px)": {
      paddingLeft: "100px",
      paddingRight: "100px",
    },
    "@media (max-width: 1440px)": {
      paddingLeft: "100px",
      paddingRight: "100px",
    },
  },
}));

export default function Insurance() {
  const { t } = useTranslation();

  const [blogs, setBlogs] = useState([]);

  const getBlog = async () => {
    try {
      const response = await getAPIHandler({
        endPoint: "getBlogDataWeb",
        query: { limit: 3 },
      });
      if (response?.data?.responseCode === 200) {
        setBlogs(response?.data?.result?.docs || []);
      } else {
        console.log("Something went wrong");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  const extractFirstParagraph = (htmlString) => {
    if (!htmlString) return "";

    // Parse HTML string into a DOM structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Try to extract from <p> first
    let firstParagraph = doc.querySelector("p")?.textContent.trim();

    // If <p> is empty, try extracting from <li>
    if (!firstParagraph) {
      firstParagraph = doc.querySelector("li")?.textContent.trim() || "";
    }

    console.log(firstParagraph);
    return firstParagraph;
  };
  return (
    <Container maxWidth={"lg"}>
      <InsuranceBox>
        <Box className="responsiveConatiner" mt={17} mb={10}>
          <ScrollAnimation animateIn="slideInLeft">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              mb={4}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <Grid item>
                  <Box
                    sx={{
                      width: "82px",
                      height: "2px",
                      backgroundColor: "#25826a",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography fontSize="19px" color="#25826a" fontWeight="600">
                    {t("market_insights.title")}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="h2">
                {t("market_insights.description")}
              </Typography>
            </Box>
          </ScrollAnimation>

          <ScrollAnimation animateIn="slideInRight">
            <Grid container spacing={3} justifyContent="center">
              {blogs.length === 0 ? (
                <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'25px',  img: { height: { xs: '150px', sm: '250px' } } }}>
                  <img src='/images/comingSoon.png' alt='comingSoon'/>
                </Box>
              ) : (
                blogs.map((card) => (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={card.id}>
                    <Box className="responsive-box">
                      <Box
                        sx={{
                          backgroundColor: "#25826a",
                          color: "#ffff",
                          textAlign: "center",
                          p: 1,
                          paddingTop: { xs: "16px", sm: "19px", md: "19px" },
                          paddingBottom: { xs: "16px", sm: "19px", md: "19px" },
                          width: { xs: "20%", sm: "26%", md: "30%" },
                        }}
                      >
                        <Typography
                          fontSize="40px"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {new Date(card?.createdAt)
                            .getDate()
                            .toString()
                            .padStart(2, "0")}
                        </Typography>
                        <Typography fontSize="16px">
                          {new Date(card?.createdAt).toLocaleString("en-US", {
                            month: "short",
                          })}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          variant="subTitle2"
                          fontWeight="bold"
                          color="#003a37"
                          gutterBottom
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                          }}
                        >
                          {i18n.language === "en"
                            ? card.blogTitle
                            : card.blogTitle_ar}
                        </Typography>
                        <Typography
                          variant="body3"
                          fontWeight="500"
                          color="#505050"
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                          }}
                        >
                          {i18n.language === "en"
                            ? extractFirstParagraph(card?.blogDescription)
                            : extractFirstParagraph(card?.blogDescription_ar)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      component="img"
                      src={card.addBlogImage}
                      alt="Business meeting"
                      sx={{ width: "100%", height: "40vh" }}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </ScrollAnimation>
        </Box>
      </InsuranceBox>
    </Container>
  );
}
