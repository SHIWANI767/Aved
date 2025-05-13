"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Collapse,
} from "@mui/material";
import {
  PersonOutlined as PersonIconOutlined,
  MenuOutlined as MenuIconOutlined,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material"; // Correct import for outlined icons
import { RiHomeSmileLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { RiLineChartLine } from "react-icons/ri";
import { LiaAwardSolid } from "react-icons/lia";
import { MdOutlineShoppingCart } from "react-icons/md";
import LanguageIcon from "@mui/icons-material/Language";
import { IoMdHelpCircleOutline } from "react-icons/io";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import { UseTranslation, useTranslation } from "next-i18next";
import i18n from "@/i18n";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import { setCartItems } from "../../store/slices/cartSlice";
import { usePathname, useRouter } from "next/navigation";
import CustomModal from "@/components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { apiRouterCall } from "@/api-services/service";
import { logout } from "@/store/slices/userSlice";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AppContext from "@/context/AppContext";
const drawerWidth = 280;

const style = {
  listItemButton: {
    "&.Mui-selected": {
      bgcolor: "rgba(0, 230, 150, 0.08)",
      "&:hover": {
        bgcolor: "rgba(0, 230, 150, 0.12)",
      },
    },
    "&:hover": {
      bgcolor: "rgba(0, 230, 150, 0.04)",
    },
  },
};

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language, setLanguage] = useState(
    i18n.language === "ar" ? "Arabic" : "English" || "English"
  );
  const router = useRouter();
  const pathname = usePathname();
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [bookmarkCount, setBookmarkCount] = useState();
  const dispatch = useDispatch();
  const auth = useContext(AppContext);
  const { t } = useTranslation();

  const user = useSelector((state) => state.user);
  const { cartCount, setCartCount, bookmarkCounts, setBookmarkCounts } = auth;
  const fetchCartData = async () => {
    try {
      const response = await apiRouterCall({
        method: "GET",
        endPoint: "getCartDetails",
        token: user?.userInfo?.token,
      });
      if (response?.data?.data) {
        setCartData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setCartCount(false);
    }
  };

  const fetchBookmarkData = async () => {
    try {
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getBookmark",
        token: user?.userInfo?.token,
        paramsData: {
          userId: user?.userInfo?._id,
        },
      });

      if (res?.data) {
        setBookmarkCount(res?.data.length || 0);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log("Error while getting available properties", error);
    } finally {
      setBookmarkCounts(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [cartCount]); // Depend on token instead of whole user object
  useEffect(() => {
    fetchBookmarkData();
  }, [bookmarkCounts]); // Depend on token instead of whole user object

  const menuItems = [
    {
      text: t("investment_opportunities"),
      icon: <RiHomeSmileLine />,
      path: "/dashboard/properties",
    },
    {
      text: t("investment_portfolio"),
      icon: <RiLineChartLine />,
      path: "/dashboard/portfolio",
    },
    {
      text: t("wallet"),
      icon: <IoWalletOutline />,
      path: "/dashboard/wallet",
    },
    {
      text: t("transactions"),
      icon: <MonetizationOnOutlinedIcon />,
      path: "/dashboard/transactions",
    },
    {
      text: t("my_rewards"),
      icon: <LiaAwardSolid />,
      path: "/dashboard/rewards",
    },
    {
      text: `${t("my_cart")} ${
        cartData.length >= 1 ? `(${cartData.length})` : ""
      }`,
      icon: <MdOutlineShoppingCart />,
      path: "/dashboard/cart",
    },
  ];

  const isArabic = i18n.language === "ar";
  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    if (selectedLanguage === "English") {
      setLanguage("English");
      // router.push(router.pathname, { locale: "en" });
      localStorage.setItem("language", "en");
      i18n.changeLanguage("en");
      window.location.reload();
    } else if (selectedLanguage === "Arabic") {
      setLanguage("Arabic");
      // router.push(router.pathname, { locale: "ar" });
      localStorage.setItem("language", "ar");
      i18n.changeLanguage("ar");
      window.location.reload();
    } else {
      console.log("Invalid language provided:", selectedLanguage);
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleAccountMenuToggle = () => {
    setOpenAccountMenu(!openAccountMenu);
  };
  console.log(i18n.language);
  const drawer = (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          pt: 3,
          pl: 3,
          pb: 2,
          pr: i18n.language === "ar" ? 2 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/images/Landing/nesba_white.png"
          alt=""
          height={"23px"}
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        />
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <Select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              handleChange(e);
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              padding: 0,
              "&:hover": {
                "& .MuiSvgIcon-root": {
                  color: "rgb(37, 130, 106)",
                },
              },
              "& .MuiSvgIcon-root": {
                color: "#505050",
              },
              color: "#505050 !important",
              border: "unset",
            }}
          >
            <MenuItem value="English">
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <LanguageIcon />
                EN
              </Box>
            </MenuItem>
            <MenuItem value="Arabic">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LanguageIcon />
                عربي
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider
        sx={{
          backgroundColor: "#0000001A",
        }}
      />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname.includes(item.path)}
              onClick={() => {
                router.push(item.path);
                if (isMobile) handleDrawerToggle();
              }}
              sx={style.listItemButton}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto", // Avoid the icon being squeezed by the default width
                  fontSize: "25px", // Increase icon size here
                  color: pathname.includes(item.path) ? "#25826A" : "inherit",
                  marginRight: "12px",
                }}
              >
                {React.cloneElement(item.icon, {})}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body3"
                    sx={{
                      fontWeight: "500",
                      color: pathname === item.path ? "black" : "",
                    }}
                  >
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton
          sx={style.listItemButton}
          onClick={handleAccountMenuToggle}
        >
          <ListItemIcon
            sx={{
              minWidth: "auto", // Avoid the icon being squeezed by the default width
              fontSize: "25px", // Increase icon size here
              // color: pathname === item.path ? "#25826A" : "inherit",
              marginRight: "12px",
            }}
          >
            <PersonIconOutlined />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body3"
                sx={{
                  fontWeight: "500",
                  // color: pathname === item.path ? "black" : "",
                }}
              >
                {t("account_overview")}
              </Typography>
            }
          />
          {openAccountMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openAccountMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ ...style.listItemButton, pl: 4 }}
              onClick={() => router.push("/dashboard/myaccount")}
              selected={pathname.includes("/dashboard/myaccount")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto", // Avoid the icon being squeezed by the default width
                  fontSize: "25px", // Increase icon size here
                  color: pathname.includes("/dashboard/myaccount")
                    ? "#25826A"
                    : "inherit",
                  marginRight: "12px",
                }}
              >
                <AppSettingsAltIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body3"
                    sx={{
                      fontWeight: "500",
                      color: pathname.includes("/dashboard/profile")
                        ? "black"
                        : "",
                    }}
                  >
                    {t("profile_settings")}
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              sx={{ ...style.listItemButton, pl: 4 }}
              onClick={() => router.push("/dashboard/bookmarks")}
              selected={pathname.includes("/dashboard/bookmarks")}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto", // Avoid the icon being squeezed by the default width
                  fontSize: "25px", // Increase icon size here
                  color:
                    pathname === "/dashboard/bookmarks" ? "#25826A" : "inherit",
                  marginRight: "12px",
                }}
              >
                <BookmarkBorderIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body3"
                    sx={{
                      fontWeight: "500",
                      color: pathname === "/dashboard/profile" ? "black" : "",
                    }}
                  >
                    {t("bookmarks")}&nbsp;
                    {bookmarkCount >= 1 && `(${bookmarkCount})`}
                  </Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4, color: "#ff3c3c" }}
              onClick={() => setOpenLogoutModal(true)}
            >
              <ListItemIcon
                sx={{
                  minWidth: "auto", // Avoid the icon being squeezed by the default width
                  fontSize: "25px", // Increase icon size here
                  color: "#ff3c3c",
                  marginRight: "12px",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body3"
                    sx={{
                      fontWeight: "500",
                      color: pathname === "/dashboard/profile" ? "black" : "",
                    }}
                  >
                    {t("logout")}
                  </Typography>
                }
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Box sx={{ position: "absolute", bottom: 0, width: "90%", p: 2 }}>
        <ListItemButton
          selected={pathname === "/dashboard/helpandsupport"}
          onClick={() => {
            // router.push(item.path);
            if (isMobile) handleDrawerToggle();
            router.push("/dashboard/helpandsupport");
          }}
          sx={{
            padding: "0px",
            "&.Mui-selected": {
              bgcolor: "rgba(0, 230, 150, 0.08)",
              "&:hover": {
                bgcolor: "rgba(0, 230, 150, 0.12)",
              },
            },
            "&:hover": {
              bgcolor: "rgba(0, 230, 150, 0.04)",
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "auto", // Avoid the icon being squeezed by the default width
              fontSize: "27px", // Increase icon size here
              color:
                pathname === "/dashboard/helpandsupport"
                  ? "#25826A"
                  : "inherit",
              marginRight: "12px",
            }}
          >
            {React.cloneElement(<IoMdHelpCircleOutline />, {
              sx: { fontSize: "30px" },
            })}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: "16px !important",
                  color: "black",
                }}
              >
                {t("help_support")}
              </Typography>
            }
          />
        </ListItemButton>
      </Box>

      <CustomModal
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        title={t("logout")}
        description={t("logout_confirmation")}
        actions={[
          {
            label: t("no"),
            props: {
              variant: "contained",
              color: "primary",
              onClick: () => setOpenLogoutModal(false),
            },
          },
          {
            label: t("yes"),
            props: {
              variant: "outlined",
              color: "primary",
              onClick: () => {
                router.push("/");
                setOpenLogoutModal(false);
                dispatch(logout());
                sessionStorage.setItem("isLoggedIn", false);
                console.log("User logged out"); // Replace this with actual logout logic
              },
            },
          },
        ]}
      />
    </Box>
  );

  return (
    <>
      {isMobile && (
        <Box
          sx={{
            pt: 1,
            pl: 1,
            pb: 2,
            pr: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        >
          <img src="/images/Landing/nesba_white.png" alt="" height={"23px"} />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            // sx={{ position: "fixed", left: 16, top: 16, zIndex: 1100 }}
            sx={{
              color: "#fff",
              backgroundColor: "#003a37",
              "&:hover": {
                backgroundColor: "rgb(37,130,106) !important",
              },
            }}
          >
            <MenuIconOutlined
              sx={{
                color: "#fff",
                backgroundColor: "#003a37",
                "&:hover": {
                  backgroundColor: "rgb(37,130,106) !important",
                },
              }}
            />
          </IconButton>
        </Box>
      )}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                bgcolor: "background.paper",
                color: "#505050 !important",
                fontWeight: "600 !important",
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                color: "#505050 !important",
                bgcolor: "background.paper",
                borderRight: isArabic
                  ? "none"
                  : "1px solid rgba(0, 0, 0, 0.12)",
                borderLeft: isArabic ? "1px solid rgba(0, 0, 0, 0.12)" : "none",
                right: isArabic ? 0 : "auto",
                left: isArabic ? "auto" : 0,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>
    </>
  );
};

export default Sidebar;
