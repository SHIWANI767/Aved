// components/PropertyFilterDropdown.js
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // import both icons

const PropertyTypeDropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(event.target)
      );
      if (isOutside) setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };
  const propertyTypes = [
    "Apartment",
    "Plot",
    "Hotel",
    "Townhouse",
    "Office",
    "Villa",
  ];
  const propertyTypes1 = [
    "Apartment",
    "Plot",
    "Hotel",
    "Townhouse",
    "Office",
    "Villa",
  ];

  const featuredCommunities = [
    "Grand Polo Club & Resort",
    "Expo Living",
    "Address Al Marjan Island, Ras Al Khaimah",
    "THE OASIS",
    "Grand Polo Club & Resort",
  ];

  const moreCommunities = ["Address Residences Zabeel"];

  return (
  
      <Box
        className="filterContainer"
        style={{
          border: "1px solid #8080806e",
          marginBottom: "20px",
          height: "52px",
        }}
      >
        {/* Property Type */}
        <Box className="propertyFilter drodownfiltermenu">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Your Name"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#fff",
              },
            }}
          />
        </Box>

        <div
          className="dropdownWrapper drodownfiltermenu"
          ref={(el) => (dropdownRefs.current["propertyType"] = el)}
        >
          <div
            className="dropdownHeader filterdrodown"
            onClick={() => toggleDropdown("propertyType")}
          >
            <div>
              <Typography variant="h6" className="menunameText">
                All Cities
              </Typography>
            </div>

            <span className="arrow">
              {openDropdown === "propertyType" ? (
                <IoIosArrowUp className="custumarrow" />
              ) : (
                <IoIosArrowDown className="custumarrow" />
              )}
            </span>
          </div>

          <div
            className={`dropdownContentWrapper ${
              openDropdown === "propertyType" ? "open" : "closed"
            }`}
          >
            <div className="dropdownContent">
              <Grid container spacing={2}>
                {propertyTypes.map((type, index) => (
                  <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
                    <Box className="displayStart" style={{ gap: "10px" }}>
                      <input
                        type="checkbox"
                        className="customCheckbox"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <Typography variant="body1">{type}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <button className="clearButton">Clear Selection</button>
            </div>
          </div>
        </div>

        {/* Bedroom */}
        <div
          className="dropdownWrapper drodownfiltermenu"
          ref={(el) => (dropdownRefs.current["bedroom"] = el)}
        >
          <div
            className="dropdownHeader filterdrodown"
            onClick={() => toggleDropdown("bedroom")}
          >
            <div>
              <Typography variant="h6" className="menunameText">
                All Area
              </Typography>
            </div>
            <span className="arrow">
              {openDropdown === "propertyType" ? (
                <IoIosArrowUp className="custumarrow" />
              ) : (
                <IoIosArrowDown className="custumarrow" />
              )}
            </span>
          </div>
          {openDropdown === "bedroom" && (
            <div className="dropdownContent">
              <Grid container spacing={2}>
                {propertyTypes1.map((type, index) => (
                  <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
                    <Box className="displayStart" style={{ gap: "10px" }}>
                      <input
                        type="checkbox"
                        className="customCheckbox"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <Typography variant="body1">{type}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <button className="clearButton">Clear Selection</button>
            </div>
          )}
        </div>

        {/* Price Range */}
        <div
          className="dropdownWrapper drodownfiltermenu"
          ref={(el) => (dropdownRefs.current["priceRange"] = el)}
        >
          <div
            className="dropdownHeader filterdrodown"
            onClick={() => toggleDropdown("priceRange")}
          >
            <div>
              <Typography variant="h6" className="menunameText">
                Type
              </Typography>
            </div>
            <span className="arrow">
              {openDropdown === "propertyType" ? (
                <IoIosArrowUp className="custumarrow" />
              ) : (
                <IoIosArrowDown className="custumarrow" />
              )}
            </span>
          </div>
          {openDropdown === "priceRange" && (
            <div className="dropdownContent">
              <Grid container spacing={2}>
                {propertyTypes1.map((type, index) => (
                  <Grid item lg={6} md={6} sm={12} xs={12} key={index}>
                    <Box className="displayStart" style={{ gap: "10px" }}>
                      <input
                        type="checkbox"
                        className="customCheckbox"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <Typography variant="body1">{type}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <button className="clearButton">Clear Selection</button>
            </div>
          )}
        </div>

        {/* Community */}

        {/* Community Lab */}
        <div
          className="dropdownWrapper drodownfiltermenu"
          ref={(el) => (dropdownRefs.current["community Lab"] = el)}
        >
          <div
            className="dropdownHeader filterdrodown"
            onClick={() => toggleDropdown("community Lab")}
          >
            <div>
              <Typography variant="h6" className="menunameText">
                Advanced
              </Typography>
            </div>
            <span className="arrow">
              {openDropdown === "propertyType" ? (
                <IoIosArrowUp className="custumarrow" />
              ) : (
                <IoIosArrowDown className="custumarrow" />
              )}
            </span>
          </div>
        </div>

        <div
          className="dropdownWrapper drodownfiltermenu"
          ref={(el) => (dropdownRefs.current["community Lab"] = el)}
        >
          <div
            className="dropdownHeader filterdrodown"
            onClick={() => toggleDropdown("community Lab")}
          >
            <div>
              <Typography variant="h6" className="menunameText">
                Advanced
              </Typography>
            </div>
            <span className="arrow">
              {openDropdown === "community Lab" ? (
                <IoIosArrowUp className="custumarrow" />
              ) : (
                <IoIosArrowDown className="custumarrow" />
              )}
            </span>
          </div>

          {openDropdown === "community Lab" && (
            <div className="dropdownContent dropdownfull">
              <Grid container spacing={2}>
                <Grid item lg={3} md={3} sm={6} xs={12}>
                  <Typography
                    variant="body1"
                    mb={1}
                    style={{
                      textTransform: "uppercase",
                      color: "#000000c4",
                      fontWeight: "600",
                      fontSize: "13px",
                    }}
                  >
                    Featured Community
                  </Typography>
                  {featuredCommunities.map((community, index) => (
                    <Box
                      key={index}
                      className="displayStart"
                      style={{ gap: "10px" }}
                      mb={2}
                      mt={1}
                    >
                      <input type="checkbox" className="customCheckbox" />
                      <Typography variant="body1">{community}</Typography>
                    </Box>
                  ))}
                </Grid>

                <Grid item lg={9} md={9} sm={6} xs={12}>
                  <Typography
                    variant="body1"
                    mb={1}
                    style={{
                      textTransform: "uppercase",
                      color: "#000000c4",
                      fontWeight: "600",
                      fontSize: "13px",
                    }}
                  >
                    More Communities
                  </Typography>
                  {moreCommunities.map((community, index) => (
                    <Box
                      key={index}
                      className="displayStart"
                      style={{ gap: "10px" }}
                      mb={1}
                    >
                      <input
                        type="checkbox"
                        className="customCheckbox"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <Typography variant="body1">{community}</Typography>
                    </Box>
                  ))}
                </Grid>
              </Grid>

              <button className="clearButton">Clear Selection</button>
            </div>
          )}
        </div>

        <div
          className="dropdownWrapper drodownfiltermenu"
          ref={(el) => (dropdownRefs.current["community"] = el)}
        >
          <Button
            variant="contained"
            color="primary"
            className="serchCustom"
            style={{ marginTop: "0px", width: "auto" }}
          >
            Search
          </Button>
        </div>
      </Box>
 
  );
};

export default PropertyTypeDropdown;
