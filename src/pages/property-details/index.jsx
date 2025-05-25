import HomeLayout from "@/layout/HomeLayout";
import { Grid, Container, Box, styled, Typography } from "@mui/material";

import PropertyImageSlider from "./PropertyImageSlider";
import Overview from "./Overview";
import PropertyMediaSection from "./PropertyMediaSection";
import PropertyCarousel from "../project/PropertyCarousel";
import FloorPlanTabs from "./FloorPlanTabs";

const AboutUSBox = styled("Box")(({ theme }) => ({
  "& .aboutBannerImage": {
    zIndex: 1,
    // overflow: "hidden",
    zIndex: "999",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: "url(/images/Project/pro_det.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },
  "& .headingBox": {
    paddingBottom: "90px",
    paddingTop: "150px",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "50px",
      paddingTop: "100px",
    },
  },
  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
}));
const blogData = [
  {
    image: "/images/Project/pro_1.jpg",
    title: "AVED’s Approach ",
    date: "May 10, 2025",
    description:
      "This is a short summary of the first blog post about the latest updates in our product.",
    slug: "first-blog-post",
  },
  {
    image: "/images/Project/pro_1.jpg",
    title: "AVED’s Approach ",
    date: "May 8, 2025",
    description:
      "A quick guide on how developers can improve UI/UX through small but powerful design changes.",
    slug: "design-tips-for-developers",
  },
  {
    image: "/images/Project/pro_1.jpg",
    title: "AVED’s Approach ",
    date: "May 5, 2025",
    description:
      "Understanding the differences between React and Next.js for building modern web apps.",
    slug: "react-vs-nextjs",
  },
  {
    image: "/images/Project/pro_1.jpg",
    title: "Why SEO Matters",
    date: "May 2, 2025",
    description:
      "Explore why SEO is crucial for the success of modern web platforms and how to implement it.",
    slug: "why-seo-matters",
  },
];

export default function PropertyDetails() {
  return (
    <AboutUSBox>
      <Box className="aboutBannerImage">
        <Container style={{ position: "relative", zIndex: "999" }}>
          <Box className="headingBox">
            <Typography variant="h1" color="#fff">
              Property Details
            </Typography>
          </Box>

          <Box
            className=" displaySpacebetween"
            style={{ alignItems: "end", flexWrap: "wrap" }}
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
                onClick={() => router.push("/blog")}
              >
                Property Details
              </Typography>
            </Box>

            <Typography
              variant="h3"
              color="#FFFFFF99"
              style={{ maxWidth: "400px" }}
            >
              Discover all the features, specifications, and highlights of this
              listing.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="lg" className="propert-details">
        <PropertyImageSlider />
        <Overview />
        <PropertyMediaSection />
        <FloorPlanTabs />
        <Box mt={6}>
          <Typography variant="h3" fontWeight={600} gutterBottom mb={3}>
            Related Listings
          </Typography>
          <PropertyCarousel />
        </Box>
      </Container>
    </AboutUSBox>
  );
}

PropertyDetails.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
