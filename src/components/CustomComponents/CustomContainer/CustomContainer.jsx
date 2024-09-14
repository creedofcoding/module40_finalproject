import React from "react";
import { Container, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const CustomContainer = (props) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    let { children, ...others } = props;

    const responsive = matches
        ? { padding: "20px 10px" }
        : { padding: "20px 60px" };
    return (
        <Container maxWidth="false" style={responsive} {...others}>
            {children}
        </Container>
    );
};

export { CustomContainer };
