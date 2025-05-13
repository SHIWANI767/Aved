import { Box, Typography, Button, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BlogCard({ image, title, date, description, slug }) {
  const router = useRouter();
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 200,
          overflow: "hidden", // ensures image doesn't spill on scale
          "& .blog-image": {
            transition: "transform 0.4s ease",
          },
          "&:hover .blog-image": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="blog-image"
          style={{ objectFit: "cover", cursor: "pointer" }}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </Box>

      {/* Content Section */}
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="caption" color="text.secondary">
          {date}
        </Typography>

        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
          lineHeight="25px"
        >
          {description.length > 100
            ? description.slice(0, 100) + "..."
            : description}
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ padding: "8px 18px", fontSize: "10px" }}
          onClick={() => router.push(`/bogs-details`)} // Correct placement of onClick
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
}
