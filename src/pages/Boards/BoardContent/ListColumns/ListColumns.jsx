import Box from '@mui/material/Box';
import CoLumn from './CoLumn/CoLumn';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';

function ListColumns({columns}) {
   
    return ( 
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
            {columns?.map((column)=>{
                return <CoLumn key={column._id}  column = {column}/>              
            })}
            <Box sx={{
                minWidth:'200px',
                maxWidth:'200px',
                mx:2,
                borderRadius:'6px',
                height: 'fit-content',
                bgcolor:'#ffffff3d'
            }}
            >
                <Button
                    startIcon={<AddBoxIcon/>}
                    sx={{
                        color: 'white',
                        width: '100%',
                        py:1
                    }}    
                >
                    Add new column
                 </Button>
            </Box>

        </Box>
       
     );
}

export default ListColumns ;