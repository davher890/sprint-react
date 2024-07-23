import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { Theme } from '@mui/material/styles';

declare module '@mui/styles' {
  interface DefaultTheme extends Theme {}
}

const primary = "#272727";
const secondary = "#ffe500";

const theme = createTheme({
    palette: {
        primary: {
            main: primary,
        },
        secondary: {
            main: secondary,
        },
    },
    typography: {
        fontFamily: "Calibri",
        fontSize: 13,
        button: {
            margin: "1%",
        },
        body1: {
            fontSize: 16,
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
                color: "primary",
            },
            styleOverrides: {
                root: {
            //         color: secondary,
            //         borderRadius: 15,
            //         backgroundColor: secondary,
                    "&:hover": {
                        backgroundColor: "#D8CF80",
                    },
                },
                containedPrimary: {
            //         color: primary,
            //         backgroundColor: secondary,
                    "&:hover": {
                        backgroundColor: "#D8CF80", 
                    },
                },
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "secondary",
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    height: "80%",
                }
            }
        }
    }
});
export default responsiveFontSizes(theme);
