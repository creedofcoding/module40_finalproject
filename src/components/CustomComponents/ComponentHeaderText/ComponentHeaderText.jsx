import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../theme/Headers/Headers";
import { Typography } from "@mui/material";

const ComponentHeaderText = (props) => {
    let { children, ...others } = props;
    return (
        <ThemeProvider theme={theme}>
            <Typography variant="h1" {...others}>
                {children}
            </Typography>
        </ThemeProvider>
    );
};
export default ComponentHeaderText;
