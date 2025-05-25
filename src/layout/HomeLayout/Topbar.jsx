"use client";

import { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItemText,
  Box,
  Divider,
  ListItemButton,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import OutlinedInput from "@mui/material/OutlinedInput";
import { IoVideocamOutline } from "react-icons/io5";
import { MdWhatsapp } from "react-icons/md";

import { Close } from "@mui/icons-material";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LanguageIcon from "@mui/icons-material/Language";
import AppContext from "@/context/AppContext";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["ENG", "Arabic"];

const ResponsiveImg = styled("img")(({ theme }) => ({
  height: "25px",
  maxWidth: "100%",
  objectFit: "contain",
  cursor: "pointer",
  marginRight: "40px",
  [theme.breakpoints.down("md")]: {
    height: "30px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "25px",
  },

  [theme.breakpoints.down("xs")]: {
    height: "20px",
  },
}));
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  backgroundColor: "transparent",
  backdropFilter: "blur(0px)",
  opacity: 1,
  paddingTop: "0",
  paddingLeft: "0",
  paddingRight: "0",
}));

export default function Header() {
  // const { i18n } = useTranslation();
  console.log(i18n.language, "current language");
  const [personName, setPersonName] = useState(
    localStorage.getItem("language") === "ar" ? "Arabic" : "ENG" || "ENG"
  );
  const { t } = useTranslation();

  const auth = useContext(AppContext);
  const { language, setLanguage } = auth;
  const router = useRouter();
  console.log(language);
  const user = useSelector((state) => state.user);

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    console.log(selectedLanguage, "kdkd");
    console.log(i18n.isInitialized, "kdkd");
    setPersonName(selectedLanguage);
    console.log("Selected Language:", selectedLanguage);
    console.log(personName, "kdkd");

    if (selectedLanguage === "ENG") {
      setLanguage("en");
      router.push(router.pathname, { locale: "en" });
      localStorage.setItem("language", "en");
      console.log("english", "clicked");
      i18n.changeLanguage("en");
      window.location.reload();
    } else if (selectedLanguage === "Arabic") {
      setLanguage("ar");
      router.push(router.pathname, { locale: "ar" });
      localStorage.setItem("language", "ar");
      console.log("arabic", "clicked");
      i18n.changeLanguage("ar");
      window.location.reload();
    } else {
      console.log("Invalid language provided:", selectedLanguage);
    }
  };
  const styles = {
    menuItemStyles: {
      "&:hover": {
        backgroundColor: "rgb(37,130,106)", // Change to any color you prefer
        color: "#fff",
      },
      fontSize: "18px",
      padding: "10px 20px 10px 20px",
      "@media (max-width: 1200px)": {
        fontSize: "14px", // Smaller font size for tablets
      },
    },
    "& .marginZero": {
      marginLeft: "0px !important",
    },
 menuStyles: {
  fontSize: "12px !important",
  color: "#fff",
  textTransform: "uppercase",
  letterSpacing: "1.2px",
  fontFamily: '"Lato", sans-serif',
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-5px",
    left: 0,
    right: 0,
    margin: "0 auto",
    width: "50%",
    height: "1px",
    backgroundColor: "#fff",
    transform: "scaleX(0)",
    transformOrigin: "center",
    transition: "transform 0.3s ease",
  },
  "&:hover::after": {
    transform: "scaleX(1)",
  },

  "&.active::after": {
    transform: "scaleX(1)",
  },
},

    menuButton: {
      backgroundColor: "#5c4d44",
      color: "white",
      "&:hover": {
        backgroundColor: "rgb(37,130,106) !important",
      },
    },
    authButtons: {
      height: "fit-content",
    },
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [homeAnchorEl, setHomeAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  const toggleServices = () => {
    setOpenServices(!openServices);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuOpenHome = (event) => {
    setHomeAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuCloseHome = () => {
    setHomeAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 30,
        behavior: "smooth",
      });
    }
  };
  const [scrolled, setScrolled] = useState(false);
