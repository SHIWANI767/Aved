import React from "react";

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ProjectSlider from "./ProjectSlider";
import HomeLayout from "@/layout/HomeLayout";
import Mainroject from "./Mainroject";
import PropertyCarousel from "./PropertyCarousel";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import { Container } from "@mui/material";



const LandingPage = styled("Box")(({ theme }) => ({
  position: "relative",
}));

export default function Project() {
  const { t } = useTranslation();

  const router = useRouter();
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <LandingPage>
 
      <ProjectSlider />
           <Container>
      <PropertyTypeDropdown  />

      <PropertyCarousel />
        </Container>
 
      {/* <Mainroject /> */}
    
    </LandingPage>
  );
}

Project.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
