import {
    Experimental_CssVarsProvider as CssVarsProvider ,
    experimental_extendTheme as extendTheme,
    useColorScheme
}from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';

function SelectMode() {
  const {mode,setMode} = useColorScheme();

  const handleChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="lable-select-dark-light-mode" sx={{color:'white'}}>Mode</InputLabel>
      <Select
        labelId="lable-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color:'white',
          '& fieldset':{borderColor:'white'},
          '&:hover .MuiOutlinedInput-notchedOutline ':{borderColor:'white'},
          '&.Mui-focused fieldset':{borderColor:'white'},      
          '.MuiSvgIcon-root':{color:'white'}
        }}
      >
        <MenuItem value="">
         
        </MenuItem>

        <MenuItem value="light">
        <div style={{display:'flex', alignItems:'center'}}>
          <LightModeIcon fontSize='small'/>
          Light
        </div>
        </MenuItem>
        <MenuItem value="dark">
        <div style={{display:'flex', alignItems:'center'}}>
          <DarkModeOutlinedIcon fontSize='small'/>
          Dark
        </div>
        </MenuItem>
        <MenuItem value="system">
        <div style={{display:'flex', alignItems:'center'}}>
          <SettingsBrightnessOutlinedIcon fontSize='small'/>
          System
        </div>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

// function ModeToggle(){
//   const {mode,setMode} = useColorScheme();
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
//   const prefersLightsMode = useMediaQuery('(prefers-color-scheme: light)');
//   return(
//     <Button onClick={()=>{
//       setMode(mode === 'light'?'dark':'light')
//     }}>
//       {mode==='light'?'Turn dark':'Turn light'}
//     </Button>
//   )
// }

export default SelectMode;