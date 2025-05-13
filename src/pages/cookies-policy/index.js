import React, { useState, useEffect } from "react";
import HomeLayout from "@/layout/HomeLayout";
import {
  Container,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  styled,
} from "@mui/material";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getDeviceId } from "@/utils";
import axios from "axios";
import CircularProgressBar from "@/components/CircularProgressBar";
import NoDataFound from "@/components/NoDataFound";
import i18n from "@/i18n";
import Loader from "@/components/PageLoader/Loader";

const CookiePolicyBox = styled("Box")(({ theme }) => ({
  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
  marginTop: "10%",
}));

export default function CookiePolicy() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const { type } = router.query;
  const fetchCookiePolicy = async (type) => {
    console.log("kjjkdfkj", user?.userInfo?.token);
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: `viewStaticContent`,
        token: user?.userInfo?.token,
        id: "CookiesPolicy",
      });
      console.log(res);
      if (res?.data?.responseCode === 200) {
        setData(res?.data?.result || {});
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Error while getting Cookies Policy", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCookiePolicy();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <CookiePolicyBox>
      <Container maxWidth="lg" sx={{ paddingY: 4, mt: 13, mb: 3 }}>
        {loading ? (
          <Loader />
        ) : data ? (
          <Paper elevation={3} className="TopSection">
            <Typography variant="h2" align="center" gutterBottom>
              {/* {data?.title || "Cookie Policy"}  */}
              {i18n.language === "en"
                ? data?.title || ""
                : data?.title_ar || ""}
            </Typography>
            <Typography
              variant="body3"
              color="text.primary"
              paragraph
              dangerouslySetInnerHTML={{
                __html:
                  i18n.language === "en"
                    ? data?.description || ""
                    : data?.description_ar || "",
              }}
            />
            <Box>
              <Divider sx={{ marginY: 2, borderColor: "#aba2a2" }} />
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography color="text.primary">
                        Last Updated: {formatDate(data?.updatedAt)}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </Paper>
        ) : (
          <NoDataFound message="No Data Found" />
        )}
      </Container>
    </CookiePolicyBox>
  );
}

CookiePolicy.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
