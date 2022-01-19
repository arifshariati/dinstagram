import { useState, useEffect } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { init } from './web3/web3Client';
import { TopBar, UploadForm, ImageCard } from './organisms';

import theme from "./theme";
import { Container, Grid } from '@mui/material';

const initialValue = {
  account: '',
  dinstagram: null,
  imagesCount: 0,
  imagse: [],
  loading: false
};

function App() {

  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    setValues({
      ...values,
      loading: true
    });
    (async () => {
      let { selectedAccount, dinstagramContract, imagesCount } = await init();

      setValues({
        ...values,
        account: selectedAccount,
        dinstagram: dinstagramContract,
        imagesCount,
        images: [],
        loading: false
      });
      // setAccount(selectedAccount);
      // console.log(`dinstagramContract ==> ${dinstagramContract.address}`);
    })()
  }, []);

  console.log(`imagesCount => ${values.imagesCount}`);

  return (
    <ThemeProvider theme={theme}>
      <TopBar account={values.account} />
      <Container maxWidth="sm">
        <Grid container spacing={2} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Grid item xs={12}>
            <UploadForm />
          </Grid>
          <Grid item xs={12}>
            <ImageCard />
          </Grid>

          <Grid item xs={12}>
            <ImageCard />
          </Grid>
        </Grid>
      </Container>

    </ThemeProvider>
  );
}

export default App;
