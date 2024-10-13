// 1 số cái dùng chung cho nhiều trang nên để trong đây 
import {useState} from 'react'
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
import QueueIcon from '@mui/icons-material/Queue';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function AppBar() {
    const [valueSearch, setValueSearch] = useState('');
    return ( 
        <>
            <Box sx={{
                bgcolor:(theme)=>theme.palette.mode == 'dark' ? '#2c3e50' : '#0984e3',
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
                        <AppsIcon sx={{color:'white'}} />
                        <Box sx={{ display:'flex', alignItems:'center', gap:0.5}} >
                            <SvgIcon component={trelloLogo} inheritViewBox sx={{color:'white'}} />
                            <Typography variant="span" sx={{fontSize:'1.2rem',fontWeight:'bold',color:'white'}}>Trello</Typography>
                        </Box>

                        <Box sx={{ display: { xs:'none', md:'flex' }, gap:1}}> 
                            <Workspaces />
                            <Recent />
                            <Starred />
                            <Templaces />
                            <Button 
                            variant="outlined" 
                            sx={{color:'white'}}
                            startIcon={<QueueIcon/>}
                            >
                                CREATE
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{display:'flex', alignItems:'center'}} >
                        <TextField 
                        id="outlined-basic"     
                        label="Search" 
                        variant="outlined" 
                        size="small" 
                        value={valueSearch}
                        onChange={(e)=>setValueSearch(e.target.value)}
                        InputProps={{
                            startAdornment:(
                                <InputAdornment position="start">
                                <SearchIcon sx={{color:'white'}} />
                            </InputAdornment>
                            ),
                            endAdornment:(
                                <CloseIcon 
                                sx={{fontSize:16, cursor:'pointer', color : valueSearch ? 'white' : 'transparent' }}
                                onClick ={()=>setValueSearch('')}
                                />
                            )
                        }}
                        sx={{
                            // Chỉnh màu viền, chữ của ô search thành màu trắng
                            minWidth:120,
                            maxWidth:180,
                            '& label': {color:'white'},
                            '& input': {color:'white'},
                            '& label.Mui-focused':{color:'white'},
                            '& .MuiOutlinedInput-root':{
                                '& fieldset':{borderColor:'white'},
                                '&:hover fieldset':{borderColor:'white'},
                                '&.Mui-focused fieldset':{borderColor:'white'},      
                            }
                        }} 
                        />
                        
                        <SelectMode />
                        <Tooltip title="Notifications">
                            <Badge color="warning" variant="dot" sx={{cursor:'pointer', margin:'8px'}}>
                                <NotificationsNoneOutlinedIcon sx={{color:'white'}} />
                            </Badge>  
                        </Tooltip>
                        <Tooltip title="Help">                            
                            <HelpOutlineIcon sx={{cursor:'pointer', marginLeft:'8px', color:'white'}} />
                        </Tooltip>
                        <Profiles />
                    </Box>
            </Box>
        </>
     );
}

export default AppBar;