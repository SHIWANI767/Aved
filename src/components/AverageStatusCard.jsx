import { Box, Button, Paper, Typography, styled } from "@mui/material";
import React from "react";

const MainComponent = styled("Box")(({ theme }) => ({
  "& .mainCardBox": {
    "& .averageStatusBox": {
      borderRadius: "20px",
      flexDirection: "column",
      padding: "20px",
    },
    "& h4": {
      color: "#161E29",
      fontWeight: 600,
    },
    "& p": {
      color: "rgba(22, 30, 41, 0.75)",
      fontWeight: 400,
      marginTop: "8px",
    },
    "& .imageBox": {
      height: "80px",
      "& img": {
        position: "relative",
        top: "0px",
        padding: "5px",
        width: "100%",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat !important",
        objectFit: "cover !important",
        maxWidth: "80px",
      },
    },
  },
}));
export default function AverageStatusCard({ data }) {
  return (
    <MainComponent>
      <Box className="mainCardBox">
        <Box
          className={`averageStatusBox displayCenter`}
          style={{ background: `${data.backgroundColorCode}` }}
        >
          <Box className="imageBox">
            <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src={data.centerImg} alt="centerImg" />
          </Box>
          <Typography variant="body2">
            {data.text1 ? data.text1 : "N/A"}
          </Typography>
          <Typography variant="h4">
            {data.text2 ? data.text2 : "N/A"}
          </Typography>
        </Box>
      </Box>
    </MainComponent>
  );
}
AverageStatusCard.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
