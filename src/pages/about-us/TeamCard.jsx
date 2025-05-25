"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const TeamCard = ({ name, description, image, role }) => {
  return (
    <div className="cardBox">
      <div className="card">
        <div className="card">
          <Image src={image} alt={name} fill className="cardImage" />
        </div>
        <div className="cardContent">
          <Typography variant="h2" fontSize="20px" lineHeight="30px">
            {role}
          </Typography>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{description}</Typography>

          <Box align="center" mt={2} className="displayStart" gap="10px">
            <FaFacebookF style={{cursor:"pointer", fontSize:"26px"}}/>
              <FaWhatsapp style={{cursor:"pointer", fontSize:"26px"}}/>
                <FaLinkedinIn style={{cursor:"pointer", fontSize:"26px"}}/>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
