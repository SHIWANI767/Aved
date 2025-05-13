import AlertCards from "@/components/AlertCard";
import Sidebar from "@/layout/DashboardLayout/Sidebar";
import { Box, CssBaseline } from "@mui/material";
import i18n from "@/i18n";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: { sm: "block", md: "-webkit-box" } }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Main Content Header */}
        <Box
          sx={{ display: { md: "none", lg: "block", sm: "none", xs: "none" } }}
        >
          <AlertCards />
        </Box>

        {/* Children (Main Content) */}
        <Box
          sx={{
            // flex: 1, // Allows the content area to grow and take available space
            padding: "unset !important",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
