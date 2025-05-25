import HomeLayout from "@/layout/HomeLayout";
import { Box, Container, Typography, Divider, styled } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

// const blogPosts = [
//   {
//     slug: 'buying-your-first-home',
//     title: 'Buying Your First Home: What You Need to Know',
//     date: 'May 10, 2025',
//     image: '/images/Project/pro_1.jpg',
//     content: `
//       Buying your first home can feel overwhelming — but it doesn't have to be.
//       In this guide, we'll cover what to look for, how to finance your purchase,
//       and which common pitfalls to avoid.

//       Start by determining your budget. Then get pre-approved for a mortgage.
//       Work with a reliable real estate agent and explore multiple properties before deciding.

//       Finally, ensure all legal documents are reviewed thoroughly before signing anything.
//     `,
//   },
//   // ...more posts
// ];

const AboutUSBox = styled("Box")(({ theme }) => ({
  "& .aboutBannerImage": {
    zIndex: 1,
    // overflow: "hidden",
    zIndex: "999",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: "url(/images/blog_bg.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
  },
  "& .headingBox": {
    // paddingBottom: "150px",
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
export default function BlogDetail() {
  const router = useRouter();

  return (
    <>
      <AboutUSBox>
        <Box className="aboutBannerImage">
          <Container style={{ position: "relative", zIndex: "999" }}>
            <Box className="headingBox">
              <Typography variant="h1" color="#fff">
                Recent Articles
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
                  Blog Details
                </Typography>
              </Box>

              <Typography
                variant="h3"
                color="#FFFFFF99"
                style={{ maxWidth: "400px" }}
              >
                Whether you’re building, remodeling, buying, or selling, we
                bring seamless project execution under one roof.
              </Typography>
            </Box>
          </Container>
        </Box>
      </AboutUSBox>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          19 May 2024
        </Typography>
        <Typography variant="h3" color="#5c4d44" fontWeight="bold" gutterBottom>
          AVED’s Approach to Innovating in Community-Centric Design
        </Typography>

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 400,
            borderRadius: 2,
            overflow: "hidden",
            my: 3,
          }}
        >
          <Image
            //   src={blog.image}
            src="/images/Project/pro_1.jpg"
            //   alt={blog.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 600px) 100vw, 100vw"
          />
        </Box>

        <Typography
          variant="body2"
          color="#000000ad"
          sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
        >
          {/* {blog.content} */}
          AVED stands out in the real estate development industry with its
          commitment to community-centric design, prioritizing the needs of the
          neighborhoods it serves. In this article, we delve into AVED's
          innovative approach, explore its impactful projects, and emphasize the
          importance of community engagement in curating a thriving living
          environment.
        </Typography>

        <Typography variant="h5" color="#5c4d44" fontWeight="600" mt={2} mb={2}>
          AVED's Approach to Designing Thriving Communities
        </Typography>

        <Typography
          variant="body2"
          color="#000000ad"
          sx={{ whiteSpace: "pre-line", lineHeight: 1.8 }}
        >
          AVED's philosophy is deeply rooted in inclusivity, sustainability, and
          efficiency. Through collaborative partnerships, AVED ensures that its
          designs surpass community expectations by understanding their unique
          needs and adapting to meet them. They meticulously study the local
          environment, population, and dynamics to ensure that each project has
          a positive impact on the community. This approach empowers AVED to
          develop residential communities that align with the needs and
          aspirations of residents, effectively enhancing their quality of life.
        </Typography>
        <Divider sx={{ my: 4 }} />
      </Container>
    </>
  );
}

BlogDetail.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
