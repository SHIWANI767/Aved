// app/components/AlertCards.js

import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function AlertCards({ title, description, severity }) {
  const { t } = useTranslation();
  const router = useRouter();
  // State to control the visibility of the alert
  const [open, setOpen] = useState(true);
  const user = useSelector((state) => state.user);
  const isVerified = user?.userInfo?.verifyAccount;

  // Handle the close event
  const handleClose = () => {
    setOpen(false); // Hides the alert when the close button is clicked
  };

  return (
    <>
      <Container
        maxWidth={"lg"}
        sx={{
          background: "#ff00000f",
          p: 2,
          display: isVerified ? "none" : "block",
          borderBottom: "1px solid #ff000059",
        }}
      >
        <Grid container justifyContent={"space-between"}>
          <Grid item lg={8} md={8} sm={12}>
            <Grid container spacing={1}>
              <Grid item lg={1} md={1} sm={1}>
                <Box
                  sx={{
                    padding: "12px",
                    backgroundColor: "#ff4000a6",
                    borderRadius: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <LanguageIcon sx={{ color: "white" }} />
                </Box>
              </Grid>
              <Grid item lg={11} md={11} sm={11}>
                {" "}
                <Typography variant="subTitle2">
                  {t("passport_required")}
                </Typography>
                <br />
                <Typography variant="body3">
                  {t("local_regulations")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={12}
            display={"flex"}
            sx={{
              justifyContent: {
                lg: "flex-end",
                md: "flex-start",
                sm: "flex-start",
              },
            }}
            gap={"15px"}
          >
            <Button
              variant="contained"
              sx={{
                minWidth: 120,
                padding: "10px 25px !important",
              }}
              onClick={() => router.push("/auth/employment-details")}
            >
              {t("upload")}
            </Button>{" "}
            {/* <Button
              variant="outlined"
              sx={{
                minWidth: 120,
                padding: "10px 25px !important",
              }}
            >
              Learn more
            </Button> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
