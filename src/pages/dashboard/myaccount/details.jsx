import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/material/styles";
import DashboardLayout from "../layout";
import CustomModal from "@/components/CustomModal";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { esES } from "@mui/x-date-pickers";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

// Styled Component
const MainComponent = styled(Box)(({ theme }) => ({
  border: "1px solid #E2E8F0",
  borderRadius: "12px",
  boxShadow:
    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  overflow: "hidden",
  padding: "20px",
  background: "#fff",
  "& .buttonsContainer": {
    display: "flex",
    gap: "15px",
  },
}));

export default function AccountInformation() {
  const [getInfo, setGetInfo] = useState([]);
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const { t } = useTranslation();

  const getUserInfo = async () => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        endPoint: "viewAccountInfo",
        paramsData: {
          _id: user?.userInfo?._id,
        },
      });
      if (response?.data?.responseCode === 200) {
        setGetInfo(response?.data?.result);
        // console.log("This is my response in user info", response?.data?.result)
      } else {
        console.log("This is my error", response?.data);
      }
    } catch (error) {
      console.log("This is my error", error);
    }
  };

  const deleteProfile = async () => {
    try {
      const res = await apiRouterCall({
        method: "DELETE",
        endPoint: "deleteAccount",
        paramsData: {
          userId: user?.userInfo?._id,
        },
      });
      if (res?.data?.responseCode === 200) {
        toast.success(res?.data?.responseMessage);
      } else {
        toast.error(res?.data?.responseMessage);
        console.log("This error is coming in else", res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  // User Data
  const userDetails = [
    { label: t("signup_section.name"), value: getInfo?.fullName || "--" },
    { label: t("signup_section.email"), value: getInfo?.email || "--" },
    { label: t("phone_number"), value: getInfo?.mobileNumber || "--" },
    {
      label: t("passport_verified"),
      value: getInfo?.verifyAccount === false ? "No" : "Yes" || "--",
      hasIcon: true,
    },
  ];
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} sm={12} md={10}>
          {/* Title */}
          <Typography
            variant="h3"
            color="primary"
            textAlign="left"
            mt={2}
            mb={1.5}
          >
            {t("account_information")}
          </Typography>

          {/* Main Box */}
          <MainComponent>
            <Grid container spacing={2}>
              {userDetails.map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={4.7} sm={6}>
                    <Typography variant="h5" color="text.secondary">
                      {item.label}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={7.3} sm={6}>
                    <Typography
                      variant="h5"
                      color="primary"
                      fontWeight = {item.label === t("phone_number") ? "500" : "600"}
                      className={item.label === t("phone_number") ? "outfitFonts" : ""}
                    >
                      {item.value}
                    </Typography>

                  </Grid>
                </React.Fragment>
              ))}
            </Grid>

            {/* Need Help Section */}
            <Box sx={{ borderTop: "1px solid #E2E8F0", marginTop: "24px" }}>
              <Grid container spacing={2} mt={1} alignItems="center">
                <Grid item xs={12} sm={4} md={6} lg={6}>
                  <Typography variant="h5" color="primary">
                    {t("need_help_updating")}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={6}
                  lg={6}
                  className="buttonsContainer"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push("/dashboard/helpandsupport")}
                  >
                    {t("help_and_support")}
                  </Button>
                  {/* <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpenDeleteModal(true)}
                    disabled={true}
                  >
                    {t("delete_account")}
                  </Button> */}
                </Grid>
              </Grid>
            </Box>
          </MainComponent>
        </Grid>
      </Grid>
      {/* Delete Account Confirmation Modal */}
      <CustomModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        title="Delete Account"
        description="Are you sure, you want to delete your account?"
        actions={[
          {
            label: "No",
            props: {
              variant: "contained",
              color: "primary",
              onClick: () => setOpenDeleteModal(false),
            },
          },
          {
            label: "Yes",
            props: {
              variant: "outlined",
              color: "primary",
              onClick: () => {
                deleteProfile(), setOpenDeleteModal(false);
              },
            },
          },
        ]}
      />
    </Container>
  );
}

// Wrapping Layout
AccountInformation.getLayout = function Profile(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
