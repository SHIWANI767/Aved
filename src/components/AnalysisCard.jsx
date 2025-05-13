import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

const MainComponent = styled("Box")(({ theme }) => ({
  "& .mainCardBox": {
    "& .shadowBox": {
      background: "#fff",
      borderRadius: "20px",
    },
    "& .backgroundImage": {
      position: "relative",
      top: "0px",
      padding: "30px",
      borderRadius: "20px 20px 0px 0px",
      width: "100%",
      backgroundSize: "cover !important",
      backgroundRepeat: "no-repeat !important",
      objectFit: "cover !important",
    },
    "& h6": {
      margin: "16px 0px",
      color: "#161E29",
      fontWeight: 500,
    },
    "& .contentBox": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "25px",
    },
    "& p": {
      color: "var(--style, rgba(22, 30, 41, 0.60))",
      fontWeight: 300,
    },
  },
}));
export default function AnalysisCard({ data }) {
  return (
    <MainComponent>
      <Box className="mainCardBox">
        <Box className="shadowBox">
          <Box className="contentBox">
            <Typography variant="body2">{data.text}</Typography>
            <Button
              style={{ margin: "20px 0px" }}
              variant="outlined"
              color="secondary"
              endIcon={<BsArrowRight />}
            >
              Satisfaction
            </Button>
          </Box>
        </Box>
      </Box>
    </MainComponent>
  );
}
AnalysisCard.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
