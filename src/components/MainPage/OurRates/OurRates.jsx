import React from "react";
import ComponentOurRates from "./ComponentOurRates/ComponentOurRates";
import ComponentHeaderText from "../../CustomComponents/ComponentHeaderText/ComponentHeaderText";
import "./OurRates.css";
import { Colors } from "../../../theme/Colors/Colors";
import lamp from "../../../media/lamp.svg";
import aim from "../../../media/aim.svg";
import notebook from "../../../media/notebook.svg";
import { useTheme, useMediaQuery } from "@mui/material";
import { CustomCard } from "../../CustomComponents/CustomCard/CustomCard";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
var numCard = getRandomInt(5);  

const OurRates = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("lg"));

    console.log(numCard);
    return (
        <>
            <div id="tariffs">
                <ComponentHeaderText
                    style={{
                        fontSize: matches ? "28px" : "45px",
                        lineHeight: matches ? "33px" : "54px",
                        fontWeight: "900",
                        marginTop: "20px",
                        marginBottom: matches ? "35px" : "60px",
                        textAlign: "left",
                    }}
                >
                    НАШИ ТАРИФЫ
                </ComponentHeaderText>
            </div>

            <CustomCard
                style={{
                    boxShadow: "none",
                    border: 0,
                    margin: "0 0 20px",
                    display: "flex",
                    flexWrap: 'wrap',
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: matches ? "column" : "row",
                    padding: matches ? "0" : "20px",
                    // gap: "10px"
                }}
            >
                <ComponentOurRates
                    header="Beginner"
                    text="Для небольшого исследования"
                    price="799 ₽"
                    priceOld="1200 ₽"
                    priceIn="или 150₽/мес. при рассрочке 24 мес."
                    color={Colors.colorYellow}
                    colorText={Colors.colorBlack}
                    buttonStyle="grey"
                    list1="Безлимитная история запросов"
                    list2="Безопасная сделка"
                    list3="Поддержка 24/7"
                    source={lamp}
                    border = {numCard === 1 ? "solid 2px":"none"}
                    style={{
                        border: "2px",
                        borderStyle: "solid",
                        boxShadow: "none",
                        borderColor: Colors.colorYellow,
                    }}
                    current = {numCard === 1 }
                />
                <ComponentOurRates
                    header="Pro"
                    text="Для HR и фрилансеров"
                    price="1299 ₽"
                    priceOld="2600 ₽"
                    priceIn="или 279₽/мес. при рассрочке 24 мес."
                    color={Colors.colorLightBlue}
                    colorText={Colors.colorBlack}
                    buttonStyle="blue"
                    source={aim}
                    border = {numCard === 2 ? "solid 2px":"none"}
                    current = {numCard === 2 }
                    list1="Все пункты тарифа Beginner"
                    list2="Экспорт истории"
                    list3="Рекомендации по приоритетам"
                />
                <ComponentOurRates
                    header="Business"
                    text="Для корпоративных клиентов"
                    price="2379 ₽"
                    priceOld="3700 ₽"
                    priceIn="&nbsp;"
                    color={Colors.colorBlack}
                    colorText={Colors.colorWhite}
                    buttonStyle="blue"
                    source={notebook}
                    border = {numCard === 3 ? "solid 2px":"none"}
                    current = {numCard === 3 }
                    list1="Все пункты тарифа Pro"
                    list2="Безлимитное количество запросов"
                    list3="Приоритетная поддержка"
                />
            </CustomCard>
        </>
    );
};

export default OurRates;
