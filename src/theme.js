import { experimental_extendTheme as extendTheme} from '@mui/material/styles';

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`


// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight:APP_BAR_HEIGHT,
    boardBarHeight:BOARD_BAR_HEIGHT,
    boardContentHeight:BOARD_CONTENT_HEIGHT,
  },

  colorSchemes: {
    // light: {
    //   palette: {
    //     primary:teal,
    //     secondary:deepOrange,
    //   },
    // },

    // dark: {
    //   palette: {
    //     primary:cyan,
    //     secondary: deepOrange,
    //   },
    // },
  },
  // components
  components: {
    // Css cho Scroll ở phần header đẹp hơn
    MuiCssBaseline:{
      styleOverrides: {
        body:{
         '*::-webkit-scrollbar' : { 
            width:'8px',
            height:'8px', 
          },

          '*::-webkit-scrollbar-thumb' : {
            backgroundColor:'#dcdde1',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover' : {
            backgroundColor: 'white ',
          },
        }
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          // Để những chữ của nút trên thanh Header không viết hoa nữa
         textTransform: 'none', 
         borderWidth:'.5px !important',
         '&:hover':{borderWidth: '1.8px !important'}
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root:({theme})=>({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
        }),
    },
  },


   // thiết lập cho những nút có viền kiểu outline cho có màu đồng bộ
   MuiOutlinedInput: {
    styleOverrides: {
     root:({theme})=>({
      //  color: theme.palette.primary.main,
      //  fontSize: '0.875rem',
      //  '.MuiOutlinedInput-notchedOutline':{
      //    borderColor: theme.palette.primary.light
      //  },
      //   '&:hover': {
      //   '.MuiOutlinedInput-notchedOutline':{
      //    borderColor: theme.palette.primary.main
      //  },
      //  },
       // loại bỏ viền bôi đậm mỗi khi click vào outline input
       '& fieldset':{
         borderWidth:'.5px !important'
       },
       '&:hover fieldset':{
        borderWidth:'1.8px !important'
       },
       '&.Mui-focused fieldset':{
        borderWidth:'1.8px !important'
       },
     }),
   },
 }
},
 // ...other properties
});
export default theme;