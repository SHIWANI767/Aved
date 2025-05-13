import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Box, Typography, styled } from "@mui/material";

const BlogscardBox = styled("Box")(({ theme, image }) => ({
  "& .blogCardBox": {
    position: "relative",
    zIndex: "999",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "300px 0 40px",
    borderRadius: "40px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      padding: "125px 0 40px",
    },
    "&:hover": {
      // transform: "scale(1.02)",
      // transition: "all 0.3s ease-in-out",
    },
    "&::after": {
      top: "0",
      left: "0",
      content: '""',
      width: "100%",
      height: "101%",
      zIndex: "1",
      position: "absolute",
      borderRadius: "40px",
      background:
        "linear-gradient(180deg, rgba(13, 11, 32, 0) 78.69%, #0D0B20 100%)",
    },
    "& .textContainer": {
      width: "90%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      zIndex: "999",
      [theme.breakpoints.down("md")]: {
        width: "95%",
      },
      " h3": {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
    "& .subText": {
      maxWidth: "580px",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
      },
    },

    "& .description": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      height: "25px",
      "& figure, & a, & td, & span, & section, & iframe, & img, & >*, & strong, & h4, & h5, & h1, & h2, & h3, & em, & p,  div":
        {
          fontFamily: '"Oxanium", sans-serif !important',
          backgroundColor: "unset !important",
          color: `#FFFFFF !important`,
          wordBreak: "break-word",
          overflow: "auto",
          margin: "0px",
        },
      "& p": {
        // fontSize: "14px !important",
        color: `#FFFFFF !important`,
        backgroundColor: "unset !important",
        fontFamily: '"Oxanium", sans-serif !important',
      },
      "& figure": {
        marginLeft: "0",
      },

      "& img": {
        width: "100%",
        height: "auto",
      },
      "& >*": {
        backgroundColor: "unset !important",
        wordBreak: "break-word",
        overflow: "auto",
        color: `${theme.palette.text.primary} !important`,
      },
    },
  },
}));

const Blogscard = ({ data, index }) => {
  const router = useRouter();
  const imageRef = useRef(null);

  const updateDimensions = () => {
    if (imageRef.current) {
      const offsetWidth = imageRef.current.offsetWidth;
      const newOffsetWidth = offsetWidth - 110;
      imageRef.current.style.height = newOffsetWidth + "px";
    }
  };

  useEffect(() => {
    updateDimensions();
  }, [data, name]);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleCardClick = () => {
    router.push({
      pathname: "/blog-details",
      query: {
        title: data.title,
        content: data.content,
        blogImg: data.blogImg,
      },
    });
  };

  return (
    <BlogscardBox image={data.blogImg}>
      <Box className="blogCardBox" onClick={handleCardClick}>
        <Box className="textContainer">
          <Typography mb={2} variant="h3" color="primary" fontWeight="600">
            {data.title}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            className="subText description"
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></Typography>
        </Box>
      </Box>
    </BlogscardBox>
  );
};
export default Blogscard;
