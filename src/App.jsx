import './App.css'
import { Button } from '@mui/material';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

import {useColorScheme} from '@mui/material/styles';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}


function App() {
  return (
    <>
    <ModeToggle/>
    <div>tuyen dev</div>
    <Typography variant="body2" color="text.secondary">Heading</Typography>
     <Button variant="contained">Hello world</Button>
     <AccessAlarm/>
     <ThreeDRotation/>
    </>
  )
}

export default App
