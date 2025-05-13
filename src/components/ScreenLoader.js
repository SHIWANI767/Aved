import { Box, CircularProgress, styled } from "@mui/material";
import React from "react";
// import Loader from "react-js-loader";

const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  height: "100%",
  width: "100%",
  zIndex: "999",
  position: "absolute",
  top: "0",
  left: "0",
  "&::before": {
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    content: "' '",
    position: "absolute",
    backdropFilter: "blur(3px)",
  },
}));
export default function ScreenLoader() {
  return (
    <MainBox>
      <CircularProgress
        sx={{
          color: "#7A69FE",
          left: "422",
        }}
        size={208}
        thickness={3}
        variant="determinate"
        // value={75}
        // type="spinner-circle"
        // bgColor={"#fff"}
        // // title={"Loading..."}
        // color={"#fff"}
        // size={100}
      />
    </MainBox>
  );
}
