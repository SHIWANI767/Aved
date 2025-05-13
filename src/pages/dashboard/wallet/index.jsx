import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  Tooltip
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import DashboardLayout from "../layout";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TransactionTable from "./Transactions";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddCardModal from "./CardModal";
import AddBankModal from "./BankModal";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditAddCardModal from "./EditCardModal";
import EditAddBankModal from "./EditBankModal";
import { api_configs } from "@/api-services";
import DepositMoneyModal from "./DepositMoneyModal";
import toast from "react-hot-toast";
import WithdrawMoneyModal from "./WithdrawMoneyModal";
import CustomModal from "@/components/CustomModal";
import { useTranslation } from "react-i18next";

const style = {
  box: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    padding: "16px",
    height: "80%",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow:
        "rgba(50, 50, 93, 0.4) 0px 8px 16px -2px, rgba(0, 0, 0, 0.35) 0px 4px 8px -3px",
      transform: "translateY(-4px)",
    },
  },
};

// Generate more sample data for pagination
const sampleTransactions = Array.from({ length: 15 }, (_, index) => ({
  id: (index + 1).toString(),
  type: ["Deposit", "Withdrawal", "Transfer"][Math.floor(Math.random() * 3)],
  status: ["Completed", "Pending", "Failed"][Math.floor(Math.random() * 3)],
  method: ["Bank Transfer", "Credit Card", "PayPal"][
    Math.floor(Math.random() * 3)
  ],
  trxId: `TRX${index + 1000}`,
  date: new Date(2024, 2, 20 - index).toISOString().split("T")[0],
  wallet: ["Main Wallet", "Savings Wallet", "Investment Wallet"][
    Math.floor(Math.random() * 3)
  ],
  amount: Math.round(Math.random() * 2000 * 100) / 100,
}));

