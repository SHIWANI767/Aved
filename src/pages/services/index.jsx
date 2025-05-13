import React, { useState, useEffect } from "react";
import HomeLayout from "@/layout/HomeLayout";
import {
  Container,
  Typography,
  Box,
  Divider,
  Paper,
  styled,
} from "@mui/material";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CircularProgressBar from "@/components/CircularProgressBar";
import NoDataFound from "@/components/NoDataFound";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import Loader from "@/components/PageLoader/Loader";

const ServicesBox = styled("Box")(({ theme }) => ({
  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
}));
export default function Services() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const { type } = router.query;
  const fetchServices = async (type) => {
    console.log("kjjkdfkj", user?.userInfo?.token);
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: `viewStaticContent`,
        token: user?.userInfo?.token,
        id: "Services",
      });
      console.log(res);
      if (res?.data?.responseCode === 200) {
        setData(res?.data?.result || {});
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Error while getting Services data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  const extractFirstParagraph = (htmlString) => {
    if (!htmlString) return "";

    // Parse HTML string into a DOM structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Try extracting from <p> tag
    let firstParagraph = doc.querySelector("p")?.textContent?.trim();

    // If <p> is empty, try extracting from <li>
    if (!firstParagraph) {
      firstParagraph = doc.querySelector("li")?.textContent?.trim();
    }

    // If still empty, check for a <div> (CKEditor sometimes uses divs)
    if (!firstParagraph) {
      firstParagraph = doc.querySelector("div")?.textContent?.trim();
    }

    // If still empty, check for any other text content
    if (!firstParagraph) {
      firstParagraph = doc.body.textContent?.trim() || "";
    }

    return firstParagraph || "No Overview Available"; // Fallback if no text found
  };

  return (
    <ServicesBox>
      <Container maxWidth="lg" sx={{ paddingY: 4, mt: 13, mb: 3 }}>
        {loading ? ( // Show loader when API is loading
          <Loader />
        ) : data ? (
          <Paper elevation={3} className="TopSection">
            <Typography variant="h2" align="center" gutterBottom>
              {/* {data?.title || "Privacy Policy"}  */}
              {i18n.language === "en" ? data?.title : data?.title_ar}
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
              <Typography color="text.primary">
                Last Updated: {formatDate(data?.updatedAt)}
              </Typography>
            </Box>
          </Paper>
        ) : (
          // Show "No Data Found" if there's no data
          <NoDataFound message="No Data Found" />
        )}
      </Container>
    </ServicesBox>
  );
}
Services.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
