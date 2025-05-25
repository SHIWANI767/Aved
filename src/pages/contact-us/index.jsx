import HomeLayout from "@/layout/HomeLayout";
import {
  Box,
  Container,
  Typography,
  Divider,
  styled,
  Button,
  Grid,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import ContactUs from "../home/ContactUs";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdOutlinePhoneCallback } from "react-icons/md";
import { MdOutlineNotListedLocation } from "react-icons/md";

const ContactUSBox = styled("Box")(({ theme }) => ({
  "& .contctBannerImage": {
    position: "relative",
    zIndex: 1,
    backgroundSize: "cover",
    backgroundImage: "url(/images/contact-bc.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top right",
    overflow: "hidden",

    // Overlay using ::before
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // dark overlay
      zIndex: 2,
    },

    // Optional: ensure child content is above overlay
    "& > *": {
      position: "relative",
      zIndex: 3,
    },
  },

  "& .headingBox": {
    paddingTop: "150px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "113px",
    },
  },

  "& .TopSection": {
    background: "#fff",
    color: "#000",
    boxShadow:
      "rgba(0, 0, 0, 0.15) 0px 5px 15px, rgba(0, 0, 0, 0.15) 0px -5px 15px, rgba(0, 0, 0, 0.15) -5px 0px 15px, rgba(0, 0, 0, 0.15) 5px 0px 15px",
  },
  "& .gettouchBox": {
    border: "1px solid #80808059",
    padding: "30px",
    borderRadius: "5px,",
    "& svg": {
      fontSize: "25px",
    },
    "& h2": {
      fontSize: "30px",
      marginTop: "20px",
      lineHeight: "30px",
    },
    "& button": {
      marginTop: "25px",
      width: "100%",
    },
  },
}));

export default function Contactus() {
  const router = useRouter();

  return (
    <>
      <ContactUSBox>
        <Box className="contctBannerImage">
          <Container style={{ position: "relative", zIndex: "999" }}>
            <Box className="headingBox">
              <Typography variant="h1" color="#fff">
                Get in touch
              </Typography>
            </Box>

            <Box
              className=" displaySpacebetween"
              style={{ alignItems: "end", flexWrap: "wrap" }}
              pb={5}
            >
              <Box className="displayStart" gap="15px">
                <Typography
                  variant="h6"
                  color="#FFFFFF99"
                  sx={{ cursor: "pointer", fontWeight: "600" }}
                  onClick={() => router.push("/")}
                >
                  Home
                </Typography>

                <Typography
                  variant="h6"
                  color="#FFFFFF99"
                  sx={{ cursor: "pointer", fontWeight: "600" }}
                  onClick={() => router.push("/blog")}
                >
                  Get in touch
                </Typography>
              </Box>

              <Typography
                variant="h3"
                color="#FFFFFF99"
                style={{ maxWidth: "400px" }}
              >
                Our global real estate experts are here to help you in this
                ever-changing market.
              </Typography>
            </Box>
          </Container>
        </Box>

        <Container className="main-sectionGap contactsection">
          <Grid container spacing={3}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box className="gettouchBox">
                <HiOutlineMailOpen />
                <Typography variant="h2">Support email</Typography>
                <Typography variant="body2">info@aved-sa.com</Typography>

                <Button variant="contained" color="secondary">
                  Email Us
                </Button>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box className="gettouchBox">
                <MdOutlinePhoneCallback />
                <Typography variant="h2">Phone number</Typography>
                <Typography variant="body2">+966 56 658 9443</Typography>

                <Button variant="contained" color="secondary">
                  Call Us
                </Button>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box className="gettouchBox">
                <MdOutlineNotListedLocation />
                <Typography variant="h2">Location</Typography>
                <Typography variant="body2">
                  Jeddah | Prince Sultan Rd, AVED Building
                </Typography>

                <Button variant="contained" color="secondary">
                  Visit Us
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <ContactUs />

        <Box className="main-sectionGap">
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              zIndex: "999",
              paddingTop: "30.25%", // 16:9 aspect ratio
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.142155239503!2d-122.41941558468186!3d37.774929279759225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b8b8b8b8b%3A0xb8b8b8b8b8b8b8b8!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1617120119817!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{
                border: 0,
                position: "absolute",
                top: 0,
                left: 0,
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </Box>
      </ContactUSBox>
    </>
  );
}

Contactus.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
