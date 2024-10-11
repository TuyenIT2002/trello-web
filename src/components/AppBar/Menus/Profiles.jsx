import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

function Profiles() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return ( 
        <Box>
            <Tooltip title="Account settings">
                <Button
                id="basic-button-profiles"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar
                sx={{ width: 34, height: 34 }}
                src='https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-1/461316279_1596920320889888_4049595536396231400_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=QwfeMb3CHhAQ7kNvgGBEI1V&_nc_ht=scontent.fhan14-2.fna&_nc_gid=ASUsIvvZelLrfIkQd_82aVZ&oh=00_AYBWMwQPAT59FgZMRQ9LddmhpSkXQYIU7L4lH-Kh3cWW6Q&oe=66FE1DA9'
                alt='anh'
                />
                </Button>
            </Tooltip>
        <Menu
            id="basic-menu-profiles"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button-profiles',
            }}
        >
        <MenuItem onClick={handleClose}>
            <Avatar sx={{width:28, height:28, mr:2}} /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <Avatar sx={{width:28, height:28, mr:2}} /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <Settings fontSize="small" />
            </ListItemIcon>
            Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
        </Box>
     );
}

export default Profiles;
