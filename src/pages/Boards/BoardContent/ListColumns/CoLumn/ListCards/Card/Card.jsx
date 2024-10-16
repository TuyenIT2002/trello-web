import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';

function CardItem({card}) {
    // Hàm này mục đích để trả về true hoặc false
    const shouldShowCardAction = ()=>{
        return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }

    return ( 
        <Card sx={{
            cursor:'pointer',
            boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
            // thuộc tính này loại bỏ thuộc tính mặc định hidden giúp cho các card được hiển thị đầy đủ kích cỡ của nó
            overflow :'unset'
        }}>
            {/* Nếu tồn tại thuộc tính cover thì mới hiển thị thẻ CardMedia */}
            {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} title=''/>}

            <CardContent sx={{p:1.5, '&:last-child':{p:1.5}}}>
                <Typography>{card?.title}</Typography>
            </CardContent>

            {/* Điều kiện này để fix lỗi thừa khoảng trắng khi thẻ CardActions trống, nếu shouldShowCardAction true thì mới hiển thị CardActions */}
            {shouldShowCardAction() &&
                <CardActions sx={{padding:'0 4px 8px 4px'}}>    
                {/* Toán tử !! trả về true(>=1) hoặc false thay vì trả về độ dài của mảng */}
                    {!!card?.memberIds?.length && <Button size="small" startIcon={<GroupIcon/>}>{card?.memberIds?.length}</Button>}
                    {!!card?.comments?.length &&  <Button size="small" startIcon={<CommentIcon/>}>{card?.comments?.length}</Button>}
                    {!!card?.attachments?.length && <Button size="small" startIcon={<AttachmentIcon/>}>{card?.attachments?.length}</Button>}
                </CardActions>
            }
        </Card>
      
     );
}

export default CardItem;