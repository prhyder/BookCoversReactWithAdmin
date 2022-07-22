import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
  
// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#efeeee',
        },
        secondary: {
            main: '#343333',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        // Name of the component
        MuiButtonBase: {
          defaultProps: {
            // The props to change the default for.
            disableRipple: true, // No more ripple, on the whole application 
          },
        },
      },
});
  
export default theme;