import React from "react";
import PropTypes from "prop-types";
import { MenuItem, TextField, Box } from "@mui/material";
import { styled } from "@mui/system";

const InputContainer = styled(Box)(({ bgColor }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: bgColor || "white",
  borderRadius: "4px",
}));

const StyledSelect = styled(TextField)(({ error, placeholderColor }) => ({
  border: "unset",
  "& .MuiInputBase-input": {
    fontFamily: "Outfit, sans-serif",
    fontSize: "14px",
    color: "#00000099",
    fontWeight: 400,
    "&::placeholder": {
      color: placeholderColor || "#000",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: `1px solid ${error ? "#FFBABA" : "#E4E4E7"}`,
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      border: `1px solid ${error ? "#FFBABA" : "#25826A"}`,
      borderRadius: "8px",
    },
    "&.Mui-focused fieldset": {
      border: `1px solid ${error ? "#FFBABA" : "#25826A"}`,
      borderRadius: "8px",
    },
  },
  // Add styling for dropdown icon
  "& .MuiSelect-icon": {
    color: "#25826A", // Change the color if needed
    right: "10px", // Adjust position
  },
  flex: 1,
}));

const DropdownInput = ({
  name,
  value,
  options,
  onChange,
  placeholder,
  placeholderColor,
  color,
  backgroundColor,
  borderRadius,
  width,
  height,
  disabled,
  error = false,
}) => {
  return (
    <InputContainer bgColor={backgroundColor}>
      <StyledSelect
        select
        name={name}
        value={value || ""} // Ensure empty string as default if no value is selected
        onChange={onChange}
        error={error}
        style={{
          color: color,
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          border: "none",
          outline: "none",
          width: width || "100%",
          height: height,
          boxSizing: "border-box",
          fontSize: "14px",
          fontWeight: "300",
          fontFamily: "Outfit",
          background: "#25826a0f",
        }}
        disabled={disabled}
      >
        {/* Placeholder as a disabled option */}
        <MenuItem value="select value" disabled sx={{ color: "#000", opacity:"1.5 !important" }}>
          {placeholder}
        </MenuItem>

        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </InputContainer>
  );
};

DropdownInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

export default DropdownInput;
