import { createTheme } from "@material-ui/core";

export default createTheme({
    palette: {
        primary: {
          main: '#272727'
        },
        secondary: {
          main: '#ffe500'
        }
    },
    // paper: {
    shape: {
        borderRadius: 15
    },
    // },
    typography: {
        fontFamily: 'Roboto',
        fontSize: 16,
        // h1: { // incase h1 needs to have a separate fontFamily 
        //     fontFamily: 'Roboto',
        //     fontSize: 16,
        // }
        button: {
            margin : "1%",
            
        }
     },
     paper: {
        rounded: "5%",
        borderRadius: 100,
     },
     props: {
        MuiPaper: {
            rounded: {
                borderRadius: 100
            }
        },
        MuiButton: {
          variant: 'contained',
          color: 'primary'
        },
        // MuiTextField: {
        //   variant: 'filled',
        //   InputLabelProps: {
        //     shrink: true
        //   }
        // },
        MuiCard: {
            elevation: 4,
            // borderRadius: 0,
            // backgroundColor: theme.palette.primary.light,
            // color: theme.palette.primary.contrastText,
            // boxShadow: "none"
        },
        MuiCheckbox: {
        //   disableRipple: true
        },
        MuiRadio: {
            fontSize: 3,
        }
      }
});