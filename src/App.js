import { useState, useEffect } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { init } from './web3/web3Client';
import { TopBar } from './organisms';

import theme from "./theme";


function App() {

  const [account, setAccount] = useState('');

  useEffect(() => {

    (async () => {
      setAccount(await init());
    })()
  }, [account]);

  // console.log(`account => ${account}`);

  return (
    <ThemeProvider theme={theme}>
      <TopBar account={account} />
      <h1>Welcome to Decentralized Instagram</h1>
    </ThemeProvider>
  );
}

export default App;
