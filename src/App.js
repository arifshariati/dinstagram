import { ThemeProvider } from "@mui/material/styles";

import { TopBar } from './organisms';

import theme from "./theme"; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TopBar />
      <h1>Welcome to Decentralized Instagram</h1>
    </ThemeProvider>
  );
}

export default App;
