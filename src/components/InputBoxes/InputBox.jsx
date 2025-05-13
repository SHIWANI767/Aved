import React, { useState } from "react";
import PropTypes from "prop-types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment, Box } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "@mui/system";

const InputContainer = styled(Box)(({ bgColor }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: bgColor || "white",
  borderRadius: "4px",
}));

const StyledInput = styled(TextField)(({ error, placeholderColor }) => ({
  border: "unset",
  "& .MuiInputBase-input": {
    fontFamily: "Outfit, sans-serif",
    fontSize: "14px",
    color: "#00000099",
    fontWeight: 400,
    "&::placeholder": {
      color: placeholderColor || "#333",
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
  flex: 1,
}));

const InputBox = ({
  type,
  name,
  placeholder,
  placeholderColor,
  label,
  color,
  backgroundColor,
  borderRadius,
  width,
  height,
  border,
  onChange,
  onBlur,
  maxLength,
  value,
  onPointerLeave,
  inputProps,
  acceptedFile,
  disabled,
  restrictCopyPaste,
  accept,
  error = false,
  multiline = false, // New prop for multiline
  rows = 3, // Default row count for multiline
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    onChange(event);
  };

  return (
    <InputContainer bgColor={backgroundColor}>
      <StyledInput
        type={
          type === "password"
            ? showPassword
              ? "text"
              : "password"
            : type === "file"
            ? "text"
            : type
        }
        placeholder={placeholder}
        name={name}
        sx={{ background: "#25826a0f" }}
        onPointerLeave={onPointerLeave}
        value={type === "file" ? "" : value}
        onChange={type !== "file" ? onChange : null}
        onBlur={onBlur}
        inputProps={{
          maxLength: maxLength,
          ...inputProps,
          readOnly: type === "file",
          ...(restrictCopyPaste
            ? {
                onCopy: (e) => e.preventDefault(),
                onPaste: (e) => e.preventDefault(),
              }
            : {}),
        }}
        InputProps={{
          endAdornment:
            type === "password" ? (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? (
                    <Visibility
                      style={{ fontSize: "25px", color: "#ACACAC" }}
                    />
                  ) : (
                    <VisibilityOff
                      style={{ fontSize: "25px", color: "#ACACAC" }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        error={error}
        placeholderColor={placeholderColor}
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
        }}
        disabled={disabled}
        multiline={multiline} // Enable multiline mode
        rows={multiline ? rows : 1} // Set row count
      />
    </InputContainer>
  );
};

InputBox.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  borderRadius: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  border: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onPointerLeave: PropTypes.func,
  inputProps: PropTypes.object,
  acceptedFile: PropTypes.string,
  restrictCopyPaste: PropTypes.bool,
  accept: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholderColor: PropTypes.string,
  multiline: PropTypes.bool, // New prop type
  rows: PropTypes.number, // New prop type
};

export default InputBox;
