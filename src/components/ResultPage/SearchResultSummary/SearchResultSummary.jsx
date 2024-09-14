import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import ComponentHeaderText from "../../CustomComponents/ComponentHeaderText/ComponentHeaderText";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import RightArrow from "../../../media/RightArrow.svg";
import LeftArrow from "../../../media/LeftArrow.svg";
import { CustomCard } from "../../CustomComponents/CustomCard/CustomCard";
import { Colors } from "../../../theme/Colors/Colors";
import { DataCarousel } from "./DataCarousel/DataCarousel";
import { CustomButton } from "../../CustomComponents/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { ObjectSearch } from "../../../store/Slicers/ObjectSearchSlicer";

const SearchResultSummary = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("accessToken");

    let totalCount = 0;

    const totalDocs = useSelector((state) => state.histograms);
    const body = useSelector((state => state.histograms.requestbody));

    if (
        !totalDocs.loading &&
        totalDocs.success &&
        totalDocs.histograms.data.length > 0
    ) {
        totalDocs.histograms.data[0].data.map(
            (item) => (totalCount += Number(item.value))
        );
        dispatch(
            ObjectSearch({
                accessToken: accessToken,
                body: body,
            })
        );
    }
    const toLeft = () => {
        document.querySelector("span[type='prev']").click();
    };
    const toRight = () => {
        document.querySelector("span[type='next']").click();
    };

    return (
        <>
            <ComponentHeaderText
                style={{ textAlign: "left", fontSize: "28px" }}
            >
                ОБЩАЯ СВОДКА
            </ComponentHeaderText>
            <ComponentText style={{ textAlign: "left", marginTop: "17px" }}>
                Найдено {totalCount} вариантов
            </ComponentText>
            <div style={{ display: "flex" }}>
                <CustomButton
                    onClick={toLeft}
                    style={{
                        flexGrow: 0,
                        padding: 0,
                        marginLeft: matches ? "-30px" : 0,
                    }}
                >
                    <img src={LeftArrow} alt="LeftArrow" />
                </CustomButton>
                <CustomCard
                    style={{
                        margin: "20px 0",
                        boxShadow: "none",
                        padding: 0,
                        border: "2px solid" + Colors.colorAqua,
                        display: "flex",
                        flexGrow: 3,
                        flexDirection: matches ? "column" : "row",
                    }}
                >
                    <div
                        style={{
                            flex: 0,
                            display: "flex",
                            flexDirection: matches ? "row" : "column",
                            backgroundColor: Colors.colorAqua,
                            padding: matches ? "17px 5px" : "17px 28px",
                            justifyContent: "space-around",
                            textAlign: "center",
                            color: Colors.colorWhite,
                        }}
                    >
                        <ComponentText
                            style={{ fontSize: matches ? "18px" : "20px" }}
                        >
                            Период
                        </ComponentText>
                        <ComponentText
                            style={{
                                margin: matches ? "0" : "26px 0",
                                fontSize: matches ? "18px" : "20px",
                            }}
                        >
                            Всего
                        </ComponentText>
                        <ComponentText
                            style={{ fontSize: matches ? "18px" : "20px" }}
                        >
                            Риски
                        </ComponentText>
                    </div>
                    <div
                        style={{
                            flexGrow: 1,
                            alignItems: "middle",
                            marginTop: matches ? 0 : "20px",
                        }}
                    >
                        <DataCarousel />
                    </div>
                </CustomCard>
                <CustomButton
                    onClick={toRight}
                    style={{ flexGrow: 0, marginLeft: matches ? "-10px" : 0 }}
                >
                    <img src={RightArrow} alt="RightArrow" />
                </CustomButton>
            </div>
        </>
    );
};

export { SearchResultSummary };
