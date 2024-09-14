import * as React from "react";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { theme } from '../../../theme/Buttons/Buttons';

const CustomButton = (props) => {
    let { children, url, ...others } = props;
    return (
        <ThemeProvider theme={theme}>
            <Button variant={props.variant} {...others} >{children}</Button>
        </ThemeProvider>
    );
};

export { CustomButton };
