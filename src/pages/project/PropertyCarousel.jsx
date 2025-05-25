import React, { useState } from "react";
import Slider from "react-slick";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
  Grid,
  Container,
  Pagination,
} from "@mui/material";
import { useRouter } from "next/router";
import { IoBedOutline, IoCarOutline } from "react-icons/io5";
import { TbBath, TbBallAmericanFootball } from "react-icons/tb";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Sample data
const properties = [
  {
    title: "Equestrian Villa",
    price: "$1,599,000",
    tags: ["FEATURED", "FOR SALE"],
    images: [
      "/images/Project/pro_2.jpg",
      "/images/Project/pro_4.jpg",
      "/images/Project/pro_3.jpg",
    ],
    beds: 4,
    baths: 2,
    cars: 1,
    area: 1200,
  },
  {
    title: "Renovated Studio",
    price: "$540,000",
    tags: ["FEATURED", "FOR SALE"],
    images: [
      "/images/Project/pro_4.jpg",
      "/images/Project/pro_2.jpg",
      "/images/Project/pro_4.jpg",
    ],
    beds: 4,
    baths: 2,
    cars: 1,
    area: 1200,
  },
  {
    title: "Commercial Central Shop",
    price: "$3,600/mo",
    tags: ["FEATURED", "FOR RENT"],
    images: [
      "/images/Project/pro_3.jpg",
      "/images/Project/pro_2.jpg",
      "/images/Project/pro_4.jpg",
    ],
    beds: null,
    baths: null,
    cars: null,
    area: 2350,
  },
  {
    title: "Equestrian Villa",
    price: "$1,599,000",
    tags: ["FEATURED", "FOR SALE"],
    images: [
      "/images/Project/pro_2.jpg",
      "/images/Project/pro_4.jpg",
      "/images/Project/pro_3.jpg",
    ],
    beds: 4,
    baths: 2,
    cars: 1,
    area: 1200,
  },
    {
    title: "Equestrian Villa",
    price: "$1,599,000",
    tags: ["FEATURED", "FOR SALE"],
    images: [
      "/images/Project/pro_2.jpg",
      "/images/Project/pro_4.jpg",
      "/images/Project/pro_3.jpg",
    ],
    beds: 4,
    baths: 2,
    cars: 1,
    area: 1200,
  },
  {
    title: "Renovated Studio",
    price: "$540,000",
    tags: ["FEATURED", "FOR SALE"],
    images: [
      "/images/Project/pro_4.jpg",
      "/images/Project/pro_2.jpg",
      "/images/Project/pro_4.jpg",
    ],
    beds: 4,
    baths: 2,
    cars: 1,
    area: 1200,
  },
];

// Child component
const PropertyCard = ({ property }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box sx={{ position: "relative", cursor: "pointer" }}>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay={false}
          autoPlaySpeed={3000}
        >
          {property.images.map((img, i) => (
            <Box key={i}>
              <CardMedia
                component="img"
                height="320"
                image={img}
                alt={`${property.title} image ${i + 1}`}
                sx={{ width: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Carousel>

        {/* Tags */}
        {property.tags?.map((tag, i) => (
          <span
            key={i}
            className={`featureText ${tag === "FOR SALE" ? "saleText" : ""}`}
          >
            {tag}
          </span>
        ))}
      </Box>

      <CardContent
        onClick={() => router.push(`/property-details`)}
        style={{
          boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          marginTop: "-4px",
        }}
      >
        <Typography variant="h6" color="#222222" fontWeight="500">
          {property.title}
        </Typography>
        <Box className="displaySpacebetween" style={{ gap: "10px" }}>
          <Typography variant="h5" color="primary" className="propertyprice">
            {property.price}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {property.beds !== null && (
              <Box display="flex" alignItems="center" gap={1}>
                <IoBedOutline style={{ color: "#636363" }} />
                <Typography variant="body2" fontWeight="600" color="#636363">
                  {property.beds}
                </Typography>
              </Box>
            )}
            {property.baths !== null && (
              <Box display="flex" alignItems="center" gap={1}>
                <TbBath style={{ color: "#636363" }} />
                <Typography variant="body2" fontWeight="600" color="#636363">
                  {property.baths}
                </Typography>
              </Box>
            )}
            {property.cars !== null && (
              <Box display="flex" alignItems="center" gap={1}>
                <IoCarOutline style={{ color: "#636363" }} />
                <Typography variant="body2" fontWeight="600" color="#636363">
                  {property.cars}
                </Typography>
              </Box>
            )}
            {property.area && (
              <Box display="flex" alignItems="center" gap={1}>
                <TbBallAmericanFootball style={{ color: "#636363" }} />
                <Typography variant="body2" fontWeight="600" color="#636363">
                  {property.area}
                </Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Grid>
  );
};

const PropertyCarousel = () => {
  return (
    <>
      <Grid container spacing={3}>
        {properties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </Grid>
      <Box mt={5} className="dislayCenter">
         <Pagination count={10} showFirstButton showLastButton />
      </Box>
     
    </>
  );
};

export default PropertyCarousel;
