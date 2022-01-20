import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const TopBar = ({ account }) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h3"
                            noWrap
                            sx={{ flexGrow: 1 }}
                            color='white'
                        >
                            Dinstagram
                        </Typography>

                        <Typography
                            variant="h5"
                            noWrap
                            sx={{ mr: 2, display: { xs: 'flex' } }}
                            color='white'
                        >
                            Connected Wallet {account}
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};


export default TopBar;