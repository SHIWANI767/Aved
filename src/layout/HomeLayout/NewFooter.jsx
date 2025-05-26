import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const socialLinks = [
  { name: "Facebook", href: "https://www.facebook.com/realestate.aved" },
  { name: "Instagram", href: "https://www.instagram.com/avedrealestate/?igsh=ZXN6cHc5MHRzMnRt#" },
  { name: "Linkedin", href: "https://www.linkedin.com/company/avedrealestate/?viewAsMember=true" },
  { name: "Twitter", href: "https://x.com/avedrealestate?s=21&t=G6uZG2bWUKQ6oFJAJl8YNAhttps://x.com/avedrealestate?s=21&t=G6uZG2bWUKQ6oFJAJl8YNA" },
];

export default function NewFooter() {
  return (
    <Box
      py={6}
      sx={{
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        background: "#5c4d44",
        margin: "20px",
      }}
      className="main-sectionGap maifootersection"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Section - Logo and Description */}
          <Grid item xs={12} md={4} className="footerLogodescription">
            <Box display="flex" alignItems="center" mb={2}>
              <img
                src="/images/logowhite.svg"
                alt="logo"
                className="footerLogo"
              />
            </Box>
            <Typography
              color="#ffffffdb"
              variant="body2"
              lineHeight="25px"
              style={{ maxWidth: "308px" }}
            >
              We are creators of transformative spaces that inspire, innovate,
              and endure.
            </Typography>
          </Grid>

          {/* Middle Columns */}
          <Grid item xs={12} md={4} className="centerborderfooter">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  fontWeight="600"
                  color="#fff"
                  mb={1}
                >
                  About Us
                </Typography>
                {[
                  { label: "Why Choose Us", href: "/about-us" },
                  { label: "Our Team", href: "/about-us" },
                  { label: "Properties", href: "/project" },
                  { label: "Partners", href: "/" },
                ].map((item) => (
                  <Typography
                    key={item.label}
                    color="#fff"
                    variant="body2"
                    mb={0.5}
                  >
                    <Link href={item.href} underline="hover" color="inherit">
                      {item.label}
                    </Link>
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  color="#fff"
                  mb={1}
                  fontWeight="600"
                >
                  Our Projects
                </Typography>
                {[
                  { label: "News & Updates", href: "/blogs" },
                  { label: "Terms & Conditions", href: "/term-condition" },
                  { label: "Privacy Policy", href: "/privacy-policy" },
                  { label: "Contact", href: "/contact-us" },
                ].map((item) => (
                  <Typography
                    key={item.label}
                    variant="body2"
                    color="#fff"
                    mb={0.5}
                  >
                    <Link href={item.href} underline="hover" color="inherit">
                      {item.label}
                    </Link>
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Right Section - Contact */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h3"
              color="#fff"
              mb={1}
              style={{
                borderBottom: "1px solid #ffffff1c",
                width: "fit-content",
              }}
            >
              +966 56 658 9443
            </Typography>
            <Typography
              variant="h3"
              color="#fff"
              mb={2}
              style={{
                borderBottom: "1px solid #ffffff1c",
                width: "fit-content",
              }}
            >
              <Link
                href="mailto:info@aved-sa.com"
                underline="hover"
                color="inherit"
              >
                info@aved-sa.com
              </Link>
            </Typography>
            <Box display="flex" gap={1}>
              {socialLinks.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  variant="body2"
                  color="#ffffffdb"
                >
                  {name}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box mt={6} pt={3} borderTop="1px solid #eeeeee2b" textAlign="center" className="footercopy">
          <Typography variant="body2" color="#fff">
            © 2025 <strong>Aved</strong>. All Rights Reserved.
          </Typography>
        </Box>

        {/* Scroll to Top */}
        <IconButton
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            bgcolor: "#fff",
            boxShadow: 2,
            // "&:hover": { bgcolor: "#e0e000" },
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <KeyboardArrowUpIcon style={{ color: "#000" }} />
        </IconButton>
      </Container>
    </Box>
  );
}