function Wallet() {
  const { t } = useTranslation();
  const [showSample, setShowSample] = useState(true);
  const [open, setOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [editBankOpen, setEditBankOpen] = useState(false);
  const [editCardOpen, setEditCardOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({});
  const [depositModal, setDepositModal] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const paymentWindowRef = useRef(null); // Use useRef to store window reference
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [walletDetails, setWalletDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [bankList, setBankList] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [error, setError] = useState("");
  const [deleteApi, setDeleteApi] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenBank = () => setBankOpen(true);
  const handleCloseBank = () => setBankOpen(false);
  const handleEditBankOpen = () => setEditBankOpen(true);
  const handleEditCardOpen = () => setEditCardOpen(true);
  const handleDepositModalOpen = () => setDepositModal(true);
  const handleOpenWithdraw = () => setOpenWithdraw(true);
  const handleDeleteOpen = (endPoint, id) => {
    setDeleteApi(endPoint);
    setDeleteId(id);

    setDeleteOpen(true);
  };

  const user = useSelector((state) => state.user);
  const router = useRouter();
  console.log(user);
  const getWalletData = async () => {
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getWaletDetails",
        token: user?.userInfo?.token,
      });

      if (res?.data?.responseCode === 200) {
        setWalletDetails(res?.data?.result || {});
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log("Error while getting available properties", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWalletData();
  }, []);
  const fetchBanks = async () => {
    setLoading1(true);
    setError("");
    try {
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "viewBankDetails",
        token: user?.userInfo?.token,
      });

      if (res?.data?.responseCode === 200) {
        setBankList(res.data.result?.docs || []);
      } else {
        setError(res?.data?.responseMessage || "Failed to fetch bank details");
      }
    } catch (err) {
      setError("Error fetching bank details.");
    } finally {
      setLoading1(false);
    }
  };

  const fetchCards = async () => {
    setLoading2(true);
    setError("");
    try {
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "viewCardDetails",
        token: user?.userInfo?.token,
      });

      if (res?.data?.responseCode === 200) {
        setCardList(res.data.result);
      } else {
        setError(res?.data?.responseMessage || "Failed to fetch card details");
      }
    } catch (err) {
      setError("Error fetching card details.");
    } finally {
      setLoading2(false);
    }
  };
  useEffect(() => {
    const eventSource = new EventSource(api_configs["events"]);

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type === "PAYMENT_SUCCESS") {
        toast.success(
          eventData.message || "Amount added successfully to wallet."
        );
        setTimeout(() => {
          if (paymentWindowRef.current) {
            paymentWindowRef.current.close();
            setDepositModal(false);
          }
        }, 3000);

        getWalletData(); // Refresh wallet balance
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const deleteApiCall = async (endPoint, id) => {
    setLoading2(true);
    setError("");
    try {
      const res = await apiRouterCall({
        method: "DELETE",
        endPoint: endPoint,
        token: user?.userInfo?.token,
        bodyData: endPoint === "removeCardDetails" ? { cardId: id } : null,
        paramsData: endPoint === "deleteBankDetails" ? { _id: id } : null,
      });

      if (res?.data?.responseCode === 200) {
        toast.success(res?.data?.responseMessage);
      } else {
        toast.error(res?.data?.responseMessage);
      }
    } catch (err) {
      toast.error("Something went wrong please try again letter!");
    } finally {
      setLoading2(false);
      setDeleteOpen(false);
      fetchCards();
      fetchBanks();
    }
  };

  useEffect(() => {
    fetchCards();
  }, [open]);
  useEffect(() => {
    fetchBanks();
  }, [bankOpen]);
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography fontSize={"25px !important"} fontWeight={"bold !important"}>
        {t("wallet")}
      </Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box sx={style.box} className="displaySpaceBetween">
            <Box>
              <Typography variant="body2" color="grey" fontWeight={"500"}>
                {t("cash_balance")}
              </Typography>
              <Typography variant="title2" className="outfitFonts">
                SAR {walletDetails?.availableBalance?.toLocaleString()}
              </Typography>

              {walletDetails?.pendingBalance > 0 && (
                <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                  <Typography variant="body1" color="grey" fontWeight={"500"}>
                    {t("locked_amount")} {":"}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography variant="body4" className="outfitFonts">
                    &nbsp; SAR {walletDetails?.pendingBalance?.toLocaleString()}
                    </Typography>
                    <Tooltip title={t("locked_amount_info") || "Locked amount is the pending withdrawal amount"}>
                      <IconButton size="small" sx={{ width: 18, height: 18 }}>
                        <InfoOutlinedIcon sx={{ fontSize: 15 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              )}
            </Box>

            <Box className="displayColumn" gap={1}>
              <Button
                variant="contained"
                // disabled={!user?.userInfo?.verifyAccount}
                sx={{ minWidth: 120, padding: "10px 25px" }}
                onClick={handleDepositModalOpen}
              >
                {t("deposit")}
              </Button>
              <Button
                variant="outlined"
                // disabled={!user?.userInfo?.verifyAccount}
                sx={{
                  minWidth: 120,
                  padding: "10px 25px !important",
                  lineHeight: "20px",
                }}
                onClick={handleOpenWithdraw}
              >
                {t("withdraw")}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box sx={style.box} className="displaySpaceBetween">
            <Box>
              <Typography variant="body2" color="grey" fontWeight={"500"}>
                {t("reward_balance")}
              </Typography>
              <Typography variant="title2" className="outfitFonts">
                SAR {walletDetails?.rewardsBalance ? walletDetails?.rewardsBalance?.toLocaleString() : "0"}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <EmojiEventsIcon
                  sx={{ color: "#25826a", fontSize: 50 }}
                  fontSize="20px"
                />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box mt={5} gap={1}>
        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
          <Typography fontSize={"25px !important"} fontWeight={"bold !important"}>
            {t("latest_transactions")}
          </Typography>
          <Button
            variant="contained"
            sx={{ padding: "13px 25px !important", lineHeight: "20px" }}
            onClick={() => router.push("/dashboard/transactions")}
          >
            {t("property_details.seeMore")}
          </Button>
        </Box>
        <TransactionTable
          transactions={showSample ? sampleTransactions : []}
          loading1={loading}
          reload={openWithdraw}
        />
      </Box>

      <Grid container spacing={3} mt={3} mb={6}>
        <Grid item lg={6} md={12} sm={12} xs={12} mb={3}>
          <Typography
            fontSize={"23px !important"}
            fontWeight={"bold !important"}
            gutterBottom
          >
            {t("cards")}
          </Typography>

          <Box sx={style.box} className="displayColumn" mt={1}>
            {loading2 ? (
              <CircularProgress sx={{ alignSelf: "center", mt: 2 }} />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              cardList.length > 0 && (
                <Box mt={2} width={"60%"}>
                  {cardList.map((card) => (
                    <Box
                      key={card._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body3" className="outfitFonts">
                        {card.cardType} - {card.cardNumber.slice(-4)}
                      </Typography>
                      <Box>
                        <IconButton
                          onClick={() => {
                            handleEditCardOpen();
                            setDataToEdit(card);
                          }}
                        >
                          <EditIcon color="secondary" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDeleteOpen("removeCardDetails", card._id)
                          }
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )
            )}
            <Box>
              <Typography variant="body3" color="grey" fontWeight={"500"}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CreditCardIcon />
                  {t("add_card_info")}
                </Box>
              </Typography>
            </Box>
            <Box gap={1} width={"100%"} mt={1}>
              <Button
                variant="outlined"
                sx={{ padding: "10px 25px" }}
                fullWidth
                onClick={handleOpen}
              >
                {t("add_new_card")}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={6} md={12} sm={12} xs={12} mb={3}>
          <Typography
            fontSize={"23px !important"}
            fontWeight={"bold !important"}
            gutterBottom
          >
            {t("banks")}
          </Typography>
          <Box sx={style.box} className="displayColumn">
            {loading1 ? (
              <CircularProgress sx={{ alignSelf: "center", mt: 2 }} />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              bankList.length > 0 && (
                <Box mt={2} width={"60%"}>
                  {bankList.map((bank) => (
                    <Box
                      key={bank._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body3" className="outfitFonts">
                        {bank.bank} - {bank.accountNumber}
                      </Typography>
                      <Box>
                        <IconButton
                          onClick={() => {
                            handleEditBankOpen();
                            setDataToEdit(bank);
                          }}
                        >
                          <EditIcon color="secondary" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() =>
                            handleDeleteOpen("deleteBankDetails", bank._id)
                          }
                        >
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )
            )}
            <Box>
              <Typography variant="body3" color="grey" fontWeight={"500"}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccountBalanceIcon /> {t("add_bank_info")}
                </Box>
              </Typography>
            </Box>
            <Box gap={1} width={"100%"} mt={1}>
              <Button
                variant="outlined"
                sx={{ padding: "10px 25px" }}
                fullWidth
                onClick={handleOpenBank}
              >
                {t("add_new_bank")}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <AddCardModal open={open} onClose={handleClose} />
      <AddBankModal open={bankOpen} onClose={handleCloseBank} />
      <EditAddCardModal
        open={editCardOpen}
        onClose={() => setEditCardOpen(false)}
        data={dataToEdit}
      />
      <EditAddBankModal
        open={editBankOpen}
        onClose={() => setEditBankOpen(false)}
        data={dataToEdit}
      />
      <DepositMoneyModal
        open={depositModal}
        onClose={() => setDepositModal(false)}
        paymentWindowRef={paymentWindowRef} // Pass the ref instead
      />
      <WithdrawMoneyModal
        open={openWithdraw}
        onClose={() => setOpenWithdraw(false)}
        availableBalance={walletDetails?.availableBalance}
        getWalletData={getWalletData}
      />
      <CustomModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Bank / Card"
        description="Are you sure, you want to delete your Bank / Card?"
        actions={[
          {
            label: "No",
            props: {
              variant: "contained",
              color: "primary",
              onClick: () => setDeleteOpen(false),
            },
          },
          {
            label: "Yes",
            props: {
              variant: "outlined",
              color: "primary",
              onClick: () => {
                deleteApiCall(deleteApi, deleteId);
              },
            },
          },
        ]}
      />
    </Container>
  );
}

export default Wallet;

Wallet.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
