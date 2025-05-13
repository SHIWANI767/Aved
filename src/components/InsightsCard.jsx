import {
  Box,
  Button,
  Paper,
  Typography,
  styled,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import React from "react";
const MainComponent = styled("Box")(({ theme }) => ({
  "& .mainCardBox": {
    "& .insightsBox": {
      borderRadius: "20px",
      flexDirection: "column",
      padding: "40px",
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

    "& .insightImageBox": {
      height: "60px",
      "& img": {
        position: "relative",
        top: "0px",
        padding: "5px",
        width: "100%",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat !important",
        objectFit: "cover !important",
        maxWidth: "60px",
      },
    },
  },
}));
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "" : "red",
  },
}));
export default function InsightsCard({ data }) {

  return (
    <MainComponent>
      <Box className="mainCardBox">
        <Box
          className={`insightsBox displayCenter`}
          style={{ background: `${data.backgroundColorCode}` }}
        >
          <Box className="insightImageBox">
            <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src={data.centerImg} alt="centerImg" width="100%" />
          </Box>
          <Typography variant="body2">
            {data.text1 ? data.text1 : "N/A"}
          </Typography>
          <Typography variant="h4">
            {data.text2 ? data.text2 : "N/A"}
          </Typography>
          <Box
            mt={2}
            sx={{
              "& .css-sum3i5-MuiLinearProgress-root.MuiLinearProgress-colorPrimary":
                {
                  minWidth: "200px",
                  width: "100%",
                  height: "20px",
                },
              "& .css-1x9r62b-MuiLinearProgress-bar1": {
                backgroundColor: `${data.linearProgressColor}`,
              },
              "& .css-sum3i5-MuiLinearProgress-root": {
                backgroundColor: `${data.linearProgressBackgroundColor} !important`,
              },
            }}
          >
            <BorderLinearProgress variant="determinate" value={data?.status} />
          </Box>
        </Box>
      </Box>
    </MainComponent>
  );
}
InsightsCard.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
