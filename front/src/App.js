import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import darkTheme from "./components/theme";
import ContactsList from "./components/ContactsList";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {}
      <ContactsList />
    </ThemeProvider>
  );
}

export default App;
