import React from 'react'
import ComponentImage from "../../CustomComponents/ComponentImage/ComponentImage";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import ComponentHeaderText from "../../CustomComponents/ComponentHeaderText/ComponentHeaderText";
import { useTheme, useMediaQuery } from "@mui/material";
import './SearchResultHeader.css'

import image from "./search.svg";

const SearchResultHeader = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const imageResponsive = useMediaQuery(theme.breakpoints.down("sm"));
    
    return (
        <>
            <div className = "flex" style={{flexDirection: matches ? "column" : "row"}}>
                <div className = "text" style={{flexGrow: 1}}>
                    <ComponentHeaderText style={{fontSize: matches ? "28px" : "45px"}}>
                        Ищем. Скоро <br/>будут результаты
                    </ComponentHeaderText>

                    <ComponentText style = {{fontSize: matches ? "18px" : "20px", 
                                             fontWeight: "540",
                                             lineHeight:"24px",
                                             marginTop: "30px"
                                             
                                            }}>
                        Поиск может занять некоторое время, <br /> просим сохранять терпение.
                    </ComponentText>

                </div>
                <div style={{flexGrow: 1}}>
                    <ComponentImage source = {image} width = {imageResponsive ? "78%" : ""} />
                </div>
            </div>
  
        </>
    );
};

export default SearchResultHeader;
