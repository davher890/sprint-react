import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        primary: {
          main: '#272727'
        },
        secondary: {
          main: '#ffe500'
        }
    },
    spacing: 6,
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
            margin : "1%"
        },
        body1 : {
            fontSize: 16,
        }
     },
    //  paper: {
    //     rounded: "5%",
    //     borderRadius: 100,
    //  },
     overrides: {
        // MuiPaper: {
        //     rounded: {
        //         borderRadius: 30
        //     }
        // },
        // MuiButton: {
        //   variant: 'contained',
        //   color: 'secondary'
        // },
        // MuiTextField: {
        //   variant: 'filled',
        //   InputLabelProps: {
        //     shrink: true
        //   }
        // },
        // MuiCard: {
        //     elevation: 4,
        //     // borderRadius: 0,
        //     // backgroundColor: theme.palette.primary.light,
        //     // color: theme.palette.primary.contrastText,
        //     // boxShadow: "none"
        // },
        // MuiCheckbox: {
        //   disableRipple: true
        // },
        // MuiTypography: {
        //     body1 : {
        //         fontSize: 16,
        //     }
        // },
        // MuiRadio: {
        //     fontSize: 16,
        // },
        // MuiToolbar: {
        //     root : {
        //         button: {
        //             color: 'white'
        //         }
        //     }
        // }
      }
});

export default responsiveFontSizes(theme);