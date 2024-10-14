import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
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
{/* COLUMN 1 */}
                <ListColumns/> 
            </Box>
        </>
     );
}

export default BoardContent;