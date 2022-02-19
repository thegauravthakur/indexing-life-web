import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { auth } from '../firebase';

export const NavigationBar = () => {
    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ mr: 2, display: 'flex', flex: 1 }}
                    >
                        Indexing Life
                    </Typography>
                    <Tooltip title='Open settings'>
                        <IconButton sx={{ p: 0 }}>
                            <Avatar
                                alt='Remy Sharp'
                                src={auth.currentUser?.photoURL ?? ''}
                            />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
