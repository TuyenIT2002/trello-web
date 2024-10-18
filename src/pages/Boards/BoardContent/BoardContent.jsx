/* eslint-disable react/prop-types*/
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import CoLumn from './ListColumns/CoLumn/CoLumn';
import CardItem from './ListColumns/CoLumn/ListCards/Card/Card';
import {mapOrder} from '~/untils/sorts';
import {DndContext ,MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';


const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN : 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD : 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}
function BoardContent({board}) {

    // const pointerSensor = useSensor(PointerSensor,{activationConstraint: {distance: 10}})
    const mouseSensor = useSensor(MouseSensor,{activationConstraint: {distance: 10}})
    const touchSensor = useSensor(TouchSensor,{activationConstraint: {delay: 250, tolerance:5}})
    const sensors = useSensors(mouseSensor, touchSensor)

    const [orderedColumns, setOederedColumns] = useState([])

    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)


    useEffect(()=>{
        setOederedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    },[board])

    const handleDragStart =(event)=>{
        console.log('handleDragStart :', event);
        setActiveDragItemId(event?.active?.id)
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
    }

// Hàm khi kết thúc sự kiện kéo
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

// Trong khi sảy ra sự kiện kéo card thì mới có dữ liệu còn khi không kéo nữa thì trả về là giá trị none hết 
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
    }

    const customDropAnimation = {
        sideEffects : defaultDropAnimationSideEffects({
            styles:{
                active:{
                    opacity:'0.5'
                }
            }
        })
    }

    return ( 
        <DndContext 
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd} 
        sensors={sensors}>
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
                <DragOverlay dropAnimation={customDropAnimation}>
                    {!activeDragItemType && null}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ) && <CoLumn column={activeDragItemData}/>}
                    {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD ) && <CardItem card={activeDragItemData}/>}
                </DragOverlay>
            </Box>
        </DndContext>
     );
}

export default BoardContent;