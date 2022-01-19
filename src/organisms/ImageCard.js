import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ImageCard = () => {
    return (
        <Card sx={{ maxWidth: 445 }}>
            <CardMedia
                component="img"
                height="500px"
                image="/pic.jpg"
                alt="hashed Image"
            />
            <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                    0x7dbf3e9Bc1688A186A0B50a2EDEE2504e213AF17
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent:'space-between'}}>
                <Typography gutterBottom variant="h5" component="div">
                    Tipped 9.4 ETH
                </Typography>
                <Button size="small" variant={'contained'}>TIP 0.1 ETH</Button>
            </CardActions>
        </Card>
    );
}

export default ImageCard;