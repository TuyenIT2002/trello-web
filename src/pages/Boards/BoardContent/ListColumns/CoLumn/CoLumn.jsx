import Box from '@mui/material/Box';
import ListCards from './ListCards/ListCards';
import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const COLUMN_HEADER_HEIGHT = '50PX'
const COLUMN_FOOTER_HEIGHT = '56PX'

/* eslint-disable react/prop-types */
function CoLumn({column}) {
    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: column._id, data:{...column}});
      const dndKitColumnStyles = {
        // Thay Transfrom bằng Translate để kéo các cột không bị biến dạng
        transform: CSS.Translate.toString(transform),
        transition,
        height:'100%',
        opacity: isDragging ? 0.5 : undefined
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};

    return ( 
        <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
            <Box
                {...listeners}
                sx={{
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
                    {column?.title}
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
                    <ListCards cards = {column.cards}/>
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
                        <DragHandleIcon sx={{cursor:'pointer'}}/>
                    </Tooltip>
                </Box>    
            </Box> 
        </div>
     );
}

export default CoLumn;