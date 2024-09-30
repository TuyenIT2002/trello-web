import { cyan, deepOrange, teal } from '@mui/material/colors';
import { experimental_extendTheme as extendTheme} from '@mui/material/styles';

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight:'48px',
    boardBarHeight:'58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary:teal,
        secondary:deepOrange,
      },
    },
    dark: {
      palette: {
        primary:cyan,
        secondary: deepOrange,
      },
    },
  },
  // components
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Để những chữ của nút trên thanh Header không viết hoa nữa
         textTransform: 'none', 
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root:({theme})=>({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
        }),
    },
  },
   // thiết lập cho những nút có viền kiểu outline cho có màu đồng bộ
   MuiOutlinedInput: {
    styleOverrides: {
     root:({theme})=>({
       color: theme.palette.primary.main,
       fontSize: '0.875rem',
       '.MuiOutlinedInput-notchedOutline':{
         borderColor: theme.palette.primary.light
       },
        '&:hover': {
        '.MuiOutlinedInput-notchedOutline':{
         borderColor: theme.palette.primary.main
       },
       },
       // loại bỏ viền bôi đậm mỗi khi click vào outline input
       '& fieldset':{
         borderWidth:'1px !important'
       },
     }),
   },
 }
},
 // ...other properties
});
export default theme;