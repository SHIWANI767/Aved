import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";

const SplashContainer = styled(Box)`
  &.splash-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: opacity 1s ease;
    background: rgba(255, 255, 255, 1);
    flex-direction: column;
  }
`;

const LogoWrapper = styled(Box)`
  &.logo-wrapper {
    position: relative;
    width: 200px;
    height: 178px;

    @media (max-width: 600px) {
      width: 165px;
      height: 140px;
    }
  }
`;

const LogoImage = styled(motion.img)`
  &.logo-image {
    position: absolute;
    top: 0;
    left: 0%;
    transform: translate(-50%, -50%);

    @media (max-width: 600px) {
      width: 200px;
      height: 200px;
      margin-left: -1px !important;
      margin: -15px;
    }
  }
`;

const TextContainer = styled(Box)`
  &.text-container {
    display: flex;
    gap: 5px;
  }
`;

const TextLetter = styled(motion.span)`
  &.text-letter {
    font-size: 42px;
    font-weight: bold;
    color: rgb(13 89 56);
    font-style: Italic !important;

    @media (max-width: 600px) {
      font-size: 36px;
    }
  }
`;

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 4000); // Fade out after 4s
    const cleanup = setTimeout(() => setVisible(false), 5000); // Remove after 5s

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanup);
    };
  }, []);

  if (!visible) return null;

  return (
    <SplashContainer
      className="splash-container"
      style={{ opacity: fadeOut ? 0 : 1 }}
    >
      <LogoWrapper className="logo-wrapper">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewBox="0 0 300 300"
        >
          <motion.circle
            cx="150"
            cy="150"
            r="100"
            stroke="rgb(0 83 49)"
            strokeWidth="12"
            fill="none"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.svg>

        <LogoImage
          className="logo-image"
          src="/images/Landing/Splash2.png"
          alt="Favicon Logo"
          width="200px"
          height="200px"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </LogoWrapper>

      <TextContainer className="text-container">
        {["N", "e", "s", "b", "a"].map((letter, index) => (
          <TextLetter
            className="text-letter"
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 + index * 0.2 }}
          >
            {letter}
          </TextLetter>
        ))}
      </TextContainer>
    </SplashContainer>
  );
};

export default SplashScreen;
