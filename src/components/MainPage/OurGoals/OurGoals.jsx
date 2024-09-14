import React from "react";
import { CustomCard } from "../../CustomComponents/CustomCard/CustomCard";
import RightArrow from "../../../media/RightArrow.svg";
import LeftArrow from "../../../media/LeftArrow.svg";
import AliceCarousel from "react-alice-carousel";
import clock from "../../../media/Clock.svg";
import search from "../../../media/search.svg";
import armor from "../../../media/armor.svg";
import "react-alice-carousel/lib/alice-carousel.css";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import ComponentHeaderText from "../../CustomComponents/ComponentHeaderText/ComponentHeaderText";
import { useTheme, useMediaQuery } from "@mui/material";

const OurGoals = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const items = [
    <CustomCard style={{ minHeight: "225px", margin: "10px 30px" }}>
      <div style={{ textAlign: "left" }}>
        <img src={clock} alt="clock" />
        <ComponentText style={{ fontSize: "18px", marginTop: "20px" }}>
          Высокая и оперативная скорость обработки заявки
        </ComponentText>
      </div>
    </CustomCard>,

    <CustomCard style={{ minHeight: "225px", margin: "10px 30px" }}>
      <div style={{ textAlign: "left" }}>
        <img src={search} alt="search" />
        <ComponentText style={{ fontSize: "18px", marginTop: "20px" }}>
          Огромная комплексная база данных, обеспечивающая объективный ответ на
          запрос
        </ComponentText>
      </div>
    </CustomCard>,

    <CustomCard style={{ minHeight: "225px", margin: "10px 30px" }}>
      <div style={{ textAlign: "left" }}>
        <img src={armor} alt="watch" />
        <ComponentText style={{ fontSize: "18px", marginTop: "20px" }}>
          Защита конфеденциальных сведений, не подлежащих разглашению по
          федеральному законодательству
        </ComponentText>
      </div>
    </CustomCard>,
  ];
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3, itemsFit: "contain" },
  };

  return (
    <div>
      <ComponentHeaderText
        style={{
          textAlign: "left",
          marginBottom: "50px",
          fontSize: matches ? "28px" : "45px",
          lineHeight: matches ? "33px" : "54px",
          paddingRight: matches ? "66px" : "0"
        }}
      >
        Почему именно мы
      </ComponentHeaderText>
      <AliceCarousel
        autoWidth={false}
        items={items}
        infinite
        responsive={responsive}
        disableDotsControls
        renderPrevButton={() => {
          return (
            <div
              style={{
                position: "absolute",
                left: "-10px",
                top: "40%",
                cursor: "pointer",
              }}
            >
              <img src={LeftArrow} alt="leftArrow" />
            </div>
          );
        }}
        renderNextButton={() => {
          return (
            <div
              style={{
                position: "absolute",
                right: "-10px",
                top: "40%",
                cursor: "pointer",
              }}
            >
              <img src={RightArrow} alt="RightArrow" />
            </div>
          );
        }}
      />
    </div>
  );
};

export default OurGoals;
