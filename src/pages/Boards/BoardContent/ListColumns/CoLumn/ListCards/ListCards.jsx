/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import CardItem from './Card/Card';
import {SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';


const COLUMN_HEADER_HEIGHT = '50PX'
const COLUMN_FOOTER_HEIGHT = '56PX'

function ListCards({cards}) {
    return (    
        <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy} >
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
                {cards?.map(card =>{
                    return <CardItem key={card._id} card={card}/>
                })}
            </Box>    
        </SortableContext>
     );
}

export default ListCards;