import { createTheme } from '@mui/material'
//import { colors } from './colors'
import { fontSize } from './fontSizes'

// @TODO: Insert global theme configs here
export const theme = createTheme({
    // @TODO: Refine custom theme colors
    // palette: {
    //     primary: {
    //         main: colors.primary,
    //         light: colors.primary,
    //     },
    //     secondary: {
    //         main: colors.secondary,
    //         light: colors.secondary,
    //     },
    //     background: {
    //         default: colors.white,
    //         paper: colors.white
    //     },
    //     action: {
    //         hover: colors.primaryActive,
    //         hoverOpacity: 0.5,
    //         focus: colors.secondaryActive,
    //         focusOpacity: 0.5,
    //     },
    //     common: {
    //         black: colors.black,
    //         white: colors.white,
    //     },
    // },
    typography: {
        htmlFontSize: 10,
        h1: {
            fontSize: fontSize.fontXXL,
        },
        h2: {
            fontSize: fontSize.fontXL,
        },
        h3: {
            fontSize: fontSize.fontMD
        },
        h4: {
            fontSize: fontSize.fontMD,
        },
        h5: {
            fontSize: fontSize.fontXS,
        },
        h6: {
            fontSize: fontSize.fontXXS
        }
    },
    components: {
        // MuiButton: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 0,
        //         }
        //     }
        // },
        // MuiInput: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 0,
        //         },
        //     }
        // },
        // MuiOutlinedInput: {
        //     styleOverrides: {
        //         notchedOutline: {
        //             borderRadius: 0,
        //         },
        //         root: {
        //             borderRadius: 0,
        //         }
        //     }
        // },
        // MuiCard: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 0
        //         }
        //     }
        // },
        // MuiSvgIcon: {
        //     styleOverrides: {
        //         root: {
        //             fontSize: 'unset'
        //         }
        //     }
        // }
    }
})