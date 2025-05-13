import { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';

import Projectcard from './Projectcard';


const emmarData = [
  {
    title: "GRAND POLO CLUB & RESORT",
    description: "An opulent equestrian lifestyle where elegance, architecture, and panoramic verdant views come together.",
    image: "/images/Project/pro_1.jpg",
    ctaText: "Register for New Launches",
  },
   {
    title: "Dubai Hills Estate",
    description: "An opulent equestrian lifestyle where elegance, architecture, and panoramic verdant views come together.",
    image: "/images/Project/details.jpeg",
    ctaText: "Register for New Launches",
  },
   {
    title: "GRAND POLO CLUB & RESORT",
    description: "An opulent equestrian lifestyle where elegance, architecture, and panoramic verdant views come together.",
    image: "/images/Project/pro_1.jpg",
    ctaText: "Register for New Launches",
  },
];

const nowAvailableData = [
  {
    title: "DUBAI HILLS ESTATE",
    description: "A thriving community where wellness meets connection. Parks, trails, and vibrant spaces await.",
    image: "/images/Project/pro_1.jpg",
    ctaText: "Register for New Launches",
  },
];

const Mainroject = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const renderTabContent = () => {
    const data = value === 0 ? emmarData : nowAvailableData;
    return data.map((item, idx) => (
      <Projectcard key={idx} {...item} />
    ));
  };

  return (
    <Box className="wrapper">
     <Tabs
  value={value}
  onChange={handleChange}
  aria-label="property tabs"
  className="tabs"
  TabIndicatorProps={{ style: { display: 'none' } }} // hides default underline
>
  <Tab
    label="AVED COMMUNITIES"
    sx={{
      color: value === 0 ? 'secondary.main' : 'primary.main',
      fontWeight: value === 0 ? 'bold' : 'normal',
     
      borderBottom: value === 0 ? '2px solid rgb(92, 77, 68)' : '2px solid transparent',
    }}
  />
  <Tab
    label="NOW AVAILABLE"
    sx={{
      color: value === 1 ? 'secondary.main' : 'primary.main',
      fontWeight: value === 1 ? 'bold' : 'normal',
      
      borderBottom: value === 1 ? '2px solid rgb(92, 77, 68)' : '2px solid transparent',
    }}
  />
</Tabs>


      <Box className="tabContent">
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default Mainroject;
