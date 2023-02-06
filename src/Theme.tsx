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
        color: secondary,
        borderRadius: 15
      }
    },
    MuiIconButton: {
      root: {
        color: secondary
      }
    },
    MuiTableContainer: {
      root: {
        height: "80%"
      }
    },
    
  }
})
export default responsiveFontSizes(theme);