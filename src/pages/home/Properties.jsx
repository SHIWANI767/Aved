import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import AppContext from "@/context/AppContext";
import ScrollAnimation from "react-animate-on-scroll";
import { useRouter } from "next/navigation";
const RulesComponent = styled(Box)(({ theme, color = "#f0f0f0" }) => ({
  "& .botmainBox": {
    marginTop: "70px",
  },
  "& .botheadingText": {
    fontSize: "42px",
    maxWidth: "200px",
    lineHeight: "50px",
    padding: "20px 0",
  },
}));

const data = [
  {
    title: "Marina Residence",
    description: "Marina Residence offers a unique residential ",
    images: "/images/Properties/pro_1.jpg",
    className1: "straIcon1",
  },
  {
    title: "Marina Residence",
    description: "Marina Residence offers a unique residential ",
    images: "/images/Properties/pro_2.jpg",
    className1: "straIcon1",
  },
  {
    title: "Marina Residence",
    description: "Marina Residence offers a unique residential ",
    images: "/images/Properties/pro_3.jpg",
    className1: "straIcon1",
  },
];

export default function Properties() {
  const auth = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    if (auth?.topHeading) {
      auth?.setTopHeading("About");
    }
  }, []);

  return (
    <RulesComponent>
      <Box className="botmainBox main-sectionGap">
        <Container className="">
          <Box align="center" className="subSection">
            <ScrollAnimation animateIn="zoomIn">
              <Typography variant="h2" style={{ textTransform: "uppercase" }}>
                real estate projects
              </Typography>
            </ScrollAnimation>
          </Box>
          <Grid container spacing={3} style={{ position: "relative" }}>
            {data.map((item, index) => (
              <>
                <Grid item xs={12} md={4} key={index}>
                  <ScrollAnimation
                    animateIn="slideInLeft" // Animation type (slide from left)
                    delay={index * 300} // Delay based on index for staggered animation
                    animateOnce={true} // Only animate once when it first comes into view
                  >
                    <Box className="project-post-thumbnail">
                      <img
                        src={item.images}
                        alt="Project"
                        className="scroll-animate"
                      />
                    </Box>

                    <Box className="textContainer" align="center">
                      <ScrollAnimation animateIn="slideInUp">
                        <Tooltip title={item.title} placement="top" arrow>
                          <Typography
                            variant="h3"
                            color="#000"
                            style={{
                              textTransform: "uppercase",
                              fontWeight: "400",
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Tooltip>
                      </ScrollAnimation>
                      <Tooltip title={item.description} placement="top" arrow>
                        <Typography variant="body2" color="#000">
                          {item.description}
                        </Typography>
                      </Tooltip>
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => router.push("/project")}
                        >
                          Read more
                        </Button>
                      </Box>
                    </Box>
                  </ScrollAnimation>
                </Grid>
              </>
            ))}
          </Grid>
        </Container>
      </Box>
    </RulesComponent>
  );
}
