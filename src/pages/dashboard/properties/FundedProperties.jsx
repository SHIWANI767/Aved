import React, { useEffect, useState } from "react";

import { Box, Container, Grid, Pagination } from "@mui/material";
import PropertyCard from "@/components/PropertyCard";
import { apiRouterCall } from "@/api-services/service";
import { useRouter } from "next/router";
import Loader from "@/components/PageLoader/Loader";
import NoDataFound from "@/components/NoDataFound";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setProperty,
  setPropertyStatus,
} from "@/store/slices/availablePropertySlice";
import { useTranslation } from "react-i18next";
// const properties = [
//   {
//     id: 1,
//     type: "Long-Term Rental",
//     code: "SC-301",
//     location: "Damac Hills",
//     category: "Balanced",
//     title: "Studio in Carson, Tower B – DAMAC Hills",
//     images: [
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     ],
//     annualRentalYield: "8.20%",
//     netRentalYield: "6.21%",
//     annualizedReturn: "9.42%",
//     totalExpectedReturn: "47.11%",
//     fundedPercentage: 70.03,
//     propertyPrice: "585,000.00",
//     currency: "AED",
//   },
//   {
//     id: 2,
//     type: "Guaranteed Rental Yield",
//     code: "SC-300",
//     location: "Dubai Marina",
//     category: "Holiday Home",
//     title: "1 Bedroom in Blakely Tower, Park Island, Dubai Marina",
//     images: [
//       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     ],
//     annualRentalYield: "9.02%",
//     netRentalYield: "6.02%",
//     annualizedReturn: "11.26%",
//     totalExpectedReturn: "56.29%",
//     fundedPercentage: 90.91,
//     propertyPrice: "1,585,000.00",
//     currency: "AED",
//   },
//   {
//     id: 3,
//     type: "Guaranteed Rental Yield",
//     code: "SC-300",
//     location: "Dubai Marina",
//     category: "Holiday Home",
//     title: "1 Bedroom in Blakely Tower, Park Island, Dubai Marina",
//     images: [
//       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     ],
//     annualRentalYield: "9.02%",
//     netRentalYield: "6.02%",
//     annualizedReturn: "11.26%",
//     totalExpectedReturn: "56.29%",
//     fundedPercentage: 90.91,
//     propertyPrice: "1,585,000.00",
//     currency: "AED",
//   },
// ];
export default function FundedProperties() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const getFundedProperties = async () => {
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getFundedProperties",
        token: user?.userInfo?.token,
      });
      console.log(res);
      if (res?.data?.responseCode === 200) {
        setProperties(res?.data?.properties || []);
        setPage(res?.data?.currentPage || 1);
        setTotalPages(res?.data?.totalPages || 1);
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
  }, [page]);
  const cardClick = (property) => {
    if (user?.userInfo?.verifyAccount === true) {
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
              key={property.id}
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
              "& .Mui-selected": { color: "#fff", backgroundColor: "#25826A" },
            }}
          />
        )}
      </Box>
    </Container>
  );
}
