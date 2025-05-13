import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout";
import { Box, Container, Grid, Typography } from "@mui/material";
import AvailableProperties from "./AvailableProperties";
import FundedProperties from "./FundedProperties";
import ExitedProperties from "./ExitedProperties";
import { apiRouterCall } from "@/api-services/service";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import KycModal from "@/components/KycModal";

const style = {
  toggleBotton: {
    display: "flex",
    flexDirection: "row",
    border: "1.5px solid #25826A",
    padding: "5px",
    borderRadius: "10px",
    width: "auto",
    alignItems: "center",
    gap: "8px",
    flexWrap: "nowrap",
    background: "#25826a0f",
  },
  singleBotton: {
    padding: "10px 25px",
    cursor: "pointer",
    borderRadius: "8px",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundImage: "linear-gradient(45deg, #25826A, #35a47f)",
      color: "white",
    },
  },
  currentLang: {
    color: "white !important",
    backgroundImage: "linear-gradient(45deg, #25826A, #35a47f)",
    boxShadow: "0 3px 5px 2px rgba(37, 130, 106, .3)",
  },
  dontHaveAccount: {
    color: "#25826A",
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default function PropertyMain() {
  const [activeTab, setActiveTab] = useState("available");

  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({});
  const router = useRouter();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

  const getFundedProperties = async () => {
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getCounts",
        token: user?.userInfo?.token,
        // id: "679e58315872f9fecf61f5c3",
      });
      console.log(res);
      if (res?.data?.responseCode === 200) {
        setCounts(res?.data?.result || {});
        setLoading(false);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log("error while getting available properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFundedProperties();
  }, []);

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  useEffect(() => {
    if (user?.userInfo?.verifyAccount === false) {
      setOpenModal(true);
    }
  }, [user?.userInfo?.verifyAccount]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <Container maxWidth="lg">
      {" "}
      <Grid sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 3 }}>
        <Box sx={style.toggleBotton}>
          <Box
            sx={{
              ...style.singleBotton,
              ...(activeTab === "available" && style.currentLang),
            }}
            onClick={() => handleTabChange("available")}
          >
            <Typography variant="body4" className='outfitFonts'>
              {t("available")} ({counts?.available})
            </Typography>
          </Box>

          <Box
            sx={{
              ...style.singleBotton,
              ...(activeTab === "funded" && style.currentLang),
            }}
            onClick={() => handleTabChange("funded")}
          >
            <Typography variant="body4" className='outfitFonts'>
              {t("funded")} ({counts?.funded})
            </Typography>
          </Box>

          <Box
            sx={{
              ...style.singleBotton,
              ...(activeTab === "exited" && style.currentLang),
            }}
            onClick={() => handleTabChange("exited")}
          >
            <Typography variant="body4" className='outfitFonts'>
              {t("exited")} ({counts?.exited})
            </Typography>
          </Box>
        </Box>
      </Grid>
      {activeTab === "available" && <AvailableProperties />}
      {activeTab === "funded" && <FundedProperties />}
      {activeTab === "exited" && <ExitedProperties />}


      <KycModal open={openModal} handleClose={() => setOpenModal(false)}/>
    </Container>
  );
}
PropertyMain.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
