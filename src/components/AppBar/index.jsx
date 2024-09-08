// 1 số cái dùng chung cho nhiều trang nên để trong đây 

import { Box } from "@mui/material";
function AppBar() {
    return ( 
        <>
            <Box sx={{
                backgroundColor:'primary.light',
                width:'100%',
                height:(theme)=>theme.trello.appBarHeight,
                display:'flex',
                alignItems:'center'
                }}>
                Header
            </Box>
        </>
     );
}

export default AppBar;