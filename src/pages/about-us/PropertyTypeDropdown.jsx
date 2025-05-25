// components/PropertyFilterDropdown.js
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // import both icons

const PropertyFilterDropdown = () => {
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
  const [formType, setFormType] = useState("quiry");
  const [inquiry, setInquiry] = useState("");
  return (
    <Container className="custumSelectBoxmain">
      <Box className="filterContainer">
        {/* Property Type */}
        <div
          className="dropdownWrapper"
          ref={(el) => (dropdownRefs.current["propertyType"] = el)}
        >
          <div
            className="dropdownHeader"
            onClick={() => toggleDropdown("propertyType")}
          >
            <div>
              <Typography variant="h6" className="menunameText">
                Property Type
              </Typography>
              <Typography variant="body2" className="menuTypeText">
                Any
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
          className="dropdownWrapper"
          ref={(el) => (dropdownRefs.current["bedroom"] = el)}
        >
          <div
            className="dropdownHeader"
            onClick={() => toggleDropdown("bedroom")}
          >
            <div>
              <Typography variant="h6" className="menunameText">
                Bedroom
              </Typography>
              <Typography variant="body2" className="menuTypeText">
                Any
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
          className="dropdownWrapper"
          ref={(el) => (dropdownRefs.current["priceRange"] = el)}
        >
          <div
            className="dropdownHeader"
            onClick={() => toggleDropdown("priceRange")}
          >
            <div>
              <Typography variant="h6" className="menunameText">
                Price Range
              </Typography>
              <Typography variant="body2" className="menuTypeText">
                Any
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
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="body2" mb={0.5} className="menunameText">
                    {" "}
                    Min Price (AED)
                  </Typography>
                  <Select
                    fullWidth
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    placeholder="0"
                    type="search"
                  >
                    <MenuItem value="" disabled>
                      0
                    </MenuItem>

                    <MenuItem value="residential">300,0000</MenuItem>
                    <MenuItem value="commercial">400,0000</MenuItem>
                    <MenuItem value="other">500,0000</MenuItem>
                  </Select>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="body2" mb={0.5} className="menunameText">
                    {" "}
                    Max Price (AED)
                  </Typography>
                  <Select
                    fullWidth
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                    displayEmpty
                    variant="outlined"
                    placeholder="0"
                    type="search"
                  >
                    <MenuItem value="" disabled>
                      100,0000
                    </MenuItem>

                    <MenuItem value="residential">300,0000</MenuItem>
                    <MenuItem value="commercial">400,0000</MenuItem>
                    <MenuItem value="other">500,0000</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <button className="clearButton">Clear Selection</button>
            </div>
          )}
        </div>

        {/* Community */}

        {/* Community Lab */}
        <div
          className="dropdownWrapper"
          ref={(el) => (dropdownRefs.current["community Lab"] = el)}
        >
          <div
            className="dropdownHeader"
            onClick={() => toggleDropdown("community Lab")}
          >
            <div>
              <Typography variant="h6" className="menunameText">
                Property Type
              </Typography>
              <Typography variant="body2" className="menuTypeText">
                Any
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

        <div
          className="dropdownWrapper"
          ref={(el) => (dropdownRefs.current["community"] = el)}
        >
          <Button variant="contained" color="primary" className="serchCustom">
            Search Properties
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default PropertyFilterDropdown;
