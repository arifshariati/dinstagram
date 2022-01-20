import { useState, useEffect } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { initWeb3, loadBlockChainData } from './web3/web3Client';
import { TopBar, UploadForm, ImageCard } from './organisms';

import theme from "./theme";
import { Container, Grid } from '@mui/material';

const initialValue = {
  account: '',
  dinstagram: null,
  imagesCount: 0,
  images: [],
  buffer: null,
  description: '',
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
      await initWeb3();
      const {
        account,
        dinstagram,
        imageCount,
        images,
        errors } = await loadBlockChainData();

      if (errors.length > 0) {
        window.alert(errors);
      } else {
        setValues({
          ...values,
          account,
          dinstagram,
          imageCount,
          images,
          loading: false
        })
      }
    })()
  }, []);

  // console.log(values.images);

  return (
    <ThemeProvider theme={theme}>
      <TopBar account={values.account} />
      <Container maxWidth="lg">
        <Grid container spacing={2} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Grid item xs={12}>
            <UploadForm values={values} setValues={setValues} />
          </Grid>
          {
            values.images.map((image, index) =>
              <Grid item xs={6} sm={6} md={6} lg={3} key={index}>
                <ImageCard account={values.account} image={image} dinstagram={values.dinstagram} />
              </Grid>
            )
          }

        </Grid>
      </Container>

    </ThemeProvider>
  );
}

export default App;
