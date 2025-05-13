import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  Paper,
  Container,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
const Testimonials = () => {
  const style = {
    box: {
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
    },
  };
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          flexGrow: 1,

          mt: 20,
          mb: 20,
        }}
      >
        <Grid
          container
          spacing={1}
          alignItems="center"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Grid item xs={12} md={12}>
            <Grid container alignItems="center" spacing={1}>
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
                  Our Testimonials
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={12}>
            <Box
              display="flex"
              gap={2} // Adjust the gap between items
              flexDirection={{ xs: "column", md: "row" }} // Stack vertically on small screens, row on medium and larger
              alignItems={{ xs: "flex-start" }} // Align items to the start on small screens, center on larger screens
            >
              <Typography
                variant="h2"
                color="#23222a"
                sx={{
                  width: { xs: "100%", md: "45%" }, // Full width on small screens, 50% on medium and larger
                  marginBottom: { xs: 2, md: 0 }, // Add bottom margin only on small screens
                }}
              >
                What People Say About Our Company.
              </Typography>

              <Typography
                variant="body3"
                sx={{
                  width: { xs: "100%", md: "45%" }, // Full width on small screens, 45% on medium and larger
                  color: "#505050",
                  marginBottom: 0, // Remove bottom margin
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" mt={3}>
          <Grid item xs={12} md={5.5}>
            <Box
              sx={{
                ...style.box,
                mb: 2,
                p: 2,
                filter: "drop-shadow(0px 1px 25.5px rgba(0, 0, 0, 0.11))",
              }}
            >
              <Typography variant="h4" fontWeight={600}>
                SB Shinur Islam
              </Typography>
              <Typography variant="h6" color="#505050">
                CEO Transport Ltd.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <StarIcon style={{ color: "#25826a" }} />
                <StarIcon style={{ color: "#25826a" }} />
                <StarIcon style={{ color: "#25826a" }} />
                <StarIcon style={{ color: "#25826a" }} />
                <StarIcon style={{ color: "#25826a" }} />
              </Box>

              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  color: "text.secondary",
                  paddingLeft: 2,
                  color: "#505050",
                  borderLeft: "1px solid #25826a",
                  lineHeight: "25px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                tempor incididunt ut labore et dolore
              </Typography>
            </Box>
            <Box
              sx={{
                ...style.box,
                mb: 2,
                mt: 4,
                p: 2,
                filter: "drop-shadow(0px 1px 25.5px rgba(0, 0, 0, 0.11))",
              }}
            >
              <Typography variant="h4" fontWeight={600}>
                SB Shinur Islam
              </Typography>
              <Typography variant="h6" color="#505050">
                CEO Transport Ltd.
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <StarIcon style={{ color: "#25826a" }} />
                <StarIcon style={{ color: "#25826a" }} />
                <StarIcon style={{ color: "#25826a" }} />
                <StarIcon style={{ color: "#25826a" }} />
                <StarIcon style={{ color: "#25826a" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  mt: 1,
                  color: "text.secondary",

                  paddingLeft: 2,
                  color: "#505050",
                  borderLeft: "1px solid #25826a",
                  lineHeight: "25px",
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                tempor incididunt ut labore et dolore
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6.5}>
            <Box sx={{ position: "relative" }}>
              <img
                src="./images/testimonial.png"
                alt="Happy Customers"
                style={{ width: "100%" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  backgroundColor: "#25826a",
                  color: "#fff",
                  px: 2,
                  py: 1,
                  padding: "20px 11px 24px",

                  // borderRadius: "4px",
                  fontWeight: "bold",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -20, // Adjusted distance for bigger triangle
                    left: "50%",
                    transform: "translateX(80%)", // Center the triangle
                    width: 0,
                    height: 0,
                    borderLeft: "20px solid transparent", // *Increased size*
                    borderRight: "20px solid transparent", // *Increased size*
                    borderTop: "20px solid #25826a", // *Increased size*
                  },
                }}
              >
                <Typography>
                  <span style={{ fontSize: "24px", fontWeight: "600" }}>
                    1000+{" "}
                  </span>
                  <span style={{ fontSize: "20px", display: "block" }}>
                    Happy Customers
                  </span>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Testimonials;
