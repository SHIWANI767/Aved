import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Dropzone from "react-dropzone";

const Dropzonearea = () => {
  const [dropZoneImage, setDropZoneImage] = useState("");

  const handleDrop = (acceptedFiles) => {
    setDropZoneImage(URL.createObjectURL(acceptedFiles[0]));
  };

  return (
    <div className="dropZoneBox">
      {dropZoneImage && (
        <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
          src={dropZoneImage}
          className="viewImg"
          alt={`View Image: ${dropZoneImage}`}
        />
      )}
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <Box align="center" className="dropZoneBox1" {...getRootProps()}>
            <input {...getInputProps()} />
            <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/drap.svg" alt="Dragimage" cursor="pointer" />
            <Box mt={3}>
              <Typography variant="body2">Drag and Drop here ? </Typography>
            </Box>
            <Box mt={3} mb={3}>
              <Typography variant="body2">or</Typography>
            </Box>
            <Box>
              <Button variant="outlined" color="primary">
                Browse Files
              </Button>
            </Box>
          </Box>
        )}
      </Dropzone>
    </div>
  );
};

export default Dropzonearea;
