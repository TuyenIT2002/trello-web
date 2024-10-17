import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import {mapOrder} from '~/untils/sorts';
import {DndContext ,MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

/* eslint-disable react/prop-types*/
function BoardContent({board}) {

    // const pointerSensor = useSensor(PointerSensor,{activationConstraint: {distance: 10}})
    const mouseSensor = useSensor(MouseSensor,{activationConstraint: {distance: 10}})
    const touchSensor = useSensor(TouchSensor,{activationConstraint: {delay: 250, tolerance:5}})

    const sensors = useSensors(mouseSensor, touchSensor)
    const [orderedColumns, setOederedColumns] = useState([])

    useEffect(()=>{
        setOederedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    },[board])

    const handleDragEnd =(event)=>{
        console.log('handleDragEnd :', event);
        const {active, over} = event
        if (!over) return
        if(active.id !== over.id){
            const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
            const newIndex = orderedColumns.findIndex(c => c._id === over.id)
            const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
            setOederedColumns(dndOrderedColumns)
        }
    }

    return ( 
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
        </DndContext>
     );
}

export default BoardContent;