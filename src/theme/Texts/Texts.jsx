import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    p: 'p'
                }
            },
            styleOverrides: {
                root: {
                    fontFamily: "Inter",
                    fontWeight: 400,
                    lineHeight: "21px",
                    textTransform: "none",
                    letterSpacing: 0.1
                },
            },
        },
    },
});

export { theme };