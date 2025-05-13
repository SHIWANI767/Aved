import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import AlertCards from "@/components/AlertCard";
import i18n from "@/i18n";
import ExitWindow from "@/components/ExitWindow";
export default function DashboardLayout({ children }) {
  const currentLang = i18n.language;
  console.log(currentLang);
  const isArabic = currentLang === "ar";

  return (
    <Box
      sx={{
        display: { sm: "block", md: "flex" },
        flexDirection: isArabic ? "row-reverse" : "row",
      }}
    >
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
        <Box>
          <AlertCards />
        </Box>

        {/* Children (Main Content) */}
        <Box
          sx={{
            flex: 1, // Allows the content area to grow and take available space
            padding: { xs: 2, md: 3 },
            overflowY: "auto", // Enables scrolling for the content area
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
