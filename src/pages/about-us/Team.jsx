import { Box, Container, Typography } from "@mui/material";
import TeamCard from "./TeamCard";

const TeamSection = () => {
  return (
    <Container className="main-sectionGap">
      <Box align="center" className="subSection">
        <Typography variant="h2" style={{ textTransform: "uppercase" }}>
          Members of the Board of Directors
        </Typography>
      </Box>
      <div
        style={{
          display: "grid",
          gap: "30px",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
        className="teamGridBox"
      >
        <TeamCard
          role="Dr. Mohanad Naeem AlShaikh"
          name="Chairman of the Board of Directors"
          description="“Our passion lies in curating spaces that define luxury and innovation, creating lifestyles that transcend the ordinary.”"
          image="/images/Team/1.jpg" // Place image inside /public/team/
        />
        <TeamCard
          role="Mr. Hasan Habib Saber"
          name="Executive Chairman"
          description="“With each new development, we shape more than just skylines; but the future of the real estate industry.”"
          image="/images/Team/2.jpg"
        />

        <TeamCard
          role="Eng. Abdullah Saleh Binladin"
          name="Chairman of the Audit and Review Committee"
          description="“Through diligent oversight, we ensure that all our endeavors resonate with integrity, precision, and excellence.”"
          image="/images/Team/3.jpg"
        />
        <TeamCard
          role="Mr. Khalid Naeem AlShaikh"
          name="Executive Vice President"
          description="“We believe in crafting environments that reflect our clients' aspirations, offering both luxury and authenticity.”"
          image="/images/Team/4.jpg"
        />

        <TeamCard
          role="Mr. Ghaith Saleh Binladin"
          name="Chairman of the Investment Committee"
          description="“Driven by a shared vision, we strive not only to maximize returns but to leave a mark wherever we venture.”"
          image="/images/Team/5.png"
        />
      </div>
    </Container>
  );
};

export default TeamSection;
