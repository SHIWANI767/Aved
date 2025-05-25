import HomeLayout from "@/layout/HomeLayout";
import { Grid, Container, Box, styled, Typography } from "@mui/material";
import BlogCard from "./BlogCard";

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
    [theme.breakpoints.down("sm")]: {
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

export default function Blog() {
  return (
    <AboutUSBox>
      <Box className="aboutBannerImage">
        <Container style={{ position: "relative", zIndex: "999" }}>
          <Box className="headingBox">
            <Typography variant="h1" color="#fff">
              Blog
            </Typography>
          </Box>

          <Box
            className=" displaySpacebetween"
            style={{ alignItems: "end",flexWrap:"wrap" }}
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
                Blog
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {blogData.map((blog, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <BlogCard
                image={blog.image}
                title={blog.title}
                date={blog.date}
                description={blog.description}
                slug={blog.slug}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </AboutUSBox>
  );
}

Blog.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
