// "use server";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

export default function NoExchangeAdd() {
  const router = useRouter();

  return (
    <Paper elevation={2}>
      <Box sx={{ padding: 3, textAligndisplayFlexCenter: "center" }}>
        <Container maxWidth="sm">
          <Box sx={{ textAlign: "center" }}>
            <img
              onDragStart={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              src="/images/DashboardIcon/profileMoneyIcon.png"
              alt="MoneyIcon"
              style={{ marginBottom: "16px" }}
            />
            <Typography variant="h6" color="primary">
              Add your first exchange account &nbsp;!
            </Typography>
            <Typography variant="body2" color="primary">
              You haven't created or added any exchange accounts yet. Use the
              button below to add an account for trading.
            </Typography>
            <Box mt={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/dashboard/exchanges?type=addNew")}
                // onClick={() => setIsConnected(true)}
              >
                Add New Exchange
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Paper>
  );
}
