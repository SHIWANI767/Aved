import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  styled,
  Grid,
  Typography,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import PropertySection from "./PropertySection";
import DashboardLayout from "../../layout";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { apiRouterCall } from "@/api-services/service";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import toast from "react-hot-toast";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { toggleBookmarkState } from "@/store/slices/availablePropertySlice";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import AppContext from "src/context/AppContext";
import i18n from "@/i18n";

const Transition = Slide;

const MainComponent = styled(Box)(({ theme }) => ({
  "& .upperSection": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    "@media(max-width: 768px)": {
      justifyContent: "flex-end",
    },
  },
  "& .leftContent": {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    "@media(max-width: 768px)": {
      display: "none",
    },
  },
  "& .photoTourSection": {
    position: "absolute",
    top: 20,
    left: 20,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    borderRadius: "15px",
    justifyContent: "center",
    padding: "5px",
    width: "fit-content",
    border: "1px solid #ddd",
    "& .photoTourButton": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      padding: "5px 10px",
      cursor: "pointer",
      "&:hover": {
        color: "rgb(37,130,106)",
      },
    },
  },
  "& .imageCount": {},
}));

export default function PropertyDetails() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const property = useSelector((state) => state.property);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AppContext);

  const dispatch = useDispatch();

  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
  };
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  console.log(property)

  const handleClose = () => setOpen(false);
  const handleCloseTour = () => setIsOpen(false);

  const [isBookmarked, setIsBookmarked] = useState(
    property?.propertyDetails?.isBookmarked || false
  );
  useEffect(() => {
    setIsBookmarked(property?.propertyDetails?.isBookmarked || false);
  }, [property?.propertyDetails?.isBookmarked]);

  const toggleBookmark = async () => {
    console.log(property);
    setIsLoading(true);
    try {
      const response = await apiRouterCall({
        method: isBookmarked ? "DELETE" : "POST",
        endPoint: isBookmarked ? "removeBookmark" : "addToBookmark",
        token: user?.userInfo?.token,
        bodyData: {
          user: user?.userInfo?._id,
          property: property?.propertyDetails?._id,
        },
      });

      if (response?.data?.message) {
        if (
          response?.data?.message ===
          "You have successfully bookmarked the property." ||
          response?.data?.message === "Bookmark removed successfully"
        ) {
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
        console.log(
          `Property ${isBookmarked ? "removed from" : "added to"
          } bookmark successfully`
        );
        dispatch(toggleBookmarkState());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      auth.setBookmarkCounts(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <MainComponent>
        <Box className="upperSection" mb={2}>
          <Box className="leftContent">
            <Typography variant="body3">
              {t("property_details.properties")}
            </Typography>
            <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
            <Typography
              variant="body3"
              color="secondary"
              sx={{
                maxWidth: "100%", // or use fixed width like '300px' if needed
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              {i18n.language === "en"
                ? property?.propertyDetails?.title
                : property?.propertyDetails?.title_ar}
            </Typography>

          </Box>
          {property?.propertStatus !== "exited" && (
            <>
              {" "}
              <Button
                variant={isBookmarked ? "contained" : "outlined"}
                color="primary"
                startIcon={
                  isHovered || isBookmarked ? (
                    <BookmarkIcon />
                  ) : (
                    <TurnedInNotIcon />
                  )
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                  display: { xs: "none", sm: "none", lg: "flex" },
                  flexDirection: (theme) =>
                    theme.direction === "rtl" ? "row-reverse" : "row",
                  gap: 1, // Ensures spacing between icon and text
                }}
                onClick={toggleBookmark}
              >
                {isLoading ? t("loading") : t("bookmark")}
              </Button>
              <IconButton
                onClick={toggleBookmark}
                sx={{
                  display: { xs: "flex", sm: "flex", lg: "none" },
                  borderRadius: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow:
                    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                }}
              >
                {isBookmarked ? (
                  <BookmarkRemoveIcon sx={{ color: "#000" }} />
                ) : (
                  <BookmarkAddIcon sx={{ color: "#000" }} />
                )}
              </IconButton>
            </>
          )}
        </Box>
        <Box mt={2}>
          <Grid container spacing={2}>
            {property?.propertyDetails?.photos?.length === 1 && (
              <Grid item lg={12} xs={12} sm={12} md={12} position={"relative"}>
                <Box
                  onClick={() => handleOpen(0)}
                  sx={{
                    backgroundImage: `url(${property?.propertyDetails?.photos[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    height: 400,
                    backgroundRepeat: "no-repeat",
                    cursor: "pointer",
                  }}
                />
                <Box className="photoTourSection">
                  <Box
                    onClick={() => handleOpen(0)} // Ensure modal opens on click
                    className="photoTourButton"
                    sx={{
                      borderRight: "2px solid #000",
                      paddingRight: "10px",
                      cursor: "pointer", // Ensures it's clickable
                      transition: "background-color 0.3s ease-in-out",
                      "&:hover": {
                        color: "rgb(37,130,106)", // Green overlay on hover
                      },
                    }}
                  >
                    <PhotoLibraryIcon
                      fontSize="small"
                      style={{ color: "rgb(37,130,106)" }}
                    />
                    <Typography variant="body3">
                      {property?.propertyDetails?.photos?.length}{" "}
                      {t("property_details.photos")}
                    </Typography>
                  </Box>
                  <Box
                    className="photoTourButton"
                    onClick={() => setIsOpen(true)}
                    sx={{ marginLeft: "2px" }}
                  >
                    <PlayCircleIcon
                      fontSize="small"
                      style={{ color: "rgb(37,130,106)" }}
                    />
                    <Typography variant="body3">
                      {t("property_details.virtualTour")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )}

            {property?.propertyDetails?.photos?.length === 2 &&
              property?.propertyDetails?.photos.map((img, index) => (
                <Grid
                  item
                  lg={6}
                  xs={12}
                  sm={12}
                  md={12}
                  key={index}
                  position={"relative"}
                >
                  <Box
                    onClick={() => handleOpen(index)}
                    sx={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "8px",
                      height: 400,
                      cursor: "pointer",
                    }}
                  />

                  {index === 0 ? (
                    <Box className="photoTourSection">
                      <Box
                        className="photoTourButton"
                        onClick={() => handleOpen(index)}
                        sx={{
                          borderRight:
                            i18n.language === "en" ? "2px solid #000" : "0",
                          borderLeft:
                            i18n.language === "ar" ? "2px solid #000" : "0",
                          paddingRight: "10px",
                        }}
                      >
                        <PhotoLibraryIcon
                          fontSize="small"
                          style={{ color: "rgb(37,130,106)" }}
                        />
                        <Typography variant="body3">
                          {property?.propertyDetails?.photos?.length}{" "}
                          {t("property_details.photos")}
                        </Typography>
                      </Box>
                      <Box
                        className="photoTourButton"
                        onClick={() => setIsOpen(true)}
                        sx={{ marginLeft: "2px" }}
                      >
                        <PlayCircleIcon
                          fontSize="small"
                          style={{ color: "rgb(37,130,106)" }}
                        />
                        <Typography variant="body3">
                          {t("property_details.virtualTour")}
                        </Typography>
                      </Box>
                    </Box>
                  ) : null}
                </Grid>
              ))}

            {property?.propertyDetails?.photos?.length === 3 && (
              <>
                <Grid item lg={6} xs={12} sm={12} md={12} position={"relative"}>
                  <Box
                    onClick={() => handleOpen(0)}
                    sx={{
                      backgroundImage: `url(${property?.propertyDetails?.photos[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "8px",
                      height: 400,
                      cursor: "pointer",
                    }}
                  />
                  <Box className="photoTourSection">
                    <Box
                      className="photoTourButton"
                      sx={{
                        borderRight: "2px solid #000",
                        paddingRight: "10px",
                      }}
                      onClick={() => handleOpen(0)}
                    >
                      <PhotoLibraryIcon
                        fontSize="small"
                        style={{ color: "rgb(37,130,106)" }}
                      />
                      <Typography variant="body3">
                        {property?.propertyDetails?.photos?.length}{" "}
                        {t("property_details.photos")}
                      </Typography>
                    </Box>
                    <Box
                      className="photoTourButton"
                      onClick={() => setIsOpen(true)}
                      sx={{ marginLeft: "2px" }}
                    >
                      <PlayCircleIcon
                        fontSize="small"
                        style={{ color: "rgb(37,130,106)" }}
                      />
                      <Typography variant="body3">
                        {t("property_details.virtualTour")}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    },
                  }}
                >
                  <Box
                    onClick={() => handleOpen(1)}
                    sx={{
                      backgroundImage: `url(${property?.propertyDetails?.photos[1]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "8px",
                      height: 400,
                      backgroundRepeat: "no-repeat",
                      cursor: "pointer",
                    }}
                  />
                </Grid>
                <Grid
                  item
                  lg={3}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    },
                  }}
                >
                  <Box
                    onClick={() => handleOpen(2)}
                    sx={{
                      backgroundImage: `url(${property?.propertyDetails?.photos[2]})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      borderRadius: "8px",
                      height: 400,
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              </>
            )}

            {property?.propertyDetails?.photos?.length === 4 && (
              <>
                <Grid item lg={6} xs={12} sm={12} md={12} position={"relative"}>
                  <Box
                    onClick={() => handleOpen(0)}
                    sx={{
                      backgroundImage: `url(${property?.propertyDetails?.photos[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "8px",
                      height: 400,
                      cursor: "pointer",
                    }}
                  />
                  <Box className="photoTourSection">
                    <Box
                      className="photoTourButton"
                      onClick={() => handleOpen(0)}
                      sx={{
                        borderRight: "2px solid #000",
                        paddingRight: "10px",
                      }}
                    >
                      <PhotoLibraryIcon
                        fontSize="small"
                        style={{ color: "rgb(37,130,106)" }}
                      />
                      <Typography variant="body3">
                        {property?.propertyDetails?.photos?.length}{" "}
                        {t("property_details.photos")}
                      </Typography>
                    </Box>
                    <Box
                      className="photoTourButton"
                      onClick={() => setIsOpen(true)}
                      sx={{ marginLeft: "2px" }}
                    >
                      <PlayCircleIcon
                        fontSize="small"
                        style={{ color: "rgb(37,130,106)" }}
                      />
                      <Typography variant="body3">
                        {t("property_details.virtualTour")}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    },
                  }}
                >
                  {property?.propertyDetails?.photos
                    .slice(1, 3)
                    .map((img, index) => (
                      <Box
                        key={index}
                        onClick={() => handleOpen(index + 1)}
                        sx={{
                          backgroundImage: `url(${img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "8px",
                          backgroundRepeat: "no-repeat",
                          height: 160,
                          mb: index === 0 ? 1 : 0,
                          cursor: "pointer",
                        }}
                      />
                    ))}
                </Grid>
                <Grid
                  item
                  lg={3}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    },
                  }}
                >
                  <Box
                    onClick={() => handleOpen(3)}
                    sx={{
                      backgroundImage: `url(${property?.propertyDetails?.photos[3]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "8px",
                      height: 400,
                      cursor: "pointer",
                    }}
                  />
                </Grid>
              </>
            )}

            {property?.propertyDetails?.photos?.length >= 5 && (
              <>
                <Grid item lg={6} xs={12} sm={12} md={12} position={"relative"}>
                  <Box
                    onClick={() => handleOpen(0)}
                    sx={{
                      backgroundImage: `url(${property?.propertyDetails?.photos[0]})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      borderRadius: "8px",
                      height: 400,
                      cursor: "pointer",
                    }}
                  />
                  <Box className="photoTourSection">
                    <Box
                      className="photoTourButton"
                      onClick={() => handleOpen(0)}
                      sx={{
                        borderRight: "2px solid #000",
                        paddingRight: "10px",
                      }}
                    >
                      <PhotoLibraryIcon
                        fontSize="small"
                        style={{ color: "rgb(37,130,106)" }}
                      />
                      <Typography variant="body3">
                        {property?.propertyDetails?.photos?.length}{" "}
                        {t("property_details.photos")}
                      </Typography>
                    </Box>
                    <Box
                      className="photoTourButton"
                      onClick={() => setIsOpen(true)}
                      sx={{ marginLeft: "2px" }}
                    >
                      <PlayCircleIcon
                        fontSize="small"
                        style={{ color: "rgb(37,130,106)" }}
                      />
                      <Typography variant="body3">
                        {t("property_details.virtualTour")}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  lg={3}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    },
                  }}
                >
                  {property?.propertyDetails?.photos
                    .slice(1, 3)
                    .map((img, index) => (
                      <Box
                        key={index}
                        onClick={() => handleOpen(index + 1)}
                        sx={{
                          backgroundImage: `url(${img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "8px",
                          backgroundRepeat: "no-repeat",
                          height: 195,
                          mb: index === 0 ? 1 : 0,
                          cursor: "pointer",
                        }}
                      />
                    ))}
                </Grid>
                <Grid
                  item
                  lg={3}
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "none",
                      lg: "block",
                    },
                  }}
                >
                  {property?.propertyDetails?.photos
                    .slice(3, 5)
                    .map((img, index) => (
                      <Box
                        key={index}
                        onClick={() => handleOpen(index + 3)}
                        sx={{
                          backgroundImage: `url(${img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "8px",
                          backgroundRepeat: "no-repeat",
                          height: 195,
                          mb: index === 0 ? 1 : 0,
                          cursor: "pointer",
                        }}
                      />
                    ))}
                </Grid>
              </>
            )}
          </Grid>
          <Box
            className="imageCount"
            sx={{
              display: "flex",
              marginTop: "5px",
              marginBottom: "7px",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          />
        </Box>
        <PropertySection property={property} />
      </MainComponent>

      {/* Virtual Tour Modal */}
      <Dialog
        open={isOpen}
        onClose={handleCloseTour}
        fullScreen={isFullscreen}
        maxWidth="md"
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
            padding: "1px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "rgba(255, 255, 255, 0.2)",
            p: 2,
            borderRadius: "16px 16px 0 0",
          }}
        >
          <Typography variant="h4" color="primary" fontWeight="bold">
            {t("property_details.virtualTour")}
          </Typography>

          <Box>
            {/* Fullscreen Toggle */}
            <IconButton
              onClick={toggleFullscreen}
              sx={{ color: "#000", mr: 1 }}
            >
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>

            {/* Close Button */}
            <IconButton onClick={handleCloseTour} sx={{ color: "#000" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              width: "100%",
              height: isFullscreen ? "90vh" : "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {property?.propertyDetails?.image3d &&
              property?.propertyDetails?.image3d.endsWith(".glb") ? (
              <model-viewer
                src={property.propertyDetails.image3d}
                alt="3D Virtual Tour"
                auto-rotate
                camera-controls
                ar
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Typography variant="h4" color="primary">
                {t("property_details.noVirtualTourAvailable")}
              </Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      {/* Modal with Carousel */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        style={{ cursor: "pointer" }}
      >
        <Box sx={{ position: "relative", p: 2 }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: -18, top: -14, zIndex: 99999 }}
          >
            <CloseIcon style={{ color: "#000" }} />
          </IconButton>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            initialSlide={selectedIndex}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{
              delay: 2000, // Auto-swipe every 3 seconds
              disableOnInteraction: false, // Keeps autoplay running after user interaction
            }}
          >
            {property?.propertyDetails?.photos?.map((img, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    height: "700px",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: `url(${img})`,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Dialog>
    </Container>
  );
}

PropertyDetails.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
