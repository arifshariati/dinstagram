import { useState, useRef } from 'react';
import { Grid, Button, Paper, TextField, Typography } from '@mui/material'
import React from 'react'

const defaultValues = {
    description: ''
};

const UploadForm = () => {

    const [values, setValues] = useState(defaultValues);

    const uploadInputRef = useRef(null);

    const onChange = () => {
        alert('I am called');
    };

    const handleUploadImage = () =>{
        console.log('I am here');
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
                        variant={'contained'}
                        color={'secondary'}
                        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                    >
                        Select Image
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth name={'description'} value={values.description} multiline rows={'4'} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant={'contained'}
                        onClick={() => handleUploadImage}
                    >
                        Upload Image
                    </Button>
                </Grid>
            </Grid>



        </Paper>
    )
}

export default UploadForm;
