import React, { useState } from "react";
import {
  Box,
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  Checkbox,
} from "@mui/material";
import styled from "@emotion/styled";
import { BiSortAlt2 } from "react-icons/bi";
import { useRoutes } from "react-router";
import { useRouter } from "next/router";
import Openingwebsite from "./Openingwebsite";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "& .tableCellClasses.head": {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(122, 105, 254, 0.10)",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const MainTableComponentBox = styled("Box")(({ theme }) => ({
  "& .tableBox": {
    "& .MuiSvgIcon-root": {
      fontSize: "25px",
      color: "rgb(122 105 254 / 91%)",
    },
    "& .tableContainer": {
      "& .MuiTableHead-root": {
        borderBottom: "1px solid #CFCFCF",
      },
      "& .MuiTableCell-root": {
        background: "transparent",
        padding: "11px",
        minWidth: "178px",
      },
      "& .rowOdd": {
        background: "rgba(255, 255, 255, 0.04)",
      },
      "& .rowEven": {
        background: "rgba(255, 255, 255, 0.01)",
      },
    },
  },
}));

function TableComponent({ tabledata, tableHead, type }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();

  return (
    <MainTableComponentBox>
      <Box className="tableBox">
        <TableContainer className="tableContainer">
          <Table className="tableBox">
            <TableHead>
              {type === "admin" ? (
                <TableRow>
                  <TableCell>
                    <Box className="displayStart">
                      <Box className="displayStart">
                        <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src={tableHead?.headingImg} />
                        &nbsp; &nbsp;{tableHead?.heading1}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{tableHead?.heading2}</TableCell>
                  <TableCell>{tableHead?.heading3}</TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell>
                    <Box className="displayStart">
                      <Checkbox {...label} defaultChecked color="secondary" />
                      &nbsp;{tableHead?.heading1}&nbsp;{" "}
                      <BiSortAlt2 fontSize="20px" cursor="pointer" />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className="displayStart">
                      {tableHead?.heading2} &nbsp;{" "}
                      <BiSortAlt2 fontSize="20px" cursor="pointer" />
                    </Box>
                  </TableCell>
                  <TableCell>{tableHead?.heading3}</TableCell>
                  <TableCell>
                    <Box className="displayStart">
                      {tableHead?.heading4} &nbsp;{" "}
                      <BiSortAlt2 fontSize="20px" cursor="pointer" />
                    </Box>
                  </TableCell>
                  <TableCell>{tableHead?.heading5}</TableCell>
                </TableRow>
              )}
            </TableHead>
            <TableBody>
              {type === "admin" ? (
                <>
                  {tabledata &&
                    tabledata?.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="bodyText"
                          style={{ cursor: "pointer" }}
                        >
                          <Box className="displayStart">
                            <Box className="displayStart">
                              <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src={row?.titleImg} />
                              &nbsp; &nbsp; {row.name}
                            </Box>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="bodyText"
                        >
                          {row.size}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="bodyText"
                        >
                          {row.size}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </>
              ) : (
                <>
                  {tabledata &&
                    tabledata?.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="bodyText"
                          style={{ cursor: "pointer" }}
                        >
                          <Box className="displayStart">
                            <Checkbox
                              {...label}
                              defaultChecked
                              color="secondary"
                            />{" "}
                            &nbsp;
                            {row.name}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="bodyText"
                        >
                          {row.size}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="bodyText"
                        >
                          <Box className="displayStart">
                            <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src={row.sharedicon} />
                            &nbsp; {row.shared}
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          className="bodyText"
                        >
                          {row.modified}
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ cursor: "pointer" }}
                          component="th"
                          scope="row"
                          className="bodyText"
                          onClick={() => {
                            router.push("/askabout");
                          }}
                        >
                          <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src={row.talk} />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box my={2} display="flex" justifyContent="center">
          <Box align="center">
            <Pagination count={22} color="primary" />
          </Box>
        </Box>
      </Box>
      <Openingwebsite open={open} handleClose={handleClose} />
    </MainTableComponentBox>
  );
}

export default TableComponent;