const currentRoute = router.pathname;
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10); // Change background if scrolled more than 10px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledAppBar position="fixed">
      <AppBar
        position="static"
        style={{
          backgroundColor: scrolled ? "rgb(92, 77, 68)" : "transparent",
          boxShadow: "none",
          padding: "2px 0",
          transition: "background-color 0.3s ease-in-out",
          borderRadius: "0px",
        }}
      >
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px !important",
            }}
          >
            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "", md: "flex" },
                gap: { xs: 1, md: 1, lg: 3 },
                alignItems: "center",
              }}
            >
              <ResponsiveImg
                src="/images/logowhite.svg"
                alt="Logo"
                onClick={() => router.push("/")}
              />
              <Box className="" sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  color="inherit"
                   className={currentRoute === "/" ? "active" : ""}
                  onClick={() => {
                    // scrollToSection("ecosystem");
                    router.push("/");
                  }}
                  sx={{
                    ...styles.menuStyles,
                    fontSize: "12px",
                    background: "none",
                  }}
                >
                  {t("home")}
                </Button>

                <Button
                  color="inherit"
                  // onClick={() => scrollToSection("ourcompany")}
                   className={currentRoute === "/about-us" ? "active" : ""}
                   onClick={() => router.push("/about-us")}
                  sx={{
                    ...styles.menuStyles,
                    fontSize: "12px",
                    background: "none",
                  }}
                >
                  {t("about_us")}
                </Button>
                <Button
                  color="inherit"
                  // onMouseOver={handleMenuOpen}
                   className={currentRoute === "/project" ? "active" : ""}
                   onClick={() => router.push("/project")}
                  // onClick={() => scrollToSection("whychooseus")}
                  sx={{
                    ...styles.menuStyles,
                    fontSize: "12px",
                    background: "none",
                  }}
                >
                  {t("investment")}
                </Button>
                <Button
                  color="inherit"
                   className={currentRoute === "/blogs" ? "active" : ""}
                   onClick={() => router.push("/blogs")}
                  // onClick={() => scrollToSection("insurance")}
                  sx={{
                    ...styles.menuStyles,
                    fontSize: "12px",
                    background: "none",
                  }}
                >
                  {t("blogs")}
                </Button>
                 <Button
                  color="inherit"
                   className={currentRoute === "/contact-us" ? "active" : ""}
                   onClick={() => router.push("/contact-us")}
                  // onClick={() => scrollToSection("insurance")}
                  sx={{
                    ...styles.menuStyles,
                    fontSize: "12px",
                    background: "none",
                  }}
                >
                  {t("contact")}
                </Button>
              </Box>

          
            </Box>

            <Box className="displayStart" style={{ gap: "20px" }}>
              <FormControl className="topbarselectBox">
                <Select
                  // multipsle
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  MenuProps={{}}
                  style={{ border: "none", background: "transparent" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      sx={{
                        "& .MuiBox-root": {
                          color: "#000", // default color
                        },
                        "&:hover .MuiBox-root, &:focus .MuiBox-root": {
                          color: "#fff", // on hover or focus
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "12px",
                          marginRight: "-4px",
                          gap: 1,
                          color: "#fff",
                        }}
                      >
                        {name === "ENG" ? "ENG" : "عربي"}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <>
                {/* <a
                  href="https://www.zoom.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="displayStart videoText"
                >
                  <IoVideocamOutline
                    style={{
                      cursor: "pointer",
                      fontSize: "21px",
                      color: "#fff",
                    }}
                  />
                  <span className="videoTexts">Instant Video Call </span>
                </a> */}

                <a
                  href="https://www.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="displayStart videoText"
                  style={{ color: "#fff" }}
                >
                  <MdWhatsapp
                    style={{
                      cursor: "pointer",
                      fontSize: "21px",
                      color: "#fff",
                    }}
                  />
                  <span className="videoTexts">WhatsApp</span>
                </a>

                <Button
                  variant="contained"
                  color="primary"
                  sx={styles.authButtons}
                  onClick={() => router.push("/contact-us")}
                >
                  {" "}
                  {/* {t("login")} */}
                  Get in Touch
                </Button>
              </>

              {/* Mobile Menu */}
              <IconButton
                color="#003a37 "
                edge="end"
                onClick={handleDrawerToggle}
                style={{background:"#5c4d44"}}
                sx={{ display: { md: "none" }, ...styles.menuButton }}
              >
                <MenuIcon color="white" />
              </IconButton>
            </Box>
            <Drawer
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "250px",
                  backgroundColor: "rgba(18, 18, 18, 0.7)", // Semi-transparent dark background
                  backdropFilter: "blur(10px)", // Apply blur effect
                  WebkitBackdropFilter: "blur(10px)", // For Safari support
                  color: "#fff",
                  padding: "10px",
                },
              }}
            >
              {/* Header with Logo and Close Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Image
                    src="/images/Landing/mobViewLogo.png"
                    alt="Lifesafe Logo"
                    width={100}
                    height={20}
                  />
              
                </Box>
                <IconButton onClick={handleDrawerToggle} sx={{ color: "#fff" }}>
                  <Close />
                </IconButton>
              </Box>

              <Divider
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  marginBottom: "10px",
                }}
              />

              {/* Navigation Links */}
              <List>
                <ListItemButton
                 onClick={() => {
                    // scrollToSection("ecosystem");
                    router.push("/");
                  }}
                >
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton
                 onClick={() => router.push("/about-us")}
                >
                  <ListItemText primary="About Us" />
                </ListItemButton>
                <ListItemButton
                  onClick={() => router.push("/project")}
                >
                  <ListItemText primary="Our Project" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => router.push("/blogs")}
                >
                  <ListItemText primary="Media" />
                </ListItemButton>
                <ListItemButton
              onClick={() => router.push("/contact-us")}
                >
                  <ListItemText primary="Contact" />
                </ListItemButton>
                
              </List>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
    </StyledAppBar>
  );
}
