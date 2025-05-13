import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";

const options = [
  {
    value: "apple",
    label: "Ethereum",
    imageUrl: "/images/eth_logo.svg",
  },
  {
    value: "banana",
    label: "Ethereum",
    imageUrl: "/images/eth_logo.svg",
  },
  {
    value: "cherry",
    label: "Ethereum",
    imageUrl: "/images/eth_logo.svg",
  },
];

const PerformaceSelect = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]); // Set default selected value
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option); // Set selected option
    setOpen(false); // Close dropdown after selection
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <Box
      className="gradienborderBox"
      sx={{
        position: "relative",
      }}
      onClick={toggleDropdown}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className="custum-SelectBox"
      >
        <Box display="flex" alignItems="center" className="custumMenuBox">
          <Avatar
            src={selectedOption.imageUrl}
            alt={selectedOption.label}
            sx={{ mr: 1.2 }}
          />
          <Typography variant="h5" color="primary">
            {selectedOption.label}
          </Typography>
        </Box>
        <Box>
          {/* Conditional rendering of the image based on the "open" state */}
          {open ? (
            <img src="/images/arrow.png" alt="Dropdown Icon" />
          ) : (
            <img src="/images/arrow.png" alt="Dropdown Icon" />
          )}
        </Box>
      </Box>

      {/* Custom Dropdown */}
      {open && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",

            borderRadius: "8px",
            backgroundColor: "#2e1b4a",
            zIndex: 10,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {options.map((option) => (
            <Box
              key={option.value}
              display="flex"
              alignItems="center"
              padding="10px"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#221734",
                },
              }}
              onClick={() => handleSelect(option)}
            >
              <Avatar src={option.imageUrl} alt={option.label} sx={{ mr: 2 }} />
              <Typography>{option.label}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PerformaceSelect;
