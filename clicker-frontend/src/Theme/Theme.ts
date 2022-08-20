import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface ClickerTheme {
        clickerColors: {
            background: string;
        },
        clickerShape: {
            smallBorderRadius: number,
            largeBorderRadius: number
        }
    }
    interface Theme extends ClickerTheme {}
    interface ThemeOptions extends ClickerTheme {}
}
const theme = createTheme({
    clickerColors: {
        background: '#f0f2f5'
    },
    clickerShape: {
        smallBorderRadius: 2,
        largeBorderRadius: 6
    }
})

export default theme