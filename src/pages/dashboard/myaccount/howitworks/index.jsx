import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import { Box, Container, Typography } from "@mui/material";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import NoDataFound from "@/components/NoDataFound";
import CircularProgressBar from "@/components/CircularProgressBar";
import { useTranslation } from "react-i18next";

const style = {
  box: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    padding: "2%",
    mt: 2,
    display: "flex",
    flexDirection: "column",
  },
  video: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginTop: "16px",
  },
};

export default function HowItWorks() {
  const user = useSelector((state) => state.user);
  const [howItWorks, setHowItWorks] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state
  const { t } = useTranslation();

  const getHowitWorks = async () => {
    setLoading(true);
    try {
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getLinks",
        token: user?.userInfo?.token,
      });
      if (res?.data?.responseCode === 200) {
        setHowItWorks(res?.data?.result);
        console.log(res?.data?.result);
      } else {
        console.log("This is my error in else section", res?.data?.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHowitWorks();
  }, []);

  return (
    <Container maxWidth="md">
      {loading ? ( // Show loader when API is loading
        <Box sx={style.loaderBox}>
          <CircularProgressBar color="primary" />
        </Box>
      ) : (
        howItWorks.map((item, index) => (
          <Box sx={style.box} key={index} mb={4}>
            <Typography variant="h3">{t("how_it_works")}</Typography>
            <video src={item?.howItWork} style={style.video} controls></video>
            <Typography variant="h3" mt={4}>
              {t("welcome_tour")}
            </Typography>
            <video src={item?.welcomeTour} style={style.video} controls></video>
          </Box>
        ))
      )}

      {howItWorks.length === 0 && <NoDataFound message="No Data Found" />}
    </Container>
  );
}

HowItWorks.getLayout = function HowItWorks(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
