import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  Container,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DashboardLayout from "../layout";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const style = {
  box: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    padding: "16px",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.4) 0px 8px 16px -2px, rgba(0, 0, 0, 0.35) 0px 4px 8px -3px",
      transform: "translateY(-4px)",
    },
  },
  rewardIcon: {
    color: "#25826a",
    fontSize: "50px",
  },
  sectionTitle: {
    // fontWeight: "bold",
  },
  referralBox: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    padding: "16px",
    backgroundColor: "#F8F9FA",
  },
  copyButton: {
    backgroundColor: "#25826a",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#206b57",
    },
  },
  boxStyle: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    overflow: "hidden",
    textAlign: "center",
    p: 2,
    "&:hover": {
      boxShadow:
        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
      transform: "translateY(-3px)",
    },
  },
};

// Reward sections data

const RewardsManagement = () => {
  const { t, i18n } = useTranslation();
  const referralLink = "https://web.nesba.com/rewards?c=NA";
  const [rewardData, setRewardData] = useState({});
  const user = useSelector((state) => state.user);
  const [copied, setCopied] = useState(false);
  console.log("Current Language:", i18n.language);

  const handleCopy = () => {
    const referralCode = rewardData?.result?.referralCode || "N/A";
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const fetchRewards = async () => {
    try {
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getTotalReward",
        token: user?.userInfo?.token,
      });
      if (res?.data?.responseCode === 200) {
        console.log(res.data.responseMessage);

        setRewardData(res?.data);
      } else {
      }
    } catch (err) {
      console.log("error while getting rewards", err);
    } finally {
    }
  };
  useEffect(() => {
    fetchRewards();
  }, []);

  const rewardsData = [
    {
      icon: <GroupAddIcon sx={{ color: "#25826a" }} />,
      title: t("referrals"),
      amount: `SAR ${rewardData?.responseMessage?.rewardsBalance || 0}`,
    },
    {
      icon: <LocalOfferIcon sx={{ color: "#25826a" }} />,
      title: t("promotions"),
      amount: "SAR 0",
    },
  ];
  const stats = [
    {
      title: t("totalReferralRewards"),
      amount: `SAR ${rewardData?.responseMessage?.rewardsBalance || 0}`,
      icon: <EmojiEventsIcon fontSize="large" style={{ color: "#25826a" }} />,
    },
    {
      title: t("registered"),
      amount: ` ${rewardData?.responseMessage?.totalReferred || 0}`,
      icon: <PeopleIcon fontSize="large" style={{ color: "#25826a" }} />,
    },
    {
      title: t("invested"),
      amount: ` ${rewardData?.responseMessage?.totalInvestedUser || 0}`,
      icon: <AttachMoneyIcon fontSize="large" style={{ color: "#25826a" }} />,
    },
  ];
  const steps = [
    {
      icon: <LinkIcon style={{ color: "#25826a" }} />,
      text: t("copyReferralCode"),
    },
    {
      icon: <GroupAddIcon style={{ color: "#25826a" }} />,
      text: t("referralBonus"),
    },
    {
      icon: <MonetizationOnIcon style={{ color: "#25826a" }} />,
      text: t("investmentBonus"),
    },
  ];
  return (
    <Container maxWidth="lg">
      <Box mt={3}>
        <Typography variant="h3" color="primary" textAlign="left" mb={1.5}>
          {t("myRewardDashboard")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box
              sx={style.box}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box mt={1.35} mb={1.35}>
                <Typography variant="h5" color="primary">
                  {t("totalRewardsEarned")}
                </Typography>
                <Typography variant="h4" color="text.secondary" className="outfitFonts" mt={1.6}>
                  SAR {rewardData?.responseMessage?.rewardsBalance || 0}
                </Typography>
              </Box>
              <IconButton>
                <EmojiEventsIcon sx={style.rewardIcon} />
              </IconButton>
            </Box>
          </Grid>

          {/* Right Section - Breakdown (4 columns) */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Box sx={style.box} display="flex" flexDirection="column" gap={2}>
              {rewardsData.map((reward, index) => (
                <React.Fragment key={index}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      {reward.icon}
                      <Typography variant="h5" color="primary">
                        {reward.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4" color="text.secondary" className='outfitFonts'>
                      {reward.amount}
                    </Typography>
                  </Box>
                  {index < rewardsData.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <Typography variant="h3" color="primary" textAlign="left" mb={2}>
          {t("referrals")}
        </Typography>
        {/* Referral Stats */}
        <Grid container spacing={2}>
          {stats.map((stat, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={index}>
              <Box sx={style.boxStyle}>
                {stat.icon}
                <Typography variant="h4" color="primary" className='outfitFonts' mt={1}>
                  {stat.amount}
                </Typography>
                <Typography variant="h5" color="text.secondary" mt={1}>
                  {stat.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Referral Steps */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            border: "1px solid #ddd",
            backgroundColor: "#fff",
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              gap={2}
              p={1}
              borderRadius={2}
              sx={{ backgroundColor: "#f9f9f9" }}
            >
              {step.icon}
              <Typography variant="h5" color="text.secondary">
                <strong style={{ color: "#000" }}>
                  {" "}
                  {t("step")} {index + 1}:
                </strong>{" "}
                {step.text}
              </Typography>
            </Box>
          ))}

          {/* Referral Link Box */}
          <Box
            display="flex"
            sx={{
              width: "50%",
              marginTop: "16px",
              gap: "10px",
              "@media(max-width: 600px)": {
                width: "85%",
              },
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              InputProps={{
                sx: {
                  "& .MuiInputBase-input": {
                    color: "#000",
                    // border: "1px solid black",
                  },
                  "& .MuiOutlinedInput-root": {
                    color: "#000",
                    border: "1px solid black !important",
                  },
                  border: "1px solid black !important",
                },
                readOnly: true, // Prevent editing
              }}
              value={rewardData?.result?.referralCode || "N/A"}
            />
            <Button variant="contained" onClick={handleCopy} sx={{ ml: 1 }}>
              {copied ? t("copied") : t("copy_code")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RewardsManagement;

RewardsManagement.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
