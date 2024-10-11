// 1 số cái dùng chung cho nhiều trang nên để trong đây 
import { Box, Typography } from "@mui/material";
import SelectMode from "../ModeSelect";
import AppsIcon from '@mui/icons-material/Apps';
import { ReactComponent as trelloLogo } from '~/assets/trello.svg';
import SvgIcon from '@mui/material/SvgIcon';
import Workspaces from '~/components/AppBar/Menus/Workspaces';
import Recent from '~/components/AppBar/Menus/Recent';
import Starred from '~/components/AppBar/Menus/Starred';
import Templaces from '~/components/AppBar/Menus/Templaces';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profiles from '~/components/AppBar/Menus/Profiles';


function AppBar() {
    return ( 
        <>
            <Box sx={{
                backgroundColor:'primary.contrastText',
                width:'100%',
                height:(theme)=>theme.trello.appBarHeight,
                display:'flex',
                alignItems:'center',
                justifyContent:'space-between',
                px:2,
                gap:2,
                overflowX:'auto',
                }}>
                    <Box sx={{display:'flex',alignItems:'center',gap:2}}>
                        <AppsIcon sx={{color:'primary.main'}} />
                        <Box sx={{ display:'flex', alignItems:'center', gap:0.5}} >
                            <SvgIcon component={trelloLogo} inheritViewBox sx={{color:'primary.main'}} />
                            <Typography variant="span" sx={{fontSize:'1.2rem',fontWeight:'bold',color:'primary.main'}}>Trello</Typography>
                        </Box>

                        <Box sx={{ display: { xs:'none', md:'flex' }, gap:1}}> 
                            <Workspaces />
                            <Recent />
                            <Starred />
                            <Templaces />
                            <Button variant="outlined" sx={{color:'primary.main'}}>CREATE</Button>
                        </Box>

                    </Box>

                    <Box sx={{display:'flex', alignItems:'center'}} >
                        <TextField id="outlined-basic" label="Search..." variant="outlined" size="small" sx={{minWidth:120}} />
                        <SelectMode />
                        <Tooltip title="Notifications">
                            <Badge color="secondary" variant="dot" sx={{cursor:'pointer', margin:'8px'}}>
                                <NotificationsNoneOutlinedIcon sx={{color:'primary.main'}} />
                            </Badge>  
                        </Tooltip>
                        <Tooltip title="Help">                            
                            <HelpOutlineIcon sx={{cursor:'pointer', marginLeft:'8px', color:'primary.main'}} />
                        </Tooltip>
                        <Profiles />
                    </Box>
            </Box>
        </>
     );
}

export default AppBar;