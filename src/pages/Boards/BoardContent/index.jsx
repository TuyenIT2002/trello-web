import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCardIcon from '@mui/icons-material/AddCard';
import ArchiveIcon from '@mui/icons-material/Archive';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';

const COLUMN_HEADER_HEIGHT = '50PX'
const COLUMN_FOOTER_HEIGHT = '56PX'

function BoardContent() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    return ( 
        <>
           <Box sx={{
            backgroundColor: (theme)=>theme.palette.mode == 'dark' ? '#34495e' : '#0984e3',
            width:'100%',
            height:(theme)=> theme.trello.boardContentHeight,
            display:'flex',
            p: '10px 0',
            }}
            >
                <Box sx={{
                    bgcolor:'inherit',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    // cho thanh scroll hiển thị theo chiều ngang và không hiển thị theo chiều dọc
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    // Thuộc tính này cho thanh scroll nằm ngang dưới màn hình cách lề margin=2
                    '&::-webkit-scrollbar-track' : {m:2},
                }}>
{/* COLUMN 1 */}
                  <Box sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor:(theme)=>theme.palette.mode == 'dark' ? '#333643' : '#ebecf0',
                    ml:2,
                    borderRadius:'6px',
                    height: 'fit-content',
                    maxHeight: (theme)=> `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
                }}
                >
    {/* HEADER */}
                    <Box sx={{
                        height:COLUMN_HEADER_HEIGHT,
                        p:2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    >
                        <Typography sx={{
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                        >
                            Column Title
                        </Typography>
                        <Box>
                            <Tooltip title="More option">
                                <ExpandMoreIcon
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick} 
                                    sx={{cursor:'pointer'}}
                                />
                            </Tooltip>
                            <Menu
                                id="basic-menu-column-dropdow"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-menu-column-dropdow',
                                }}
                            >
                            <MenuItem>
                                <ListItemIcon>
                                    <AddCardIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add new card</ListItemText>                            
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>                            
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCopyIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>                            
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentPasteIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>                            
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteForeverIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ArchiveIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
    {/* LIST CARD */}
                    <Box sx={{
                        display:'flex',
                        // chuyển mặc định từ row => column
                        flexDirection:'column',
                        gap:1,
                        // p,m sẽ làm cho thanh scroll ở chính giữa khe
                        p:'0 5px',
                        m:'0 5px',
                        overflowX:'hidden',
                        overflowY:'auto',
                        maxHeight: (theme)=>`calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_FOOTER_HEIGHT} -  ${COLUMN_HEADER_HEIGHT})`,
                        '&::-webkit-scrollbar-thumb' : {backgroundColor:'#ced0da',},
                        '&::-webkit-scrollbar-thumb:hover' : { backgroundColor: '#bfc2cf',},
                    }}
                    >
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            // thuộc tính này loại bỏ thuộc tính mặc định hidden giúp cho các card được hiển thị đầy đủ kích cỡ của nó
                            overflow :'unset'
                        }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://trungquandev.com/wp-content/uploads/2022/11/lo-trinh-hoc-lap-trinh-web-cho-nguoi-moi-bat-dau-tu-con-so-0-trungquandev.png"
                                title="green iguana"
                            />
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>TuyenDev MERN Stack</Typography>
                            </CardContent>
                            <CardActions sx={{padding:'0 4px 8px 4px'}}>
                                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                                <Button size="small" startIcon={<AttachmentIcon/>}>15</Button>
                            </CardActions>
                        </Card>
                        
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        
                    </Box>    
    {/* FOOTER */}
                    <Box sx={{
                        height:COLUMN_FOOTER_HEIGHT,
                        p:2,
                        display:'flex',
                        alignItems: 'center',
                        justifyContent:'space-between',
                    }}
                    >
                        <Button startIcon={<AddCardIcon/>}>Add new card</Button>
                        <Tooltip title="Drag to move">
                            <DragHandleIcon/>
                        </Tooltip>
                    </Box>    
                  </Box> 
{/* COLUMN 2 */}
                  <Box sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor:(theme)=>theme.palette.mode == 'dark' ? '#333643' : '#ebecf0',
                    ml:2,
                    borderRadius:'6px',
                    height: 'fit-content',
                    maxHeight: (theme)=> `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
                }}
                >
    {/* HEADER */}
                    <Box sx={{
                        height:COLUMN_HEADER_HEIGHT,
                        p:2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                    >
                        <Typography sx={{
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                        >
                            Column Title
                        </Typography>
                        <Box>
                            <Tooltip title="More option">
                                <ExpandMoreIcon
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick} 
                                    sx={{cursor:'pointer'}}
                                />
                            </Tooltip>
                            <Menu
                                id="basic-menu-column-dropdow"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-menu-column-dropdow',
                                }}
                            >
                            <MenuItem>
                                <ListItemIcon>
                                    <AddCardIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add new card</ListItemText>                            
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCut fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Cut</ListItemText>                            
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentCopyIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Copy</ListItemText>                            
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ContentPasteIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Paste</ListItemText>                            
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <DeleteForeverIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ArchiveIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
    {/* LIST CARD */}
                    <Box sx={{
                        display:'flex',
                        // chuyển mặc định từ row => column
                        flexDirection:'column',
                        gap:1,
                        // p,m sẽ làm cho thanh scroll ở chính giữa khe
                        p:'0 5px',
                        m:'0 5px',
                        overflowX:'hidden',
                        overflowY:'auto',
                        maxHeight: (theme)=>`calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_FOOTER_HEIGHT} -  ${COLUMN_HEADER_HEIGHT})`,
                        '&::-webkit-scrollbar-thumb' : {backgroundColor:'#ced0da',},
                        '&::-webkit-scrollbar-thumb:hover' : { backgroundColor: '#bfc2cf',},
                    }}
                    >
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            // thuộc tính này loại bỏ thuộc tính mặc định hidden giúp cho các card được hiển thị đầy đủ kích cỡ của nó
                            overflow :'unset'
                        }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://trungquandev.com/wp-content/uploads/2022/11/lo-trinh-hoc-lap-trinh-web-cho-nguoi-moi-bat-dau-tu-con-so-0-trungquandev.png"
                                title="green iguana"
                            />
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>TuyenDev MERN Stack</Typography>
                            </CardContent>
                            <CardActions sx={{padding:'0 4px 8px 4px'}}>
                                <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                                <Button size="small" startIcon={<AttachmentIcon/>}>15</Button>
                            </CardActions>
                        </Card>
                        
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{
                            cursor:'pointer',
                            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                            overflow :'unset'
                        }}>
                            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                                <Typography>card 1</Typography>
                            </CardContent>
                        </Card>
                        
                    </Box>    
    {/* FOOTER */}
                    <Box sx={{
                        height:COLUMN_FOOTER_HEIGHT,
                        p:2,
                        display:'flex',
                        alignItems: 'center',
                        justifyContent:'space-between',
                    }}
                    >
                        <Button startIcon={<AddCardIcon/>}>Add new card</Button>
                        <Tooltip title="Drag to move">
                            <DragHandleIcon/>
                        </Tooltip>
                    </Box>    
                  </Box> 
                </Box>
            </Box>
        </>
     );
}

export default BoardContent;