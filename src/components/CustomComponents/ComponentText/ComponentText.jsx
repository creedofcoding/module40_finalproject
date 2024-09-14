import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../../theme/Texts/Texts";
import { Typography } from "@mui/material";

const ComponentText = (props) => {
    let { children, ...others } = props;

    return (
        <ThemeProvider theme={theme}>
            <Typography variant="p" {...others}>{children}</Typography>
        </ThemeProvider>
    );
};
export default ComponentText;
