import HomeLayout from "@/layout/HomeLayout";
import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { GrAttachment } from "react-icons/gr";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Progressbar from "@/components/Progressbar";

const DocumentUploaderBox = styled("Box")(({ theme }) => ({
  "& .carePlanBox": {
    "& h5": {
      color: "#161E29",
      fontWeight: "500",
      margin: "16px 0px 8px",
    },
    "& p": {
      color: "rgba(22, 30, 41, 0.87)",
      fontWeight: "300",
      marginBottom: "8px",
    },
    "& .uploadedImage": {
      "& img": {
        maxHeight: "300px",
        position: "relative",
        top: "0px",
        padding: "5px",
        width: "100%",
        backgroundSize: "cover !important",
        backgroundRepeat: "no-repeat !important",
        objectFit: "cover !important",
      },
      "& .MuiIconButton-root": {
        fontSize: "35px",
        position: "absolute",
        left: "400px",
      },
    },
  },
}));

export default function DocumentUploader({ heading }) {
  const [dropZoneImage, setDropZoneImage] = useState("");
  const handleDrop = (acceptedFiles) => {
    setDropZoneImage(URL.createObjectURL(acceptedFiles[0]));
  };
  const removeImage = () => {
    setDropZoneImage("");
  };
  return (
    <DocumentUploaderBox>
      <Box className="carePlanBox">
        <Typography variant="h2">{heading}</Typography>
        <Typography variant="h5">Upload a document or add a link</Typography>
        <Typography variant="body2">
          Upload a document and once it is uploaded you can ask questions about
          that document
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <Typography
                variant="body2"
                style={{ color: "rgba(0, 0, 0, 0.87)", fontWeight: 300 }}
              >
                Upload Files
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "rgba(22, 30, 41, 0.75)", fontWeight: 300 }}
              >
                JPEG, PNG, GIF, Max 10mb
              </Typography>

              {dropZoneImage ? (
                <Box className="uploadedImage">
                  <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
                    src={dropZoneImage}
                    className="viewImg"
                    alt={`View Image: ${dropZoneImage}`}
                  />
                  <IconButton onClick={() => removeImage()}>
                    <AiFillDelete />
                  </IconButton>
                </Box>
              ) : (
                <Box className={`displayColumn dropZoneBox`} mt={2}>
                  <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        align="center"
                        className="dropZoneBox1"
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()}
                          src="/images/drap.svg"
                          alt="Dragimage"
                          cursor="pointer"
                        />
                        <Box mt={3}>
                          <Typography variant="body2">
                            Drag and Drop here ?{" "}
                          </Typography>
                        </Box>
                        <Box mt={3} mb={3}>
                          <Typography variant="body2">or</Typography>
                        </Box>
                        <Box mb={3}>
                          <Button variant="outlined" color="primary">
                            Browse Files
                          </Button>
                        </Box>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Upload from URL"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <GrAttachment color="#000" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box>
              <Typography
                variant="body2"
                style={{ color: "rgba(0, 0, 0, 0.87)", fontWeight: 300 }}
              >
                Uploading Status
              </Typography>
              <Typography
                variant="body1"
                style={{ color: "rgba(22, 30, 41, 0.75)", fontWeight: 300 }}
              >
                Here you can see the status of uploading your files
              </Typography>

              <Box position="relative">
                <Box className="labelprogressBox">
                  <IoClose
                    style={{ color: "#7A69FE" }}
                    className="closeIconBox"
                  />
                  <Box className="displayStart">
                    <Box>
                      <Box className="circlemainBox displayCenter">
                        <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/doc-img.jpg" alt="image" />
                      </Box>
                    </Box>

                    <Box width="100%" ml={3}>
                      <Typography variant="h6">
                        Uploading Medical Report
                      </Typography>
                      <Box align="right" mt={2} mb={1}>
                        <Typography variant="body2" color="#7A69FE">
                          69%
                        </Typography>
                      </Box>
                      <Progressbar />
                    </Box>
                  </Box>
                </Box>
                <Box className="labelprogressBox" mt={2} position="relative">
                  <AiOutlineCheck
                    style={{ color: "#02BC7D" }}
                    className="closeIconBox greenclose"
                  />
                  <Box className="displayStart">
                    <Box>
                      <Box className="circlemainBox displayCenter">
                        <img
                  onDragStart={(e) => e.preventDefault()}  onContextMenu={(e) => e.preventDefault()} src="/images/pdf-image.jpg" alt="image" />
                      </Box>
                    </Box>

                    <Box width="100%" ml={3}>
                      <Typography variant="h6">
                        Care Plan - Robert Planner
                      </Typography>
                      <Box mt={1} mb={1}>
                        <Typography variant="body2" color="#7A69FE">
                          500 kb
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DocumentUploaderBox>
  );
}

DocumentUploader.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};
