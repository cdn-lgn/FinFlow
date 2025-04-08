import React, { useContext } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { ThemeContext } from "../../context/ThemeContext";

export default function Footer() {
  const { colors } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        background: colors.background,
        color: colors.text,
        textAlign: "center",
        borderTop: `1px solid ${colors.text}33`, // little fade line
      }}
      className="w-full"
    >
      <Typography variant="body1" mb={2}>
        &copy; {new Date().getFullYear()} <b>FinFlow</b> — Modern Banking, Made for You.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <IconButton
          component="a"
          href="https://www.instagram.com/cdn_lgn"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: colors.primary }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://github.com/cdn-lgn"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: colors.primary }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: colors.primary }}
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}
