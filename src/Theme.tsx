import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const primary = '#272727'
const secondary = '#ffe500'

const theme = createTheme({
  palette: {
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    }
  },
  // spacing: 6,
  // paper: {
  // shape: {
  //     borderRadius: 15
  // },
  // },
  typography: {
    fontFamily: 'Calibri',
    fontSize: 13,
    button: {
        margin : "1%"
    },
    body1 : {
        fontSize: 16,
    }
  },
  props: {
    MuiButton: {
        variant: 'contained',
        color: 'primary'
    }
  },
  overrides : {
    MuiButton: {
      root: {
        borderRadius: 15
      }
    },
    MuiTableContainer: {
      root: {
        height: "80%"
      }
    },
    MuiTableCell: {
      head: {
        backgroundColor: primary,
        color: secondary,
      },
      stickyHeader: {
        backgroundColor: primary,
        color: secondary
      },
      // body: {
      //   fontSize: 14,
      // }
    }
  }
})
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


export default responsiveFontSizes(theme);