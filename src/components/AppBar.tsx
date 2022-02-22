import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { auth } from '../firebase';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useState } from 'react';
import { CustomDatePicker } from './CustomDatePicker';
import useMediaQuery from '@mui/material/useMediaQuery';

export const NavigationBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const matches = useMediaQuery('(min-width:1000px)');
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = async () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='static' sx={{ bgcolor: '#f8fafc', color: '#334155' }}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h5'
                        noWrap
                        component='div'
                        sx={{
                            mr: 2,
                            display: 'flex',
                            flex: 1,
                            fontWeight: 'bold',
                        }}
                    >
                        Indexing Life
                    </Typography>
                    {!matches && <CustomDatePicker />}
                    <Tooltip title='Open settings'>
                        <IconButton
                            onClick={handleClick}
                            sx={{ p: 0, ml: matches ? 0 : 2 }}
                        >
                            <Avatar
                                alt='Remy Sharp'
                                src={auth.currentUser?.photoURL ?? ''}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            onClick={async () => {
                                await auth.signOut();
                            }}
                        >
                            <ListItemIcon>
                                <Logout fontSize='small' />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
