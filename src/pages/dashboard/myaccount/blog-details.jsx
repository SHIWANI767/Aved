import React, { useState } from "react";
import { Box, Container, Typography, Dialog, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import moment from "moment";
import DashboardLayout from "../layout";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

export default function AboutUs() {
  const { t } = useTranslation();
  const blogsData = useSelector((state) => state?.blog);
  const images = [
    blogsData?.blogDetails?.addBlogImage,
    blogsData?.blogDetails?.addAuthorImage,
  ].filter(Boolean);
  console.log(blogsData);
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        fontWeight={600}
        color="primary"
        textAlign="left"
        mt={5}
        mb={2}
      >
        {t("finance_blogs")}
      </Typography>
      <Typography
        variant="h3"
        color="primary"
        mb={1.4}
        mt={4}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {i18n.language === "en"
          ? blogsData?.blogDetails?.blogTitle
          : blogsData?.blogDetails?.blogTitle_ar || "--"}
      </Typography>
      <Box sx={{ cursor: "pointer" }} onClick={() => setOpenModal(true)}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide-${index}`}
                style={{
                  width: "100%",
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="lg"
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "white",
              zIndex: 2,
            }}
          >
            <Close />
          </IconButton>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Full-${index}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Dialog>

      <Box className="text-content" mt={1}>
        <Box
          className="displayRow"
          mb={1.5}
          sx={{ gap: "12px", justifyContent: "space-between", p: 0 }}
        >
          <Typography variant="body3" color="primary" fontWeight="bold">
            {t("author")} &nbsp;-&nbsp;
            {blogsData?.blogDetails?.authorName || "--"}
          </Typography>
          <Typography variant="body3" color="primary" className='outfitFonts' fontWeight="bold">
            {t("date")} &nbsp;-&nbsp;{" "}
            {moment(blogsData?.blogDetails?.createdAt).format("MMMM D, YYYY") ||
              "--"}
          </Typography>
        </Box>
        <Typography
          variant="body3"
          color="primary"
          dangerouslySetInnerHTML={{
            __html: (i18n.language === "en"
              ? blogsData?.blogDetails?.blogDescription
              : blogsData?.blogDetails?.blogDescription_ar
            )
              ?.replace(/^<p>\s*|\s*<\/p>$/g, "") // Remove outer <p> tags & extra spaces
              ?.trim(), // Trim extra spaces if any remain
          }}
        />
      </Box>
    </Container>
  );
}

AboutUs.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
