import Insurance from "@/pages/home/InsuranceBox";
import {
  Box,
  Container,
  Grid,
  Pagination,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout";
import ImgMediaCard from "@/components/BlogCard";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { apiRouterCall } from "@/api-services/service";
import { setBlogDetails } from "@/store/slices/blogSlice";
import { useTranslation } from "react-i18next";

const MainComponent = styled("div")({});
function FinanceBlog() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [getBlog, setGetBlog] = useState();
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { t } = useTranslation();

  const blogDetails = async () => {
    try {
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "listBlog",
        token: user?.userInfo?.token,
      });
      if (res?.data?.responseCode === 200) {
        setGetBlog(res?.data?.result?.docs);
        setTotalPages(res?.data?.result?.totalPages);
        setPage(res?.data?.result?.page);
        console.log("This is my blogs data", res?.data?.result?.docs);
      } else {
        console.log("This is my error in the blogDetails", res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    blogDetails();
  }, [page, totalPages]);

  const cardClick = (item) => {
    dispatch(setBlogDetails(item));
    router.push("/dashboard/myaccount/blog-details");
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        fontWeight={600}
        color="primary"
        textAlign="left"
        mt={4}
        mb={4}
      >
        {t("finance_blogs")}
      </Typography>
      <Grid container spacing={3}>
        {getBlog?.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
            <Box sx={{ cursor: "pointer" }} onClick={() => cardClick(item)}>
              <ImgMediaCard blogData={item} />
            </Box>
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Container>
  );
}

export default FinanceBlog;

FinanceBlog.getLayout = function Profile(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
