import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { styled } from "@mui/system";
import HomeLayout from "@/layout/HomeLayout";
import CustomHead from "@/components/CustomHead";
import { useRouter } from "next/router";
// import Page from "src/component/Page";

const CurrentPlanBox = styled("Box")(({ theme }) => ({
  "& .background": {
    height: "calc(100dvh - 172px)",
    "& h1": {
      //   color: "rgba(243, 109, 54, 1)",
      //   textShadow: "0px 0px 2px rgba(65, 22, 67, 1)",
    },
    "& h4": {
      //   color: "rgba(65, 22, 67, 1)",
      //   textShadow: "0px 0px 2px rgba(65, 22, 67, 1)",
      padding: "10px 30px",
    },
  },
  "& .mainBox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
}));

export default function NotFound(props) {
  const router = useRouter();
  return (
    <CurrentPlanBox style={{ marginTop: "" }}>
      <CustomHead
        title="404 - Page Not Found"
        image="/images/FbSizeImage.png"
        video=""
        isVideo={false}
      />
      <Box className={"background"}>
        <Box className={"mainBox"}>
          <Box textAlign="center">
            <Typography variant="h1" align="center">
              Oops!
            </Typography>
            <Typography variant="h1" align="center">
              404 - Page Not Found
            </Typography>
            <Typography variant="h4" align="center">
              Sorry, the page you are looking for could not be found.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.replace("/")}
            >
              Return to Homepage
            </Button>
          </Box>
        </Box>
      </Box>
    </CurrentPlanBox>
  );
}

NotFound.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
