import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const globalTheme = createTheme({
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
     }
  })
  const theme = createTheme({
    //  paper: {
    //     rounded: "5%",
    //     borderRadius: 100,
    //  },
    overrides: {
      MuiTableContainer: {
        root: {
          height: "80%"
        }
      },
      MuiTableCell: {
        head: {
          backgroundColor: globalTheme.palette.primary.main,
          color: globalTheme.palette.secondary.main,
        },
        stickyHeader: {
          backgroundColor: globalTheme.palette.primary.main,
          color: globalTheme.palette.secondary.main
        },
        // body: {
        //   fontSize: 14,
        // }
      }
      // MuiTableRow: {
      //   root: {
      //     '&:nth-of-type(odd)': {
      //       backgroundColor: window.theme.palette.action.hover,
      //     },
      //   }
      // }
      // MuiPaper: {
      //   root: {
      //     width: "100%"
      //   }
      // }

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
},
globalTheme);

export default responsiveFontSizes(theme);