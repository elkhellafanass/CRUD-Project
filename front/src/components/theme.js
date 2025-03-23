import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Enables dark mode
    primary: {
      main: "#bb86fc", // Purple accent color
    },
    secondary: {
      main: "#03dac6", // Teal accent color
    },
    background: {
      default: "#121212", // Dark background color
      paper: "#1e1e1e", // Darker background for cards
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#b0b0b0", // Light gray text
    },
  },
});

export default darkTheme;
