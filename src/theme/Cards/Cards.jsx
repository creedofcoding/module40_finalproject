import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    margin: "0 30px",
                },
            },
        },
    },
});

export { theme };
