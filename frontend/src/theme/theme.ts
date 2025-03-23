import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Light mode
    primary: {
      main: "#009688", // Teal as the primary color
      contrastText: "#ffffff", // White text on teal
    },
    secondary: {
      main: "#80cbc4", // Lighter teal for secondary elements
      contrastText: "#000000", // Black text on lighter teal
    },
    background: {
      default: "#f5f5f5", // Light gray for the main background
      paper: "#ffffff", // White for cards and paper elements
    },
    text: {
      primary: "#000000", // Black text for primary text
      secondary: "#4f4f4f", // Dark gray for secondary text
      disabled: "#9e9e9e", // Light gray for disabled text
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Default Material-UI font
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#000000", // Black for headings
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#000000", // Black for subheadings
    },
    body1: {
      fontSize: "1rem",
      color: "#000000", // Black for body text
    },
    body2: {
      fontSize: "0.875rem",
      color: "#4f4f4f", // Dark gray for secondary body text
    },
    button: {
      textTransform: "none", // Disable uppercase text for buttons
      color: "#ffffff", // White text for buttons
    },
  },
});

export default theme;