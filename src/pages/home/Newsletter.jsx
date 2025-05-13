"use client";
import {
  Box,
  Paper,
  Typography,
  styled,
  Grid,
  TextField,
  IconButton,
  useMediaQuery,
  InputAdornment,
  useTheme,
  Container,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
const MarquemainBox = styled("Box")(({ theme }) => ({
  "& .mainBox": {
    position: "fixed",
    bottom: "-100%",
    zIndex: 9999,
    background: "#170F24",
    width: "100%",
    borderRadius: "0px",
    padding: "20px 0",
    opacity: 0,
    transition: "all 0.5s ease-in-out !important",
    transform: "translateY(100%)",

    "&.open": {
      bottom: "0px",
      opacity: 0,
      transform: "translateY(-0px)",
    },

    "&.scrolled": {
      transform: "translateY(0px)",
      bottom: "0px",
      opacity: 1,
    },

    "& .closeIconBox": {
      position: "absolute",
      right: "20px",
      top: "-20px",
      background: " #15f390",
      "& svg": {
        color: "#222",
      },
    },
    "& .MuiOutlinedInput-root": {
      height: "48px",
      borderRadius: "100px",
    },
    "& .MuiOutlinedInput-input": {
      padding: "14px 2px",
    },
  },
}));

export default function Newsletter({ open, handleClose }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MarquemainBox>
      <Paper
        elevation={1}
        className={`mainBox ${open ? "open" : ""} ${
          isScrolled ? "scrolled" : ""
        }`}
      >
        <IconButton className="closeIconBox" onClick={handleClose}>
          <IoClose style={{ fontSize: "20px" }} />
        </IconButton>
        <Container maxWidth="lg">
          <Grid container spacing={isSmallScreen ? 2 : 4} alignItems="center">
            <Grid item xs={12} sm={7}>
              <Typography
                variant={isSmallScreen ? "body1" : "h6"}
                color="primary"
                fontWeight="300"
              >
                STAY UPDATED
              </Typography>
              <Box>
                <Typography
                  variant={isSmallScreen ? "body2" : "body1"}
                  color="primary"
                  fontWeight="400"
                  mt={0.5}
                >
                  Never Miss Out on New Features and Insights
                </Typography>
                <Typography
                  variant={isSmallScreen ? "body2" : "body1"}
                  color="secondary"
                  fontWeight="400"
                  mt={0.5}
                >
                  Stay informed with the latest updates, product enhancements,
                  and insider info.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box
                className="subsCribeBox"
                style={{
                  position: "relative",
                  gap: "10px",
                  flexDirection: isSmallScreen ? "column" : "row",
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  size={isSmallScreen ? "small" : "medium"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {/* <IconButton
                          aria-label="search"
                          edge="end"
                          onClick={() => alert("Search button clicked")}
                        >
                          <IoIosSend />
                        </IconButton> */}

                        <Button
                          variant="contained"
                          color="primary"
                          style={{
                            padding: "13px 26px",
                            marginRight: "-9px",
                            textTransform: "uppercase",
                          }}
                        >
                          Sign Up Now
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </MarquemainBox>
  );
}
