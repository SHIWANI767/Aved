import React, { useEffect } from "react";
import HomeLayout from "@/layout/HomeLayout";
import { Box } from "@mui/material";
import Banner from "./home/Banner";
import AppDownload from "./home/AppDownload";
import FaqManin from "./home/FaqManin";
import FeaturesCard from "./home/FeaturesCard";
import WhyChooseUs from "./home/WhyChooseUs";
import Insurance from "./home/InsuranceBox";
import OurCompany from "./home/OurCompany";
import BestServices from "./home/BestServices";
import CarouselComp from "./home/CarouselComp";
import ZendeskChat from "./home/ZendeskChat";
import PropertyTypeDropdown from "./about-us/PropertyTypeDropdown";
import AboutUs from "./home/AboutUs";
import Properties from "./home/Properties";
import Client from "./home/Client";
import ContactUs from "./home/ContactUs";
import Property from "./home/Property";

export default function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      let searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has("id")) {
        let param = searchParams.get("id");
        const getdiv = document.getElementById(param);
        if (getdiv) {
          const ofsetTop = getdiv.offsetTop - 30;
          window.requestAnimationFrame(() => {
            window.scrollTo({
              top: ofsetTop, // Add 200px to the scroll positi
              behavior: "smooth",
            });
          });
        }
      }
    };
    handleScroll();
  }, [location.pathname]);

  return (
    <Box>
      <Box className="bannerlanding">
        <Box id="ecosystem">
          <Banner />
        </Box>
        <PropertyTypeDropdown />
        <AboutUs />
        <Properties />
        <Client />
        <Property />
        <ContactUs />
        <FaqManin />
        {/* <Box id="ourcompany">
          <OurCompany />
        </Box>

        <WhyChooseUs />

        <Box id="insurance">
          <Insurance />
        </Box>
        <AppDownload />
        <CarouselComp />

        <Box id="whychooseus">
          <BestServices />
        </Box>
        <Box id="faq">
  
        </Box>
        <ZendeskChat /> */}
      </Box>
    </Box>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
