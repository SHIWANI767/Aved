"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Paper,
  InputAdornment,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Search } from "@mui/icons-material";
export default function Filter() {
  const [formType, setFormType] = useState("quiry");
  const [inquiry, setInquiry] = useState("");

  const handleFormTypeChange = (event, newType) => {
    if (newType !== null) setFormType(newType);
  };
  const [open, setOpen] = useState(false);

  return (
    <>
    <Typography variant="h4" mt={5}>Search Property</Typography>
      <Box className="fiterproperty">
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter Keyword..."
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Select
              fullWidth
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              displayEmpty
              variant="outlined"
              placeholder="All Cities"
              type="search"
            >
              <Box mb={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder=""
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid rgb(92, 77, 68)",
                      borderRadius: "4px", // optional
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              </Box>

              <MenuItem value="" disabled>
                All Cities
              </MenuItem>

              <MenuItem value="residential">Residential</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={2}>
            <Select
              fullWidth
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              displayEmpty
              variant="outlined"
              placeholder="All Areas"
              type="search"
            >
              <Box mb={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder=""
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid rgb(92, 77, 68)",
                      borderRadius: "4px", // optional
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              </Box>

              <MenuItem value="" disabled>
                All Areas
              </MenuItem>

              <MenuItem value="residential">Residential</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={2}>
            <Select
              fullWidth
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              displayEmpty
              variant="outlined"
              placeholder="Type"
              type="search"
            >
              <Box mb={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder=""
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid rgb(92, 77, 68)",
                      borderRadius: "4px", // optional
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              </Box>

              <MenuItem value="" disabled>
                Type
              </MenuItem>

              <MenuItem value="residential">Residential</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={3}>
            {/* <Button variant="contained" color="secondary">
            Search
          </Button> */}

            <Box className="displayStart" style={{ gap: "10px" }}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                className="displayCenter"
                startIcon={<SettingsIcon />} // Icon before text
                onClick={() => setOpen(!open)}
              >
                {open ? "Advanced" : "Advanced"}
              </Button>
              <Button variant="contained" color="primary" fullWidth>
                {/* <Search /> */}
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Collapse in={open}>
          <Box style={{ width: "100%", marginTop: "10px" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={2.4} sm={6}>
                <Select
                  fullWidth
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  placeholder="Status"
                  type="search"
                >
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder=""
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          border: "1px solid rgb(92, 77, 68)",
                          borderRadius: "4px", // optional
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    />
                  </Box>

                  <MenuItem value="" disabled>
                    Status
                  </MenuItem>

                  <MenuItem value="residential">Residential</MenuItem>
                  <MenuItem value="commercial">Commercial</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <Select
                  fullWidth
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  placeholder="Bedrooms"
                  type="search"
                >
                  <MenuItem value="" disabled>
                    Bedrooms
                  </MenuItem>

                  <MenuItem value="residential">1</MenuItem>
                  <MenuItem value="commercial">2</MenuItem>
                  <MenuItem value="other">5</MenuItem>
                </Select>
              </Grid>

               <Grid item xs={12} md={2.4} sm={6}>
                <Select
                  fullWidth
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  placeholder="Bathrooms"
                  type="search"
                >
                  <MenuItem value="" disabled>
                    Bathrooms
                  </MenuItem>

                  <MenuItem value="residential">1</MenuItem>
                  <MenuItem value="commercial">2</MenuItem>
                  <MenuItem value="other">5</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <Select
                  fullWidth
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  placeholder="Label"
                  type="search"
                >
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder=""
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          border: "1px solid rgb(92, 77, 68)",
                          borderRadius: "4px", // optional
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    />
                  </Box>

                  <MenuItem value="" disabled>
                    Label
                  </MenuItem>

                  <MenuItem value="residential">Residential</MenuItem>
                  <MenuItem value="commercial">Commercial</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Min. Area"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Max. Area"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <Select
                  fullWidth
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  placeholder="Max. Price"
                  type="search"
                >
                  <Box mb={2}>
                    <Typography variant="body2">Max. Price</Typography>
                  </Box>

                  <MenuItem value="" disabled>
                    Max. Price
                  </MenuItem>

                  <MenuItem value="residential">Residential</MenuItem>
                  <MenuItem value="commercial">Commercial</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={2.4} sm={6}>
                <Select
                  fullWidth
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  displayEmpty
                  variant="outlined"
                  placeholder="Min. Price"
                  type="search"
                >
                  <Box mb={2}>
                    <Typography variant="body2">Min. Price</Typography>
                  </Box>

                  <MenuItem value="" disabled>
                    Min. Price
                  </MenuItem>

                  <MenuItem value="residential">Residential</MenuItem>
                  <MenuItem value="commercial">Commercial</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={2.4} sm={6}>
                <Box>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Property ID"
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
