import './App.css'
import Container  from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import {useColorScheme} from '@mui/material/styles';



function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{height:'100vh',backgroundColor:'primary.main'}}>
    <Box sx={{
      backgroundColor:'primary.light',
      width:'100%',
      height:(theme)=>theme.trello.appBarHeight,
      display:'flex',
      alignItems:'center'
    }}>
      Header
    </Box>
    <Box sx={{
      backgroundColor:'primary.dark',
      width:'100%',
      height:(theme)=>theme.trello.boardBarHeight,
      display:'flex',
      alignItems:'center'
    }}>
      Board Bar
    </Box>
    <Box sx={{
      backgroundColor:'primary.main',
      width:'100%',
      height:(theme)=>`calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      display:'flex',
      alignItems:'center'
    }}>
      Board Content
    </Box>
    </Container>
  )
}

export default App
