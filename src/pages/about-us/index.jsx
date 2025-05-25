import React, { useState, useEffect } from "react";
import HomeLayout from "@/layout/HomeLayout";
import { Container, Typography, Box, styled } from "@mui/material";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Description from "./Description";
import Client from "../home/Client";
import VisionMissionSection from "./VisionMissionSection";
import Team from "./Team";
import WhychooseUs from "./WhychooseUs";

const AboutUSBox = styled("Box")(({ theme }) => ({
  "& .aboutBannerImage": {
    zIndex: 1,
    // overflow: "hidden",
    zIndex: "999",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: "url(/images/About/about-bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },
  "& .headingBox": {
    paddingBottom: "150px",
    paddingTop: "150px",
    [theme.breakpoints.down("sm")]:{
  paddingBottom: "47px",
    paddingTop: "113px",
    },
  },
  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
}));
export default function AboutUS() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const { type } = router.query;
  const fetchAboutUs = async (type) => {
    console.log("kjjkdfkj", user?.userInfo?.token);
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: `viewStaticContent`,
        token: user?.userInfo?.token,
        id: "AboutUs",
      });
      console.log(res);
      if (res?.data?.responseCode === 200) {
        setData(res?.data?.result || {});
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Error while getting About Us data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAboutUs();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <AboutUSBox>
      <Box className="aboutBannerImage">
        <Container style={{ position: "relative", zIndex: "999" }}>
          <Box className="headingBox">
            <Typography variant="h1" color="#fff">
              About us
            </Typography>
          </Box>

          <Box
            className=" displaySpacebetween"
            style={{ alignItems: "end", flexWrap:"wrap" }}
            pb={5}
          >
            <Box className="displayStart" gap="15px">
              <Typography
                variant="h6"
                color="#FFFFFF99"
                sx={{ cursor: "pointer", fontWeight: "600" }}
                onClick={() => router.push("/")}
              >
                Home
              </Typography>

              <Typography
                variant="h6"
                color="#FFFFFF99"
                sx={{ cursor: "pointer", fontWeight: "600" }}
                onClick={() => router.push("/about")}
              >
                About us
              </Typography>
            </Box>

            <Typography
              variant="h3"
              color="#FFFFFF99"
              style={{ maxWidth: "400px" }}
            >
              Whether you’re building, remodeling, buying, or selling, we bring
              seamless project execution under one roof.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Description />
      <VisionMissionSection />
      <Team />

      <WhychooseUs />
      <Client />
    </AboutUSBox>
  );
}
AboutUS.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
