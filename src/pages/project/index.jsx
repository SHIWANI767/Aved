import React from "react";

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ProjectSlider from "./ProjectSlider";
import HomeLayout from "@/layout/HomeLayout";
import PropertyCarousel from "./PropertyCarousel";
import { Container } from "@mui/material";
import Filter from "./Filter";



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
            <Filter />
      <PropertyCarousel />
        </Container>

    </LandingPage>
  );
}

Project.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
