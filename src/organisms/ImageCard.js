import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ImageCard = ({ account, image, dinstagram }) => {
    let tipAmount = window.web3.utils.toWei('0.1', 'Ether');

    const handleTip = async () => {
        await dinstagram.methods.tipImageOwner(image.author).send({ from: account, value: tipAmount }).on('transactionHash', (hash) => {
            console.log('Tipped');
        });
    };

    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardMedia
                component="img"
                height="300px"
                image={`https://ipfs.infura.io/ipfs/${image.hash}`}
                alt="hashed Image"
            />
            <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                    {image.description}
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'space-between' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Tipped {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                </Typography>
                <Button
                    size="small"
                    variant={'contained'}
                    disabled={account === image.author ? true : false}
                    onClick={handleTip}
                >
                    TIP 0.1 ETH
                </Button>
            </CardActions>
        </Card>
    );
}

export default ImageCard;