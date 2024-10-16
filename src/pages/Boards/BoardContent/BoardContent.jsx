import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns'
import {mapOrder} from '~/untils/sorts'

function BoardContent({board}) {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
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
                {/* Nếu không có hàm sắp xếp thì sẽ là <ListColumns columns= {board?.columns}/ */}
                <ListColumns columns= {orderedColumns}/> 
            </Box>
        </>
     );
}

export default BoardContent;