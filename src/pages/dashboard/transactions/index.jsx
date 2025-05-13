"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Typography,
  TablePagination,
  Container,
  Button,
  Grid,
} from "@mui/material";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import { formatDate, formatDateTime, toLowerCase } from "@/utils";
import Loader from "@/components/PageLoader/Loader";
import NoDataFound from "@/components/NoDataFound";
import DashboardLayout from "../layout";
import DropdownInput from "@/components/InputBoxes/DropdownInput";
import DateInputBox from "@/components/InputBoxes/DateInputBox";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { PiArrowFatUpLight } from "react-icons/pi";
import { PiArrowFatDownLight } from "react-icons/pi";
import { CiHome } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const style = {
  alignCenter: {
    display: "flex",
    alignItems: "center",
  },
};
export default function TransactionTable({ loading1 }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [trxStatus, setTrxStatus] = useState("All");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const cardTypeOptions = [
    { value: "All", label: t("card_type_options.all") },
    { value: "withdrawal", label: t("card_type_options.withdrawal") },
    { value: "deposit", label: t("card_type_options.deposit") },
    { value: "Investment", label: t("card_type_options.investment") },
    {
      value: "profit_distribution",
      label: t("card_type_options.profit_distribution"),
    },
    { value: "rent", label: t("card_type_options.rent") },
  ];

  const user = useSelector((state) => state.user);

  const getTransactionData = async (
    newPage = page,
    newRowsPerPage = rowsPerPage
  ) => {
    let query = {};
    let isFilterApplied = false;

    if (trxStatus !== "All") {
      query.trxType = trxStatus;
      isFilterApplied = true;
    }
    if (fromDate) {
      query.fromDate = fromDate;
      isFilterApplied = true;
    }
    if (toDate) {
      query.toDate = toDate;
      isFilterApplied = true;
    }

    // Reset to page 1 and limit 10 if any filter is applied
    const finalPage = isFilterApplied ? 1 : newPage;
    const finalLimit = isFilterApplied ? 10 : newRowsPerPage;

    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "listUsersTransactions",
        token: user?.userInfo?.token,
        paramsData: {
          ...query,
          page: finalPage,
          limit: finalLimit,
        },
      });

      if (res?.data?.data) {
        setTransactions(res?.data?.data || []);
        setPage(res?.data?.pagination?.currentPage);
        setRowsPerPage(res?.data?.pagination?.pageSize);
        setPages(res?.data?.pagination?.totalPages);
        setTotal(res?.data?.pagination?.totalCount);
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
    getTransactionData();
    console.log(trxStatus, fromDate, toDate);
  }, [loading1, trxStatus, toDate]);

  // if ((!transactions || transactions.length === 0) && loading !== true) {
  //   return (

  //   );
  // }

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // Convert zero-based index to API's 1-based index
    getTransactionData(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page
    getTransactionData(1, newRowsPerPage);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED" || "APPROVED":
        return {
          bgcolor: "success.light",
          color: "white",
        };
      case "APPROVED":
        return {
          bgcolor: "success.light",
          color: "white",
        };
      case "Approved":
        return {
          bgcolor: "success.light",
          color: "white",
        };
      case "PENDING":
        return {
          bgcolor: "warning.light",
          color: "white",
        };
      case "REJECTED":
        return {
          bgcolor: "error.light",
          color: "white",
        };
      default:
        return {
          bgcolor: "grey.light",
          color: "white",
        };
    }
  };

  const clearFilter = () => {
    setTrxStatus("All");
    setFromDate(null);
    setToDate(null);
  };
  const downloadCSV = () => {
    const headers = [
      "Sr no",
      "Type",
      "Status",
      "Method",
      "Trx Id",
      "Date & Time",
      "Amount",
    ];

    const rows = transactions.map((transaction, index) => {
      const amount =
        transaction?.investedAmount ||
        transaction?.distributedAmount ||
        transaction?.spendingAmount ||
        transaction?.amount ||
        0;

      return [
        index + 1 + (page - 1) * 10,
        transaction?.trxType,
        transaction?.status,
        transaction?.method,
        transaction?.paymentId,
        formatDateTime(transaction?.createdAt),
        `${
          transaction?.trxType === "withdrawal" ||
          transaction?.trxType === "Investment"
            ? "-"
            : "+"
        } ${amount.toFixed(2)} SAR`,
      ];
    });

    // Prepare CSV string
    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) =>
            typeof cell === "string" && cell.includes(",") ? `"${cell}"` : cell
          )
          .join(",")
      )
      .join("\n");

    // Create a Blob from CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> tag to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container sx={{ mt: 3, mb: 10 }}>
      <Box>
        <Typography fontSize={"25px !important"} fontWeight={"bold !important"}>
          {t("transactions")}
        </Typography>{" "}
      </Box>
      <Grid container spacing={3} mt={1} alignItems="center">
        {/* Transaction Type Dropdown */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <DropdownInput
            name="country"
            value={trxStatus}
            onChange={(e) => setTrxStatus(e.target.value)}
            options={cardTypeOptions}
            placeholder={t("select_type")}
          />
        </Grid>

        {/* From Date Picker */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateInputBox
              name="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              minDate="1900-01-01"
              maxDate={dayjs().format("YYYY-MM-DD")}
              placeholder={t("fromDate")}
              color="#000"
              borderRadius="8px"
            />
          </LocalizationProvider>
        </Grid>

        {/* To Date Picker */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateInputBox
              name="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              minDate={fromDate}
              maxDate={dayjs().format("YYYY-MM-DD")}
              placeholder={t("toDate")}
              color="#000"
              borderRadius="8px"
            />
          </LocalizationProvider>
        </Grid>

        {/* Clear Button */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={clearFilter}
            sx={{ padding: "13px 25px", lineHeight: "20px" }}
          >
            {t("clear")}
          </Button>
        </Grid>

        {/* Download CSV Button */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={downloadCSV}
            sx={{ padding: "13px 25px", lineHeight: "20px" }}
          >
            {t("download_csv")}
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ overflowX: "auto", mt: 1.5 }}>
        <TableContainer
          sx={{
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            boxShadow:
              "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
          }}
        >
          {(!transactions || transactions.length === 0) && loading !== true ? (
            <Box
              sx={{
                width: "100%",
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 4,
              }}
            >
              <Clock
                size={48}
                style={{ marginBottom: 16, color: "rgba(0, 0, 0, 0.6)" }}
              />
              <Typography variant="h6" gutterBottom>
                {t("no_transactions")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("transactions_info")}
              </Typography>
            </Box>
          ) : (
            <Table sx={{ minWidth: 650 }}>
              <TableHead
                sx={{
                  whiteSpace: "pre",
                  background: "#25826aed",
                  color: "#fff !important",
                }}
              >
                <TableRow>
                  <TableCell>{t("sr_no")}</TableCell>
                  <TableCell>{t("type")}</TableCell>
                  <TableCell>{t("status")}</TableCell>
                  <TableCell>{t("method")}</TableCell>
                  <TableCell>{t("trx_id")}</TableCell>
                  <TableCell>{t("date_time")}</TableCell>
                  <TableCell>{t("amount")}{" (SAR)"}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ whiteSpace: "pre" }}>
                {loading ? (
                  <Loader />
                ) : transactions.length === 0 ? (
                  <NoDataFound message={t("no_properties")} /> // Show NoDataFound when no properties
                ) : (
                  transactions.map((transaction, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor:
                          index % 2 === 0
                            ? "rgba(0, 0, 0, 0.05)"
                            : "transparent", // Apply light background on even rows
                        // borderBottom: "1px solid black",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1 + (page - 1) * 10}
                      </TableCell>
                      <TableCell sx={style.alignCenter}>
                        {transaction?.trxType === "withdrawal" ? (
                          <PiArrowFatUpLight color="red" fontSize={"16px"} />
                        ) : transaction?.trxType === "Investment" ? (
                          <CiHome color="green" fontSize={"20px"} />
                        ) : (
                          <PiArrowFatDownLight
                            color="green"
                            fontSize={"16px"}
                          />
                        )}
                        &nbsp;
                        {t(`trx_type.${transaction?.trxType.toLowerCase()}`)}
                        {transaction?.propertyName && (
                          <Typography
                            noWrap
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: 100, // Adjust maxWidth as needed
                            }}
                          >
                            {"-"}{" "}
                            {toLowerCase(
                              i18n.language === "en"
                                ? transaction?.propertyName
                                : transaction?.propertyName_ar || "n/a"
                            )}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t(
                            `transaction_status.${transaction?.status.toLowerCase()}`
                          )}
                          size="small"
                          sx={getStatusColor(transaction?.status)}
                        />
                      </TableCell>
                      <TableCell>
                        {" "}
                        {t(
                          `payment_method.${transaction?.method.toLowerCase()}`
                        )}
                      </TableCell>
                     <TableCell className="outfitFonts">
                       {transaction?.paymentId
                         ? `${transaction.paymentId.slice(0, 3)}......${transaction.paymentId.slice(-3)}`
                         : "-"}
                     </TableCell>
                      <TableCell className='outfitFonts'>
                        {formatDateTime(transaction?.createdAt)}
                      </TableCell>
                      <TableCell
                        className="outfitFonts"
                        style={{
                          color:
                            transaction?.trxType === "withdrawal" ||
                            transaction?.trxType === "Investment"
                              ? "red"
                              : "green",
                        }}
                      >
                        {transaction?.trxType === "withdrawal" ||
                        transaction?.trxType === "Investment"
                          ? "-"
                          : "+"}{" "}
                        &nbsp;
                        {Number(
  transaction.investedAmount ||
  transaction.distributedAmount ||
  transaction.spendingAmount ||
  transaction.amount ||
  0
).toLocaleString("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}{" "}

                    
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {pages > 1 && (
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "& .MuiTablePagination-root": {
                color: "#000",
                fontSize: "0.875rem !important",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontSize: "0.875rem !important",
                  color: "#000",
                },
              "& .MuiTablePagination-actions svg": {
                color: "#000",
                fontSize: "1.25rem !important",
              },
              "& .MuiSelect-select": {
                color: "#000",
                backgroundColor: "#fff",
                borderRadius: "4px",
                padding: "6px 12px",
                border: "1px solid rgba(0, 0, 0, 0.23)",
              },
              "& .MuiPaginationItem-root": {
                color: "#000",
                fontSize: "0.875rem !important",
                "&.Mui-selected": {
                  borderRadius: "50px",
                  border: "1px solid rgba(0, 0, 0, 0.25)",
                  background: "#88e68f",
                  color: "#000",
                },
                "&.Mui-selected:hover": {
                  border: "1px solid rgba(0, 0, 0, 0.25)",
                  background: "#4ddd58",
                  color: "#000",
                },
              },
            }}
          />
        )}
      </Box>
    </Container>
  );
}

TransactionTable.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
