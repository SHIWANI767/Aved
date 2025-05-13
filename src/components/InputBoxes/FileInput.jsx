import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import { IconButton, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

const FileUploadContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1px dashed #ccc",
  borderRadius: "8px",
  padding: "16px",
  cursor: "pointer",
  position: "relative",
  width: "95%",
  height: "150px",
  textAlign: "center",
});

const FilePreview = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RemoveButton = styled(IconButton)({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(0,0,0,0.5)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});

const FileInput = forwardRef (({ accept, onChange }, ref) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onChange(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onChange(null);
  };

  useImperativeHandle(ref, () => ({
    clearFile: handleRemoveFile,
  }));


  return (
    <FileUploadContainer>
      <input
        type="file"
        hidden
        accept={accept}
        onChange={handleFileChange}
        id="file-upload"
      />
      {!file ? (
        <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
          <CloudUploadIcon style={{ fontSize: "40px", color: "#aaa" }} />
          <Typography variant="h6" color="textSecondary">
            Upload File
          </Typography>
        </label>
      ) : (
        <FilePreview>
          {file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                borderRadius: "8px",
              }}
            />
          ) : (
            <Typography variant="body2">{file.name}</Typography>
          )}
          <RemoveButton onClick={handleRemoveFile} size="small">
            <CloseIcon fontSize="small" />
          </RemoveButton>
        </FilePreview>
      )}
    </FileUploadContainer>
  );
});

FileInput.propTypes = {
  accept: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FileInput;
