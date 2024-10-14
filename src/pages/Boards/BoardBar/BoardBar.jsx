import { Box } from "@mui/material";
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const MENU_STYLES = {
  color:'white',
  bgcolor:'transparent',
  border: 'none',
  px: '5px',
  borderRadius:'4px',

  '& .MuiSvgIcon-root':{
    color:'white',
  },

  '&:hover':{
    bgcolor:'primary.50',
  },
}

function BoardBar() {
    return ( 
       <>
          <Box sx={{
            backgroundColor: (theme)=>theme.palette.mode == 'dark' ? '#34495e' : '#00a8ff',
            width:'100%',
            height:(theme)=>theme.trello.boardBarHeight,
            borderBottom:'1px solid #fff',
            display:'flex',
            alignItems:'center',
            justifyContent:'space-between',
            px:.8,
            gap:2,
            overflowX:'auto',
            }}>
              <Box sx={{
                display:'flex',
                alignItems:'center',
                gap:2,
                }}>
                <Chip
                 sx={MENU_STYLES}
                 icon={<DashboardIcon />}
                 label="TuyenDev MERN Stack Board" 
                 clickable
                />
                <Chip
                 sx={MENU_STYLES}
                 icon={<VpnLockIcon />} 
                 label="Public/Private Workspace" 
                 clickable
                />
                <Chip
                 sx={MENU_STYLES}
                 icon={<AddToDriveIcon />} 
                 label="Add To Google Drive" 
                 clickable
                />
                <Chip
                 sx={MENU_STYLES}
                 icon={<BoltIcon />} 
                 label="Automation" 
                 clickable
                />
                <Chip
                 sx={MENU_STYLES}
                 icon={<FilterListIcon />} 
                 label="Filters" 
                 clickable
                />  
              </Box>
              <Box sx={{display:'flex',alignItems:'center',gap:2}}>
                
                <Button 
                 variant="outlined" 
                 startIcon={<PersonAddIcon sx={{color:'white'}}/>}
                 sx={{
                  color:'white',
                  borderColor:'white',
                  '&:hover':{borderColor:'white'}
                }}
                >
                  INVITE
                </Button>

                <AvatarGroup
                  max={5}
                  sx={{
                    gap :'10px',
                    '& .MuiAvatar-root':{
                      width:34,
                      height:34,
                      fontSize:16,
                      border : 'none',
                    }
                  }}
                 >
                  <Tooltip title='Tuyendev'>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Tooltip>
                  <Tooltip title='Tuyendev'>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Tooltip>
                  <Tooltip title='Tuyendev'>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Tooltip>
                  <Tooltip title='Tuyendev'>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Tooltip>
                  <Tooltip title='Tuyendev'>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Tooltip>
                  <Tooltip title='Tuyendev'>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Tooltip>
                  <Tooltip title='Tuyendev'>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Tooltip>
                </AvatarGroup>
                
              </Box>
        </Box>
       </>
     );
}

export default BoardBar;