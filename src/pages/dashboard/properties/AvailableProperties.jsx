import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Pagination } from "@mui/material";
import PropertyCard from "@/components/PropertyCard";
import { useRouter } from "next/router";
import { apiRouterCall } from "@/api-services/service";
import Loader from "@/components/PageLoader/Loader";
import NoDataFound from "@/components/NoDataFound";
import { useSelector, useDispatch } from "react-redux";
import {
  setProperty,
  setPropertyStatus,
} from "@/store/slices/availablePropertySlice";
import { useTranslation } from "react-i18next";

export default function AvailableProperties() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector((state) => state.user);
  console.log(user);
  const getAvailableProperties = async () => {
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getAllTheProperties",
        token: user?.userInfo?.token,
        paramsData: { user: user?.userInfo?._id, page: page },
      });

      if (res?.data?.responseCode === 200) {
        setProperties(res?.data?.properties || []);
        setPage(res?.data?.currentPage || 0);
        setTotalPages(res?.data?.totalPages || 0);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log("Error while getting available properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userInfo?.token) {
      getAvailableProperties();
    }
  }, [page, user?.userInfo?.token]); // include token in deps
  

  const cardClick = (property) => {
    if (user?.userInfo?.verifyAccount === true ) {
      dispatch(setProperty(property));
      dispatch(setPropertyStatus("available"));
      router.push("/dashboard/properties/details");
    }
  };
  return (
    <Container>
      {loading ? (
        <Loader /> // Show Loader when data is loading
      ) : properties.length === 0 ? (
        <Box
          height={"70vh"}
          display="flex"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
        >
          <NoDataFound text={t("no_properties")} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={property.id || property._id}

              onClick={() => cardClick(property)}
              sx={{ cursor: "pointer" }}
            >
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      )}
      <Box display={"flex"} justifyContent={"center"}>
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
    </Container>
  );
}
