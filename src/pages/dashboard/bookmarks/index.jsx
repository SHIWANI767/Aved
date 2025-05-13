import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { useRouter } from "next/router";
import DashboardLayout from "../layout";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import BookmarkCard from "@/components/BookmarkCard";
import { useDispatch } from "react-redux";
import {
  setProperty,
  setPropertyStatus,
} from "@/store/slices/availablePropertySlice";
import NoDataFound from "@/components/NoDataFound";
import Loader from "@/components/PageLoader/Loader";
import { useTranslation } from "react-i18next";

export default function Bookmarks() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const getAvailableProperties = async () => {
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getBookmark",
        token: user?.userInfo?.token,
        paramsData: {
          userId: user?.userInfo?._id,
        },
      });

      if (res?.data) {
        setProperties(res?.data || []);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log("Error while getting available properties", error);
    } finally {
      setLoading(false);
      setFetchData(false);
    }
  };

  useEffect(() => {
    getAvailableProperties();
  }, [fetchData]);
  const getProperties = async (type, id) => {
    try {
      let endPoint;
      if (type === "available") {
        endPoint = "getAllTheProperties";
      } else if (type === "funded") {
        endPoint = "getFundedProperties";
      } else {
        endPoint = "getExitedProperties";
      }
      const res = await apiRouterCall({
        method: "GET",
        endPoint: endPoint,
        token: user?.userInfo?.token,
        paramsData: { propertyId: id, user: user?.userInfo?._id },
      });
      console.log(res);
      if (res?.data?.responseCode === 200) {
        // setProperties(res?.data?.properties || []);
        dispatch(setProperty(res?.data?.properties[0]));
        dispatch(setPropertyStatus(type));
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log("Error while getting available properties", error);
    } finally {
    }
  };
  const getprop = async (property) => {
    console.log(property?.propertyStatus, property?._id);
    await getProperties(property?.propertyStatus, property?._id);
    router.push("/dashboard/properties/details");
  };
  return (
    <Container>
      <Typography variant="h3" mt={2}>
        {t("bookmarks")}
      </Typography>
      {loading ? (
        <Loader /> // Show Loader when data is loading
      ) : Array.isArray(properties) && properties.length > 0 ? (
        <Grid container spacing={2}>
          {properties.map((property) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={property.id}
              sx={{ cursor: "pointer" }}
            >
              <BookmarkCard
                property={property}
                getProp={() => getprop(property)}
                fetchData={setFetchData}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          height={"70vh"}
          display="flex"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
        >
          <NoDataFound text={t("no_bookmarks")} />
        </Box>
      )}
    </Container>
  );
}
Bookmarks.getLayout = function Bookmarks(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
