import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Light mode
    primary: {
      main: "#8B0000", // Deep crimson maroon for primary elements
      contrastText: "#ffffff", // White text for better contrast
    },
    secondary: {
      main: "#D8A7A0", // Muted desert pink for secondary elements
      contrastText: "#ffffff", // White text for better contrast
    },
    background: {
      default: "#FBFAF7", // Warm light beige for the main background
      paper: "#FFFFFF", // Clean white for cards and paper elements
    },
    text: {
      primary: "#3E2723", // Dark brown for primary text
      secondary: "#6D4C41", // Muted brown for secondary text
      disabled: "#A1887F", // Light brown for disabled text
    },
    error: {
      main: "#B56576", // Soft maroon-pink for error states
    },
    warning: {
      main: "#E56B6F", // Vibrant desert pink for warnings
    },
    info: {
      main: "#8AA399", // Muted sage green for informational elements
    },
    success: {
      main: "#A3B18A", // Soft olive green for success states
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', // Modern and clean font
    h1: {
      fontSize: "2.25rem",
      fontWeight: 700,
      color: "#3E2723", // Dark brown for headings
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#3E2723", // Dark brown for subheadings
    },
    body1: {
      fontSize: "1rem",
      color: "#3E2723", // Dark brown for body text
    },
    body2: {
      fontSize: "0.875rem",
      color: "#6D4C41", // Muted brown for secondary body text
    },
    button: {
      textTransform: "none", // Disable uppercase text for buttons
      fontWeight: 600,
      color: "#ffffff", // White text for buttons
    },
  },
});

export default theme;