import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout";
import { Box, Container, Divider, Pagination, Typography } from "@mui/material";
import { apiRouterCall } from "@/api-services/service";
import NoDataFound from "@/components/NoDataFound";
import CircularProgressBar from "@/components/CircularProgressBar";
import Loader from "@/components/PageLoader/Loader";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const style = {
  box: {
    border: "1px solid #25826A",
    padding: "20px",
    margin: "3% 0",
    borderRadius: "10px",
  },
  box2: {
    borderLeft: "6px solid #25826A",
    padding: "20px",
    borderRadius: "10px",
    background: "#25826a0f",
    mt: 1,
  },
  loaderBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default function Glossary() {
  const [glossaryData, setGlossaryData] = useState([]);
  const [loading, setLoading] = useState(true); // Initial state is false
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { t } = useTranslation();

  const getGlossary = async () => {
    setLoading(true); // Set loader to true before API call
    try {
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "glossaryContentList",
        paramsData: {
          page: page,
        },
      });
      if (res?.data?.responseCode === 200) {
        setGlossaryData(res?.data?.result?.docs);
        setPage(res?.data?.result?.page || 0);
        setTotalPages(res?.data?.result?.totalPages || 0);
      } else {
        console.log("Error response:", res);
      }
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoading(false); // Stop loader after API response
    }
  };

  useEffect(() => {
    getGlossary();
  }, [page, totalPages]);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h3">{t("glossary")}</Typography>
      <Divider
        sx={{
          backgroundColor: "#25826A",
          marginTop: 2,
        }}
      />
      <Box>
        {loading ? ( // Show loader when API is fetching data
          <Box sx={style.loaderBox}>
            <Loader />
          </Box>
        ) : (
          <>
            <Box>
              {glossaryData?.map((item, index) => (
                <Box key={index} sx={style.box}>
                  <Typography variant="h5" color="#25826A">
                    {i18n.language === "en"
                      ? item.title
                      : item.title_ar || "N/A"}
                  </Typography>
                  <Box sx={style.box2}>
                    <Typography
                      variant="body3"
                      color="primary"
                      dangerouslySetInnerHTML={{
                        __html: (i18n.language === "en"
                          ? item.description
                          : item.description_ar || "N/A"
                        )
                          ?.replace(/^<p>\s*|\s*<\/p>$/g, "") // Remove outer <p> tags & extra spaces
                          ?.trim(), // Trim extra spaces if any remain
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
            <Box display={"flex"} justifyContent={"right"}>
              {totalPages > 1 && (
                <Pagination
                  count={totalPages}
                  onChange={(e, v) => setPage(v)}
                  sx={{
                    marginLeft: "-12px",
                    "& .MuiButtonBase-root": {
                      fontSize: "14px !important",
                    },
                    "& .Mui-selected": {
                      color: "#fff",
                      backgroundColor: "#25826A !important",
                    },
                  }}
                />
              )}
            </Box>

            {glossaryData?.length === 0 && (
              <NoDataFound message="No Glossary available." />
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

Glossary.getLayout = function Glossary(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
