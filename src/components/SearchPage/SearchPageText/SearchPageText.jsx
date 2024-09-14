import React from "react";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";

function SearchPageText() {
    return (
        <ComponentText
            style={{ fontSize: "20px", textAlign: "left", marginTop: "20px", lineHeight: "25px" }}
        >
            Задайте параметры поиска.
            <br />
            Чем больше заполните, тем точнее поиск.
        </ComponentText>
    );
}

export default SearchPageText;
