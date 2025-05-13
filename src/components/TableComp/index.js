import React, { useState } from "react";
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  styled,
  Paper,
} from "@mui/material";
import TopTradingSkeleton from "../Skeletons/TopTradingSkeleton";
import NoDataFound from "../NoDataFound";
import { sortAddressStart } from "@/utils";
import { CheckOutlined } from "@mui/icons-material";
import { AiOutlineCopy } from "react-icons/ai";
import toast from "react-hot-toast";
const BoxCent = styled("Box")(({ theme }) => ({
  // textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
}));
const MainComponent = styled(Box)(({ theme }) => ({
  background: "transparent !important",
  border: "none",
  padding: "16px 0 0 0",
  "& .tableContainer": {
    background: "#FFFFFF08",
    borderRadius: "10px",
    // border: "1px solid #72ff9030",
    "& .MuiIconButton-root": {
      color: "rgb(255 202 100)",
      padding: "1px",
      // marginRight: "20px",
      height: "42px",
      width: "42px",
    },
  },
  "& .MuiTableContainer-root": {
    // maxHeight: "calc(100dvh - 300px)",
    // .css-41abqd-MuiTableContainer-root
    //     max-height: calc(100dvh - 300px);
  },
}));

function TableComp({
  tableHead,
  scoreListData,
  noOfPages,
  page,
  setPage,
  isLoading,
  NoDataFoundText = "No data found",
  maxHeight = "calc(100dvh - 400px)",
}) {
  return (
    <MainComponent>
      {/* <Paper sx={{ overflow: "hidden" }} elevation={2}> */}
      <TableContainer className={"tableContainer"}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow style={{ borderBottom: "1px solid #FFFFFF08" }}>
              {tableHead &&
                tableHead?.map((head, index) => (
                  <TableCell align="center" key={index}>
                    {head?.heading}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {scoreListData &&
              scoreListData.map((data, i) => (
                <TableRow key={i}>
                  {tableHead &&
                    tableHead?.map((head, index) => {
                      return (
                        <StyledTableCell
                          style={{
                            borderBottom: "1px solid #FFFFFF08",
                          }}
                          data={data}
                          head={head}
                          index={index}
                        />
                      );
                    })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((itm) => (
            <TopTradingSkeleton key={itm} skeleton={tableHead} />
          ))} */}
        {!isLoading && scoreListData && scoreListData.length === 0 && (
          <NoDataFound text={NoDataFoundText} />
        )}
      </TableContainer>
      {!isLoading && noOfPages > 1 && (
        <Box my={2} display="flex" justifyContent="end">
          <Pagination
            count={noOfPages}
            page={page}
            StyledTextMessage
            onChange={(e, value) => setPage(value)}
            variant="outlined"
          />
        </Box>
      )}
      {/* </Paper> */}
    </MainComponent>
  );
}
const StyledTableCell = ({ data, head, index }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyClick = (textToCopy) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copied!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Unable to copy text", err);
      });
  };

  return (
    <TableCell
      key={index}
      align="center"
      style={
        head?.heading === "Action"
          ? { whiteSpace: "pre" }
          : { whiteSpace: "pre" }
      }
      // sx={{
      //   whiteSpace: "nowrap",
      //   overflow: "hidden",
      //   textOverflow: "ellipsis",
      //   display: "inline-block",
      //   width: "100%",
      // }}
    >
      {head?.heading === "Action"
        ? data[head?.heading]?.map((action, idx) => (
            <IconButton
              size="small"
              key={idx}
              onClick={action?.onClick}
              disabled={!action?.icon}
            >
              {action?.icon}
            </IconButton>
          ))
        : head?.isCopy
        ? data[head?.heading] && (
            <BoxCent>
              <span>{sortAddressStart(data[head?.heading])}</span>
              {copied ? (
                <IconButton disabled>
                  <CheckOutlined
                    style={{
                      fontSize: "15px",
                    }}
                  />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => handleCopyClick(data[head?.heading])}
                >
                  <AiOutlineCopy
                    style={{
                      cursor: "pointer",
                      fontSize: "15px",
                    }}
                  />
                </IconButton>
              )}
            </BoxCent>
          )
        : data[head?.heading] || "..."}
    </TableCell>
  );
};
export default TableComp;
