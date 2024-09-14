
import React from "react";
import ComponentHeaderText from "../../CustomComponents/ComponentHeaderText/ComponentHeaderText";
import { useTheme, useMediaQuery } from "@mui/material";
function SearchPageHeader() {
	const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div>
            <ComponentHeaderText style={{ fontSize: matches ? "28px" : "40px", fontWeight: 900, lineHeight: matches ? "34px" : "48px", textAlign: "left" }}>
                Найдите необходимые <br />
                данные в пару кликов.
            </ComponentHeaderText>
        </div>
    );
}

export default SearchPageHeader;
