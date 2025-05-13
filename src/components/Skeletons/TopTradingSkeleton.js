import React from "react";
import {
  TableContainer,
  Table,
  Box,
  TableCell,
  TableBody,
  TableRow,
  Skeleton,
} from "@mui/material";

export default function TopTradingSkeleton({ skeleton }) {
  return (
    <Box className={"classes.PostBox"}>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              {skeleton &&
                skeleton?.map((data) => (
                  <TableCell>
                    <Skeleton animation="wave" height={25} width="100%" />
                  </TableCell>
                ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
