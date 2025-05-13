import React from "react";
import DashboardLayout from "../layout";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import {
  FaUser,
  FaComment,
  FaGift,
  FaBlog,
  FaBook,
  FaPlayCircle,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const style = {
  box: {
    maxHeight: "25vh",
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.4) 0px 8px 16px -2px, rgba(0, 0, 0, 0.35) 0px 4px 8px -3px",
      transform: "translateY(-4px)",
    },
    textAlign: "center",
    cursor: "pointer",
  },
  icon: {
    color: "#25826A",
    fontSize: "35px",
    marginBottom: "10px",
  },
  subHeading: {
    lineHeight: "20px",
    marginTop: "10px",
  },
};

export default function Profile() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Typography variant="h3">{t("profile_settings")}</Typography>
      <Grid container spacing={3} mt={1}>
        <Grid item lg={4} md={4} sm={6} xs={6}>
          <Card
            sx={style.box}
            onClick={() => router.push("/dashboard/myaccount/details")}
          >
            <CardContent>
              <FaUser style={style.icon} />
              <Typography variant="h5">{t("account_information")}</Typography>
              <Typography variant="h6" sx={style.subHeading}>
                {t("account_information_desc")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={6}>
          <Card
            sx={style.box}
            onClick={() => router.push("/dashboard/myaccount/feedback")}
          >
            <CardContent>
              <FaComment style={style.icon} />
              <Typography variant="h5">{t("submit_feedback")}</Typography>
              <Typography variant="h6" sx={style.subHeading}>
                {t("submit_feedback_desc")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={6}>
          <Card
            sx={style.box}
            onClick={() => router.push("/dashboard/rewards")}
          >
            <CardContent>
              <FaGift style={style.icon} />
              <Typography variant="h5">{t("refer_friend")}</Typography>
              <Typography variant="h6" sx={style.subHeading}>
                {t("refer_friend_desc")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={6}>
          <Card
            sx={style.box}
            onClick={() => router.push("/dashboard/myaccount/finance-blog")}
          >
            <CardContent>
              <FaBlog style={style.icon} />
              <Typography variant="h5">{t("finance_blog")}</Typography>
              <Typography variant="h6" sx={style.subHeading}>
                {t("finance_blog_desc")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={6}>
          <Card
            sx={style.box}
            onClick={() => router.push("/dashboard/myaccount/glossary")}
          >
            <CardContent>
              <FaBook style={style.icon} />
              <Typography variant="h5">{t("glossary")}</Typography>
              <Typography variant="h6" sx={style.subHeading}>
                {t("glossary_desc")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={6}>
          <Card
            sx={style.box}
            onClick={() => router.push("/dashboard/myaccount/howitworks")}
          >
            <CardContent>
              <FaPlayCircle style={style.icon} />
              <Typography variant="h5">{t("how_it_works")}</Typography>
              <Typography variant="h6" sx={style.subHeading}>
                {t("how_it_works_desc")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

Profile.getLayout = function Profile(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
