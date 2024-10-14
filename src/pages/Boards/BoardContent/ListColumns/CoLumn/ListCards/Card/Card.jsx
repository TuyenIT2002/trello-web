import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';

function CardItem() {
    return ( 
     
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
      
     );
}

export default CardItem;