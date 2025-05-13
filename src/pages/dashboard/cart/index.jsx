import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layout";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import CustomModal from "@/components/CustomModal";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Loader from "@/components/PageLoader/Loader";
import NoDataFound from "@/components/NoDataFound";
import NoCartFound from "@/components/NoCartFound";
import AppContext from "@/context/AppContext";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
const style = {
  box: {
    p: 3,
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.4) 0px 8px 16px -2px, rgba(0, 0, 0, 0.35) 0px 4px 8px -3px",
      transform: "translateY(-4px)",
    },
  },
};

export default function Cart() {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [amounts, setAmounts] = useState({});
  const [cartDetails, setCartDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [propertyId, setPropertyId] = useState();
  const [loading, setLoading] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AppContext);
  const { setCartCount } = auth;

  const getCartData = async () => {
    setLoader(true);
    try {
      const response = await apiRouterCall({
        method: "GET",
        endPoint: "getCartDetails",
        token: user?.userInfo?.token,
      });
      if (response?.data?.data) {
        setData(response?.data?.data);
        // setPropertyId(response?.data?.data)
        const initialAmounts = {};
        response?.data?.data.forEach((item) => {
          initialAmounts[item._id] = item.amount;
        });
        console.log(initialAmounts);

        setAmounts(initialAmounts);
      } else {
        console.log("This is my error in else", response?.data);
      }
    } catch (error) {
      console.log("This is the error in the catch", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (data) {
      const updatedCartDetails = data.map((item) => ({
        propertyId: item.propertyId,
        amount: amounts[item._id] ?? item.amount,
        shareOwned: calculateSharesOwned(item._id, item),
        cartId: item?._id,
        propertyName: item?.propertyDetails[0]?.title,
      }));
      setCartDetails(updatedCartDetails);
    }
  }, [data, amounts]);

  const removeCartData = async (cartId) => {
    setLoading(true);
    try {
      const response = await apiRouterCall({
        method: "DELETE",
        endPoint: "removeCartData",
        token: user?.userInfo?.token,
        paramsData: {
          cartId: cartId ? cartId : propertyId,
        },
      });
      if (response?.data?.data) {
        toast.success(response?.data?.message);
        setCartCount(true);
        getCartData();
      } else {
        toast.error(response?.data?.message);
        console.log("There is some error in removing the data");
      }
    } catch (error) {
      console.log("This is the error in the catch block", error);
    } finally {
      setLoading(false);
    }
  };
  const addCheckout = async () => {
    setIsLoading(true);
    try {
      for (const item of cartDetails) {
        try {
          const res = await apiRouterCall({
            method: "POST",
            endPoint: "addInvestment",
            token: user?.userInfo?.token,
            bodyData: {
              user: user?.userInfo?._id,
              property: item.propertyId,
              investmentAmount: item.amount,
              noOfShares: Number(item.shareOwned),
            },
          });
          if (res?.data?.message === "Insufficient balance in your wallet") {
            toast.error(`${res?.data?.message} for ${item?.propertyName}`);
          } else if (res?.data?.Message === "Successfully updated") {
            removeCartData(item?.cartId); // Remove item from cart if API call succeeds
            toast.success(`Investment succeessfull for ${item?.propertyName}`);
          } else {
            toast.error(`${res?.data?.message} for ${item?.propertyName}`);
          }
        } catch (apiError) {
          console.log(apiError, "API call failed for item:", item);
          toast.error("Failed to add investments. Please try again.");
          break; // Terminate the loop on the first API failure
        }
      }
    } catch (error) {
      console.log(error, "Unexpected error in addCheckout");
      toast.error("Failed to process investments.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const handleDecrease = (id) => {
    setAmounts((prev) => {
      const item = data.find((item) => item._id === id);
      const minAmount = item?.shareValue || 1000;
      console.log("This is the prev", prev);
      console.log("This is the itm", item?.amount);

      const newAmount = (prev[id] ?? item?.amount) - 1000;

      return {
        ...prev,
        [id]: Math.max(newAmount.toFixed(2), minAmount), // Ensure it doesn't go below minAmount
      };
    });
  };

  const handleIncrease = (id) => {
    setAmounts((prev) => {
      const item = data.find((item) => item._id === id);
      const initialAmount = item?.amount;
      console.log("This is the prev", prev);
      console.log("This is the itm", item?.amount);

      return {
        ...prev,
        [id]: Number(((prev[id] ?? initialAmount) + 1000).toFixed(2)), // Ensure only the selected item is updated
      };
    });
  };
  const handleInputChange = (id, value) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: value,
    }));
    const item = data.find((item) => item._id === id);
    const minAmount = item?.shareValue || item?.amount;

    setErrorMessages((prev) => ({
      ...prev,
      [id]:
        value && value < minAmount
          ? `Amount cannot be less than value of 1 share`
          : "",
    }));
  };

  const handleBlur = (id) => {
    setAmounts((prev) => {
      const item = data.find((item) => item._id === id);
      const minAmount = item?.shareValue || item?.amount;
      const newValue = Number(prev[id]);

      return {
        ...prev,
        [id]: isNaN(newValue) || newValue < minAmount ? minAmount : newValue, // Assign valid value
      };
    });

    setErrorMessages((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const calculateSharesOwned = (id, item) => {
    const amount = amounts[id] ?? item.amount; // Use existing amount or fallback
    return (amount / (item?.shareValue || item?.amount)).toFixed(2);
  };

  const propertyIdn = amounts?._id;
  // const const

  return (
    <Container>
      <Box mt={3}>
        {" "}
        <Box className="displaySpacebetween">
          <Typography variant="h3">
            {t("myCart")}&nbsp;({data?.length})
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/dashboard/properties")}
          >
            {t("addMore")}
          </Button>
        </Box>
        <Grid container spacing={3} mt={0}>
          <Grid item lg={loader ? 12 : 8} md={12} sm={12} xs={12} height="auto">
            {loader ? (
              <Loader />
            ) : (
              data?.map((item, index) => (
                <Grid container key={index} sx={style.box} mb={2}>
                  <Grid item lg={4} md={4} sm={4} xs={4}>
                    <img
                      src={
                        item?.propertyDetails[0]?.photos[0] ||
                        item?.propertyDetails[0]?.photos[1]
                      }
                      alt="property"
                      width="90%"
                      height="100%"
                      style={{ borderRadius: "10px" }}
                    />
                  </Grid>
                  <Grid item lg={8} md={8} sm={8} xs={8}>
                    <Typography variant="h4" gutterBottom sx={{
                      maxWidth: "100%", // You can adjust the width as needed
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                    }}>
                      {i18n.language === "en"
                        ? item?.propertyDetails[0]?.title
                        : item?.propertyDetails[0]?.title_ar}
                    </Typography>
                    <Box
                      className="displayRow"
                      sx={{ justifyContent: "space-between" }}
                      mb={2}
                    >
                      <Box>
                        {" "}
                        <Typography variant="body3">
                          {" "}
                          {t("property_details.propertyPrice")}
                        </Typography>
                        <br />
                        <Typography variant="body3" className="outfitFonts">
                          SAR{" "}
                          {parseFloat(
                            item?.propertyDetails[0]?.propertyPrice
                          ).toLocaleString() || 0}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body3" color="primary">
                          {t("totalShareOwned")}
                        </Typography>
                        <br />
                        <Typography
                          variant="body3"
                          color="primary"
                          className="outfitFonts"
                        >
                          {calculateSharesOwned(item._id, item)} {t("shares")}
                        </Typography>
                      </Box>
                    </Box>
                    <Box mb={0.5}>
                      {" "}
                      <LinearProgress
                        variant="determinate"
                        value={
                          (item?.propertyDetails[0]?.fundingReceived /
                            item?.propertyDetails[0]?.propertyPrice) *
                          100
                        }
                        sx={{
                          height: 12,
                          borderRadius: 4,
                          backgroundColor: "#e0e0e0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#25826A",
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body3" className="outfitFonts">
                      {(
                        (item?.propertyDetails[0]?.fundingReceived /
                          item?.propertyDetails[0]?.propertyPrice) *
                        100
                      ).toFixed(2)}{" "}
                      % {t("funded")}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={2} mt={2}>
                      <Button
                        variant="outlined"
                        onClick={() => handleDecrease(item._id)}
                        disabled={amounts[item._id] <= item.shareValue}
                        sx={{
                          width: "36px", // Smaller square size
                          height: "36px", // Ensure square shape
                          minWidth: "32px", // Prevent resizing
                          minHeight: "32px",
                          borderRadius: "6px", // Slight rounding for a sleek look
                          border: "1.5px solid #25826A", // Keep the green border
                          color: "#25826A", // Icon color
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "4px",
                          "& .MuiSvgIcon-root": {
                            fontSize: "18px", // Adjust icon size
                          },
                          "&:hover": {
                            backgroundColor: "#25826A",
                            color: "white",
                          },
                          "&:disabled": {
                            border: "1.5px solid #ccc",
                            color: "#ccc",
                            backgroundColor: "#f8f8f8",
                          },
                        }}
                      >
                        <RemoveIcon />
                      </Button>

                      <TextField
                        type="number"
                        fullWidth
                        value={amounts[item._id] ?? item.amount}
                        onChange={(e) => {
                          const propertyPrice =
                            item?.propertyDetails[0]?.propertyPrice;
                          const limitPercentage =
                            item?.propertyDetails[0]?.investmentLimit; // Limit in percentage
                          const maxLimit =
                            (limitPercentage / 100) * propertyPrice; // Calculate max limit
                          console.log(maxLimit);
                          let value = parseFloat(e.target.value);
                          if (value > maxLimit) {
                            value = maxLimit; // Restrict value to max limit
                          }

                          handleInputChange(item._id, value);
                        }}
                        onBlur={() => handleBlur(item._id)} // Validate only after user stops typing
                        size="small"
                        sx={{
                          border: "1px solid #25826A",
                          borderRadius: "10px",
                          "& .MuiOutlinedInput-root": { padding: "5px 9px" },
                        }}
                      />

                      <Button
                        variant="outlined"
                        onClick={() => handleIncrease(item._id)}
                        sx={{
                          width: "36px", // Same as decrease button
                          height: "36px", // Maintain square shape
                          minWidth: "32px",
                          minHeight: "32px",
                          borderRadius: "6px", // Slight rounding for modern look
                          border: "1.5px solid #25826A", // Green border
                          color: "#25826A", // Icon color
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "4px",
                          "& .MuiSvgIcon-root": {
                            fontSize: "18px", // Adjust icon size
                          },
                          "&:hover": {
                            backgroundColor: "#25826A",
                            color: "white",
                          },
                          "&:disabled": {
                            border: "1.5px solid #ccc",
                            color: "#ccc",
                            backgroundColor: "#f8f8f8",
                          },
                        }}
                      >
                        <AddIcon />
                      </Button>
                    </Box>

                    {errorMessages[item._id] && (
                      <Alert
                        severity="error"
                        sx={{
                          mt: 1,
                          fontSize: "12px",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {errorMessages[item._id]}
                      </Alert>
                    )}

                    <Button
                      color="error"
                      onClick={() => {
                        setOpenLogoutModal(true);
                        setPropertyId(item?._id);
                      }}
                      sx={{ mt: 2 }}
                    >
                      <DeleteIcon />
                      {t("remove")}
                    </Button>
                  </Grid>
                </Grid>
              ))
            )}
          </Grid>
          {data?.length >= 1 && (
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid sx={style.box}>
                {data?.map((item, index) => (
                  <Box className="displaySpacebetween" key={index} mt={1}>
                    <Typography
                      variant="h5"
                      sx={{
                        maxWidth: "50%", // or a fixed width like '300px'
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                      }}
                    >
                      {i18n.language === "en"
                        ? item?.propertyDetails[0]?.title
                        : item?.propertyDetails[0]?.title_ar}
                    </Typography>

                    <Typography variant="h5" className="outfitFonts">
                      SAR{" "}
                      {(
                        amounts[item._id] ?? Number(item.amount.toFixed(2))
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
                <Divider
                  sx={{
                    backgroundColor: "#0000001A",
                    mt: 2,
                    mb: 1,
                  }}
                />
                <Box className="displaySpacebetween" mt={2}>
                  <Typography variant="h4">{t("total")}</Typography>
                  <Typography variant="h5" className="outfitFonts">
                    SAR{" "}
                    {data
                      ?.reduce(
                        (total, item) =>
                          total + (amounts[item._id] ?? item.amount),
                        0
                      )
                      .toLocaleString()}
                  </Typography>
                </Box>
                <br />
                <Button
                  variant="contained"
                  sx={{ p: 1, pr: 2, pl: 2 }}
                  onClick={() => addCheckout()}
                  disabled={Object.values(errorMessages).some(
                    (msg) => msg !== ""
                  )} // Disable if any error exists
                >
                  {isLoading ? "Loading..." : t("checkout")}
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
        {data?.length === 0 && <NoCartFound text={t("no_properties_added")} />}
      </Box>
      <CustomModal
        open={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
        title="Remove Item"
        description="Are you sure, you want to remove the property from cart?"
        actions={[
          {
            label: "No",
            props: {
              variant: "contained",
              color: "primary",
              onClick: () => setOpenLogoutModal(false),
            },
          },
          {
            label: loading ? "loading..." : "Yes",
            props: {
              variant: "outlined",
              color: "primary",
              onClick: () => {
                removeCartData();
                setOpenLogoutModal(false);
                console.log("User logged out"); // Replace this with actual logout logic
              },
            },
          },
        ]}
      />
    </Container>
  );
}

Cart.getLayout = function Cart(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
