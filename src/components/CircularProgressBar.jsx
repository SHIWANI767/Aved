import { Box, CircularProgress, Typography, styled } from "@mui/material";
import React from "react";

const MainComponent = styled("Box")(() => ({
  "& .mainCardBox": {
    "& .mainEllipseBox": {
      position: "relative",
      background: `url('/images/backEllipse.png')`,
      width: "100%",
      maxWidth: "208px",
      padding: "30px",
    },
    "& .ellipseBox": {
      position: "relative",
      background: `url('/images/progressEllipse.png')`,
      width: "100%",
      padding: "40px 0px",
      maxWidth: "150px",
      backgroundSize: "cover !important",
      backgroundRepeat: "no-repeat !important",
      objectFit: "cover !important",
      "& h4": {
        color: "#161E29",
        fontWeight: "600",
      },
      "& p": {
        color: "rgba(22, 30, 41, 0.60)",
        fontWeight: "400",
      },
    },
  },
}));
export default function CircularProgressBar({ data }) {
  return (
    <MainComponent>
      <Box className="mainCardBox">
        <Box className="displayCenter" mt={3} mb={3}>
          <Box sx={{ position: "absolute" }}>
            <CircularProgress
              sx={{
                color: "#7A69FE",
                left: "422",
              }}
              size={208}
              thickness={3}
              variant="determinate"
              value={75}
            />
          </Box>
          <Box className={`mainEllipseBox`}>
            <Box className={`ellipseBox displayCenter`}>
              <Box className="displayColumn">
                <Typography variant="h4">75%</Typography>
                <Typography variant="body2">of 100% total</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </MainComponent>
  );
}
CircularProgressBar.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
