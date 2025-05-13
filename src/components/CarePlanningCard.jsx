import { Box, Button, Paper, Typography, styled } from "@mui/material";
import React from "react";
import { BsArrowRight, BsFillShareFill, BsUpload } from "react-icons/bs";

const MainComponent = styled("Box")(({ theme }) => ({
  "& .mainCardBox": {
    "& .carePlanningBox": {
      background: "#fff",
      borderRadius: "20px",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.08)",
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
      margin: "8px 0px",
      color: "#161E29",
      fontWeight: 500,
    },
    "& .contentBox": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "16px",
    },
    "& p": {
      color: "var(--style, rgba(22, 30, 41, 0.60))",
      fontWeight: 300,
    },
  },
}));
export default function CarePlanningCard({ data }) {
  return (
    <MainComponent>
      <Box className="mainCardBox">
        <Box className="carePlanningBox">
          <Box
            className={`backgroundImage displayCenter`}
            style={{ background: `url(${data.backgroundImg})` }}
          >
            <Box>
              <img
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
                src={data?.centerImg ? data?.centerImg : ""}
                alt="centerImg"
                width="100%"
              />
            </Box>
          </Box>
          <Box className="contentBox">
            <Typography variant="h6">
              {data?.text1 ? data?.text1 : "N/A"}
            </Typography>
            <Typography variant="body1">
              {data?.text2 ? data?.text2 : "N/A"}
            </Typography>
            <Button
              style={{ margin: "20px 0px" }}
              variant="outlined"
              color="secondary"
              endIcon={<BsArrowRight />}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
    </MainComponent>
  );
}
CarePlanningCard.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
