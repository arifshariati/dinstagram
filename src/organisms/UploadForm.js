import { useState } from 'react';
import { create } from 'ipfs-http-client';
import { useRef } from 'react';
import { Grid, Button, Paper, TextField } from '@mui/material'

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const UploadForm = ({ values, setValues }) => {

    const [buttonEnabled, setButtonEnabled] = useState(false);
    const uploadInputRef = useRef(null);

    const handleDescription = (e) => {
        setValues({ ...values, description: e.target.value });

        if (values.description.length > 0) {
            setButtonEnabled(true);
        }
    }

    const onChange = async (e) => {
        e.preventDefault();

        const reader = new window.FileReader()
        reader.readAsArrayBuffer(e.target.files[0])

        reader.onloadend = () => {

            setValues({ ...values, buffer: Buffer(reader.result) })

        }
    }

    const handleUploadImage = async () => {

        //adding file to the IPFS
        const result = await ipfs.add(values.buffer);

        setValues({ ...values, loading: true });

        values.dinstagram.methods.uploadImage(result.path, values.description).send({ from: values.account }).on('transactionHash', (hash) => {
            setValues({ ...values, loading: false });
        })

        setButtonEnabled(false);
    }

    return (
        <Paper elevation={1} style={{ padding: '0.5rem 1rem' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <input
                        ref={uploadInputRef}
                        type="file"
                        accept='image/*'
                        style={{ display: 'none' }}
                        onChange={onChange}
                    />
                    <Button
                        color={'secondary'}
                        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                    >
                        Select Image
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name={'description'} value={values.description} onChange={handleDescription} multiline rows={'4'} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant={'contained'}
                        color={'secondary'}
                        disabled={!buttonEnabled}
                        onClick={handleUploadImage}
                    >
                        Upload Image
                    </Button>
                </Grid>
            </Grid>



        </Paper>
    )
}

export default UploadForm;
