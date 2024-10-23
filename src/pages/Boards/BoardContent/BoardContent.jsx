/* eslint-disable react/prop-types*/
import {useState, useEffect} from 'react';
import {cloneDeep} from 'lodash'
import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import CoLumn from './ListColumns/CoLumn/CoLumn';
import CardItem from './ListColumns/CoLumn/ListCards/Card/Card';
import {mapOrder} from '~/untils/sorts';
import {
    DndContext,
    MouseSensor, 
    TouchSensor, 
    useSensor, 
    useSensors, 
    DragOverlay, 
    defaultDropAnimationSideEffects,
    closestCorners,
} from '@dnd-kit/core';
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
    // state riêng để lưu lại dữ liệu ban đầu của card
    const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

    useEffect(()=>{
        setOederedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    },[board])

// Tìm một cái Column theo cardId
    const findColumnByCardId = (cardId)=>{
        // Đoạn này cần lưu ý, nên dùng c.cards thay vì dùng c.cardOrderIds bởi vì ở bước handleDragOver chúng ra sẽ làm cho dữ liệu
        // card hoàn chỉnh trước rồi mới tạo cardOrderIds mới
        return orderedColumns.find(column => column?.cards.map(card => card._id)?.includes(cardId))
    }

// Khi bắt đầu kéo một phần tử
    const handleDragStart =(event)=>{
        console.log('handleDragStart :', event);
        setActiveDragItemId(event?.active?.id)
        // Nếu tồn tại event?.active?.data?.current?.columnId thì có nghĩa là đang kéo card còn nếu không thì là kéo column
        setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
        setActiveDragItemData(event?.active?.data?.current)
        
        // Nếu kéo card thì mới thực hiện hành động set giá trị oldColumn
        if(event?.active?.data?.current?.columnId){
            setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
        }
    }

    // Trong qúa trình kéo một phần tử
    const handleDragOver =(event)=>{
        // Không làm gì thêm nếu đang kéo column
        if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN){ return }
        // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các cột
        const {active, over} = event
        // Cần đảm bảo rằng nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container ) thì không làm gì cả (tránh crash trang)
        if (!active || !over) return 
        // activeDraggingCard là cái card đang được kéo, (id : overCardId) có nghĩa là đổi id thành tên mới và thay vì active.data.curent thì dùng cách bên dưới
        const {id : activeDraggingCardId, data: {current: activeDraggingCardData}} = active
        // overCardId là cái cái card tương tác trên hoặc dưới so với card đang được kéo
        const {id : overCardId } = over

        // Tìm 2 cái column theo CardId, 2 biến này trả về thông tin thẻ đang kéo và thẻ đang được tương tác với nó
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)

        // Nếu không tồn tại 1 trong 2 thì không làm gì hết
        if(!activeColumn || !overColumn) return 

        // Nếu 2 _id khác nhau thì thực hiện lệnh (kéo card qua 2 column khác nhau, còn trong 1 column thì không làm gì)
        if(activeColumn._id !== overColumn._id){
            setOederedColumns(prevColumns => {
                // Tìm vị trí index của cái card mà mình sắp thả
                const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
                console.log(overCardIndex);
                
                let newCardIndex 
                const isBelowOverItem = active.rect.current.translated && 
                    active.rect.current.translated.top > over.rect.top + over.rect.height
                const modifier = isBelowOverItem ? 1: 0
                newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

                // clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi mới return - cập nhật lại OrderedColumnsState mới
                const nexColumns = cloneDeep(prevColumns)
                const nextActiveColumn = nexColumns.find(column => column._id === activeColumn._id)
                const nextOverColumn = nexColumns.find(column => column._id === overColumn._id)

                // nextActiveColumn (column cũ)
                if(nextActiveColumn){
                    // xóa card ở cái column active (có thể hiểu là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
                    nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId )
                    // cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu 
                    nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)

                }

                // nextOverColumn (column mới)
                if(nextOverColumn){
                    // kiểm tra xem card đang kéo nó tồn tại trong overColumn chưa, nếu có thì xóa nó trước
                    nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId )
                    // Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
                    nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
                    // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
                    nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
                }
                return nexColumns
            })
        }
    }

    // Hàm khi kết thúc sự kiện kéo
    const handleDragEnd =(event)=>{
        console.log('handleDragEnd :', event);
        const {active, over} = event
      
        if (!active || !over) return 

        // Hành động kéo thả card
        if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD){
            // activeDraggingCard là cái card đang được kéo, (id : overCardId) có nghĩa là đổi id thành tên mới và thay vì active.data.curent thì dùng cách bên dưới
            const {id : activeDraggingCardId, data: {current: activeDraggingCardData}} = active
            // overCardId là cái cái card tương tác trên hoặc dưới so với card đang được kéo
            const {id : overCardId } = over

            // Tìm 2 cái column theo CardId, 2 biến này trả về thông tin thẻ đang kéo và thẻ đang được tương tác với nó
            const activeColumn = findColumnByCardId(activeDraggingCardId)
            const overColumn = findColumnByCardId(overCardId)

            // Nếu không tồn tại 1 trong 2 thì không làm gì hết
            if(!activeColumn || !overColumn) return 

            // Hành động kéo thả trong trong cùng column và giữa 2 column 
            if(oldColumnWhenDraggingCard._id !== overColumn._id){
                // Hành động kéo thả card giữa 2 column
            }else{
                // Hành động kéo thả card trong cùng một cái column
                // Lấy vị trí cũ từ thằng oldColumnWhenDraggingCard
                const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
                // Lấy vị trí mới từ thằng overColumn
                const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

                // Dùng arrayMove vì kéo 1 card trong column tương tự logic kéo 1 column trong boardContent
                const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

                setOederedColumns(prevColumns => {  
                    // clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi mới return - cập nhật lại OrderedColumnsState mới
                    const nexColumns = cloneDeep(prevColumns)   

                    // Tìm tới column mà chúng ta đang thả
                    const targetColumn = nexColumns.find(column => column._id === overColumn._id)

                    // Cập nhật lại 2 giá trị mới là Card và cardOrderIds trong cái targetColumn
                    targetColumn.cards = dndOrderedCards
                    targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

                    return nexColumns
                })
            }
        }

        // Hành động kéo thả column trong boardContent
         if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id ){
                const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
                const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
                setOederedColumns(dndOrderedColumns) 
        }

        // Trong khi sảy ra sự kiện kéo card thì mới có dữ liệu còn khi không kéo nữa thì trả về là giá trị none hết 
        setActiveDragItemId(null)
        setActiveDragItemType(null)
        setActiveDragItemData(null)
        setOldColumnWhenDraggingCard(null)
    }

    // Cái bóng của thẻ đang được kéo
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
        // Cảm biến(video 30)
            sensors={sensors}
        // Thuật toán phát hiện va chạm, nếu không có nó thì những card to không thể kéo qua column được
            collissionDetection ={closestCorners}
            onDragStart={handleDragStart} 
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd} 
        >
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