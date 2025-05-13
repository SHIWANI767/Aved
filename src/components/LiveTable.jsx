import React from "react";
import { styled } from "@mui/system";
import {
  Typography,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";

const LivetableBox = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: "999",
  backgroundColor:"rgba(255, 255, 255, 0.03)",
  "& .typoBox": {
    padding: "10px 0px 30px",
  },
  "& .invitebutton": {
    marginRight: "-13px",
    padding: "24px 39px",
  },
  "& .paperBox": {
    padding: "80px 30px",
    borderRadius: "5px",
  },
  "& .invitelistBox": {
    padding: "30px 0px 10px",
  },
  "& .displaySpacearound": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "10px 0px",
    marginTop: "15px",
  },
  "& .lastRow" :{
    borderBottom: "none",
  },
}));

const tabledata = [
  {
    Size: "131.2419000",
    Price: "7.9999",
    Size1: "23.3700000",
    Price1: "0.2714",
  },
  {
    Size: "131.2419000",
    Price: "7.9999",
    Size1: "23.3700000",
    Price1: "0.2714",
  },
  {
    Size: "131.2419000",
    Price: "7.9999",
    Size1: "23.3700000",
    Price1: "0.2714",
  },
  {
    Size: "131.2419000",
    Price: "7.9999",
    Size1: "23.3700000",
    Price1: "0.2714",
  },
  {
    Size: "131.2419000",
    Price: "7.9999",
    Size1: "23.3700000",
    Price1: "0.2714",
  },
  {
    Size: "131.2419000",
    Price: "7.9999",
    Size1: "23.3700000",
    Price1: "0.2714",
  },
  {
    Size: "131.2419000",
    Price: "7.9999",
    Size1: "23.3700000",
    Price1: "0.2714",
  },
  {
    Size: "131.2419000",
    Price: "7.9999",
    Size1: "23.3700000",
    Price1: "0.2714",
  },
  {
    Size: "131.2419000",
    Price: "7.9999",
    Size1: "23.3700000",
    Price1: "0.2714",
  },
];

export default function LiveTable() {
  return (
    <LivetableBox>
      <Box className="displaySpacearound">
        <Typography variant="h6" color="primary">
          HitBTC USD
        </Typography>
        <Typography variant="h6" color="primary">
          HitBTC USDT
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Size</TableCell>
              <TableCell sx={{ minWidth: "100px",textAlign: "center"  }}>Price</TableCell>
              <TableCell sx={{ minWidth: "200px",textAlign: "center"  }}>Size</TableCell>
              <TableCell style={{ textAlign: "center" }}>Price</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tabledata.map((value, index) => (
              <TableRow key={index} className={index === tabledata.length - 1 ? "lastRow" : ""}>
              <TableCell style={{ textAlign: "center" }}>{value.Size}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{value.Price}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{value.Size1}</TableCell>
                <TableCell style={{ textAlign: "center" }}>{value.Price1}</TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </LivetableBox>
  );
}
