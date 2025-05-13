import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { useRouter } from "next/router";
import { apiRouterCall } from "@/api-services/service";
import { useSelector } from "react-redux";
import { formatDate } from "@/utils";
import { useDispatch } from "react-redux";
import {
  setProperty,
  setPropertyStatus,
} from "@/store/slices/availablePropertySlice";
import { Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
const style = {
  tableContainer: {
    whiteSpace: "pre",
    mt: 2,
    borderRadius: "16px",
    boxShadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    overflowX: "auto", // Enables horizontal scrolling
    "&::-webkit-scrollbar": {
      height: "8px", // Makes scrollbar visible
      display: "block",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888", // Scrollbar color
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555", // Darker color on hover
    },
  },
};
const RentalStrategy = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUserFullInvestmentDetails = async () => {
    try {
      setLoading(true);
      const res = await apiRouterCall({
        method: "GET",
        endPoint: "getUserFullInvestmentDetails",
        token: user?.userInfo?.token,
      });

      console.log(res);
      if (res?.data?.responseCode === 200) {
        setData(res?.data?.data || []);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log("Error while getting portfoliodata", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserFullInvestmentDetails();
  }, []);
  const properties2 = [
    {
      propertyId: 1, name: "Luxury Apartments",
      investmentDate: "2024-01-15",
      refundDate: "2026-01-15",
      expectedDueDate: "2025-12-31",
      investedAmount: 50000,
      paymentAmount: 50000,
      totalRevenue: 75000,
      ownershipPercentage: "10%",
      percentageValue: 7500,
      occupancyRate: "95%",
    },
    {
      propertyId: 2,
      name: "Skyline Towers",
      investmentDate: "2023-05-10",
      refundDate: "2025-05-10",
      expectedDueDate: "2024-12-31",
      investedAmount: 70000,
      paymentAmount: 70000,
      totalRevenue: 90000,
      ownershipPercentage: "15%",
      percentageValue: 13500,
      occupancyRate: "90%",
    },
  ];

  const [page2, setPage2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = useState(5);

  const handleChangePage2 = (_, newPage) => setPage2(newPage);
  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(parseInt(event.target.value, 10));
    setPage2(0);
  };
  const downloadCSV = () => {
    const headers = [
      "Investment Name",
      "Investment Date",
      "Refund Date",
      "Expected Due Date",
      "Investment Amount (SAR)",
      "Total Revenue (SAR)",
      "Ownership (%)",
      "Occupancy Rate (%)",
    ];

    const rows = data.map((investment) => [
      investment?.property?.title || "N/A",
      formatDate(investment?.investmentDate) || "N/A",
      formatDate(investment?.property?.exitDate) || "N/A",
      formatDate(investment?.property?.timeLine[2]?.date) || "N/A",
      investment?.investmentAmount?.toLocaleString() || "0",
      (
        (((investment?.investmentAmount / investment?.property?.price) * 100) /
          100) *
        investment?.property?.annualRevenue
      ).toFixed(2),
      (
        (investment?.investmentAmount / investment?.property?.price) *
        100
      ).toFixed(2),
      (
        (investment?.property?.fundingReceived / investment?.property?.price) *
        100
      ).toFixed(2),
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "rental_investment_strategy.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const getAvailableProperties = async (type, id) => {
    try {
      let endPoint;
      if (type === "available") {
        endPoint = "getAllTheProperties";
      } else if (type === "funded") {
        endPoint = "getFundedProperties";
      } else {
        endPoint = "getExitedProperties";
      }
      const res = await apiRouterCall({
        method: "GET",
        endPoint: endPoint,
        token: user?.userInfo?.token,
        paramsData: { propertyId: id },
      });
      console.log(res);
      if (res?.data?.responseCode === 200) {
        // setProperties(res?.data?.properties || []);
        dispatch(setProperty(res?.data?.properties[0]));
        dispatch(setPropertyStatus(type));
        router.push("/dashboard/properties/details");
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log("Error while getting available properties", error);
    } finally {
    }
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} mt={2}>
        <Typography variant="h3" gutterBottom>
          {t("rental_investment_strategy_statement")}
        </Typography>
        <Button
          variant="contained"
          onClick={downloadCSV}
          sx={{ padding: "13px 25px !important", lineHeight: "20px" }}
        >
          {t("download_csv")}
        </Button>
      </Box>
      <TableContainer sx={style.tableContainer}>
        {(!data || data.length === 0) && loading !== true ? (
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
              {t("no_investments_yet")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("no_investments_description")}
            </Typography>
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ whiteSpace: "pre", background: "#25826aed" }}>
              <TableRow>
                <TableCell> {t("investment_name")} </TableCell>
                <TableCell> {t("investment_date")} </TableCell>
                <TableCell> {t("refund_date")} </TableCell>
                <TableCell> {t("expected_due_date")} </TableCell>
                <TableCell> {t("investment_amount_sar")} </TableCell>

                <TableCell> {t("total_revenue_sar")} </TableCell>
                <TableCell> {t("ownership_percentage")} </TableCell>
                {/* <TableCell>Percentage Value (SAR)</TableCell> */}
                <TableCell> {t("occupancy_rate")} </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(
                  page2 * rowsPerPage2,
                  page2 * rowsPerPage2 + rowsPerPage2
                )
                .map((investment, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "rgba(0, 0, 0, 0.05)" : "transparent",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease-in-out",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                    }}
                    onClick={async () => {
                      await getAvailableProperties(
                        investment?.property?.propertyStatus,
                        investment?.property?.propertyId
                      );
                   
                    }}
                  >
                    <TableCell>
                      {i18n.language === "en"
                        ? investment?.property?.title?.length > 20
                          ? `${investment.property.title.slice(0, 20)}...`
                          : investment?.property?.title
                        : investment?.property?.title_ar?.length > 20
                          ? `${investment.property.title_ar.slice(0, 20)}...`
                          : investment?.property?.title_ar || "N/A"}
                    </TableCell>

                    <TableCell className="outfitFonts">
                      {formatDate(investment?.investmentDate) || "N/A"}
                    </TableCell>
                    <TableCell className="outfitFonts">
                      {formatDate(investment?.property?.exitDate) || "N/A"}
                    </TableCell>
                    <TableCell className="outfitFonts">
                      {formatDate(investment?.property?.timeLine[2]?.date) ||
                        "N/A"}
                    </TableCell>
                    <TableCell className="outfitFonts">
                      SAR{" "}
                      {investment?.investmentAmount?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>

                    <TableCell className="outfitFonts">
                      SAR{" "}
                      {(
                        (investment?.investmentAmount /
                          investment?.property?.price) *
                        investment?.property?.annualRevenue
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                    </TableCell>
                    <TableCell className="outfitFonts">
                      {(
                        (investment?.investmentAmount /
                          investment?.property?.price) *
                        100
                      )?.toFixed(2)}{" "}
                      {"%"}
                    </TableCell>
                    {/* <TableCell>
                    SAR {investment?.investmentAmount.toLocaleString()}
                  </TableCell> */}
                    <TableCell className="outfitFonts">
                      {(
                        (investment?.property?.fundingReceived /
                          investment?.property?.price) *
                        100
                      ).toFixed(2)}
                      {"%"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      {data?.length > 10 && (
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage2}
          page={page2}
          onPageChange={handleChangePage2}
          onRowsPerPageChange={handleChangeRowsPerPage2}
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
    </>
  );
};

export default RentalStrategy;
