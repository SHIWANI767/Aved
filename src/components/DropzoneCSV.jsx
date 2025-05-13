import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import Dropzone from "react-dropzone";

const DropzoneCSV = () => {
  const [dropZoneFile, setDropZoneFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file && file.type === "text/csv") {
      setDropZoneFile(file);
    } else {
      // Handle invalid file type
      alert("Please select a CSV file.");
    }
  };

  return (
    <div className="dropZoneBox">
      {dropZoneFile && (
        <Typography variant="body2" className="fileName">
          {dropZoneFile.name}
        </Typography>
      )}
      <Dropzone onDrop={handleDrop} accept=".csv">
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

export default DropzoneCSV;
