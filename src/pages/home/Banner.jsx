import React from "react";

import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import Slider from "./Slider";

const LandingPage = styled("Box")(({ theme }) => ({
  position: "relative",
}));

export default function Banner() {
  const { t } = useTranslation();

  const router = useRouter();
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <LandingPage>
      <Slider />
    </LandingPage>
  );
}
