import { useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Box,
} from "@mui/material";
import { toLowerCase } from "@/utils";
import Loader from "@/components/PageLoader/Loader";
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
const properties = [
  {
    propertyId: 1,
    name: "Property 1",
    location: "Dubai",
    investedAmount: 100000,
    annualRevenue: 5000,
    preFormat: "Monthly Rent",
    roi: "10%",
  },
  {
    propertyId: 2,
    name: "Property 2",
    location: "Abu Dhabi",
    investedAmount: 150000,
    annualRevenue: 7500,
    preFormat: "Annual Rent",
    roi: "20%",
  },
  {
    propertyId: 3,
    name: "Property 3",
    location: "Sharjah",
    investedAmount: 80000,
    annualRevenue: 4000,
    preFormat: "Monthly Rent",
    roi: "10%",
  },
];

const MyInvestments = ({ investments, loading }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(investments);

  const downloadInvestmentsCSV = () => {
    const headers = [
      "Property",
      "Location",
      "Investment Value (SAR)",
      "Total Revenue (SAR)",
      "PRE Format",
      "Expected ROI (%)",
      "Status",
    ];

    const rows = investments.map((investment) => {
      const investmentValue = investment?.investedAmount
        ? investment.investedAmount.toLocaleString()
        : "N/A";

      const totalRevenue = investment?.annualRevenue
        ? investment.annualRevenue.toLocaleString()
        : "N/A";

      const preFormat =
        investment?.investmentType === "SORT_TERM"
          ? "Monthly"
          : investment?.investmentType === "MEDIUM_TERM"
          ? "Quarterly"
          : investment?.investmentType === "LONG_TERM"
          ? "Yearly"
          : "N/A";

      const roi = investment?.roi ? investment.roi.toFixed(2) : "N/A";

      return [
        investment?.name || "N/A",
        investment?.location?.city || "N/A",
        `SAR ${investmentValue}`,
        `SAR ${totalRevenue}`,
        preFormat,
        roi,
        toLowerCase(investment?.propertyStatus) || "N/A",
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) =>
            typeof cell === "string" && cell.includes(",") ? `"${cell}"` : cell
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "investments.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <Loader />;
  } else
    return (
      <div>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h3" gutterBottom>
            {t("my_investments")}
          </Typography>
          <Button
            variant="contained"
            sx={{ padding: "13px 25px !important", lineHeight: "20px" }}
            onClick={downloadInvestmentsCSV}
          >
            {t("download_csv")}
          </Button>
        </Box>

        <TableContainer sx={style.tableContainer}>
          {(!investments || investments.length === 0) && loading !== true ? (
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
              <TableHead sx={{ background: "#25826aed" }}>
                <TableRow>
                  <TableCell> {t("property")}</TableCell>
                  <TableCell>{t("location")}</TableCell>
                  <TableCell>{t("investment_value_sar")}</TableCell>
                  <TableCell>{t("total_revenue_sar")}</TableCell>
                  <TableCell>{t("investment_strategy")}</TableCell>
                  <TableCell>{t("expected_roi")}</TableCell>
                  <TableCell>{t("status")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {investments
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((investment, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor:
                          index % 2 === 0
                            ? "rgba(0, 0, 0, 0.05)"
                            : "transparent",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                        },
                      }}
                      // onClick={() => router.push("/dashboard/properties/details")}
                    >
          <TableCell>
  {i18n.language === "en"
    ? investment?.name?.length > 20
      ? `${investment.name.slice(0, 20)}...`
      : investment?.name
    : investment?.name_ar?.length > 20
    ? `${investment.name_ar.slice(0, 20)}...`
    : investment?.name_ar || "N/A"}
</TableCell>


                      <TableCell>
                        {investment?.location?.city || "N/A"}
                      </TableCell>
                      <TableCell className="outfitFonts">
                        SAR{" "}
                        {investment?.investedAmount?.toLocaleString() || "N/A"}
                      </TableCell>
                      <TableCell className="outfitFonts">
                        SAR{" "}
                        {investment?.annualRevenue.toLocaleString() || "N/A"}
                      </TableCell>
                      <TableCell>
                        {(investment?.investmentType === "SORT_TERM" &&
                          t("investment_type.monthly")) ||
                          (investment?.investmentType === "MEDIUM_TERM" &&
                            t("investment_type.quarterly")) ||
                          (investment?.investmentType === "LONG_TERM" &&
                            t("investment_type.yearly")) ||
                          t("investment_type.na")}
                      </TableCell>
                      <TableCell
  className="outfitFonts"
  style={{
    color:
      investment?.roi > 0
        ? "green"
        : investment?.roi < 0
        ? "red"
        : "inherit",
  }}
>
  {typeof investment?.roi === "number"
    ? investment?.roi.toFixed(2)
    : "N/A"}
</TableCell>

                      <TableCell>
                        {toLowerCase(investment?.propertyStatus) || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        {investments?.length > 10 && (
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={investments?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "& .MuiTablePagination-root": {
                color: "#000",
                fontSize: "0.875rem",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                {
                  fontSize: "0.875rem",
                  color: "#000",
                },
              "& .MuiTablePagination-actions svg": {
                color: "#000",
                fontSize: "1.25rem",
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
                fontSize: "0.875rem",
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
      </div>
    );
};

export default MyInvestments;
