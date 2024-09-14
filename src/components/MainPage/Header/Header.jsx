import React from "react";
import { CustomButton } from "../../CustomComponents/CustomButton/CustomButton";
import ComponentHeaderText from "../../CustomComponents/ComponentHeaderText/ComponentHeaderText";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import ComponentImage from "../../CustomComponents/ComponentImage/ComponentImage";
import main_up from "./main_up.svg";
// import "./Header.module.css";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDocuments } from "../../../store/Slicers/DocumentsSlicer";
import { clearHistograms } from "../../../store/Slicers/HistogramsSlicer";

const Header = () => {
  const navigate = useNavigate()
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const is_Auth = useSelector((state) => state.userInfo.is_Auth);
  const dispatch = useDispatch();
  return (
    <div style={{display: "flex", flexDirection: matches ? "column" : "row"}}>
      <div className="left-part">
        <div className="left-text">
          <div>
            <ComponentHeaderText
              style={{
                textAlign: "left",
                fontSize: matches ? "28px" : "45px",
                lineHeight: matches ? "33px" : "72px",
              }}
            >
              Сервис по поиску публикаций <br />о компании <br />
              по его ИНН
            </ComponentHeaderText>
          </div>
          <div>
            <ComponentText style={{
                textAlign: "left",
                fontSize: matches ? "18px" : "20px",
                lineHeight: matches ? "21px" : "24px",
              }}>
              Комплексный анализ публикаций, получение данных <br />в формате
              PDF на электронную почту.
            </ComponentText>
          </div>
        </div>
        <div style={{textAlign: matches ? "center" : "left", marginTop: "70px", display: is_Auth ? "block" : "none"}}>
          <CustomButton variant="blue" onClick={() => {navigate("/search/");
                                        dispatch(clearDocuments());
                                        dispatch(clearHistograms());
        }}> Запросить данные</CustomButton>
        </div>
      </div>
      <div className="image">
        <ComponentImage source={main_up} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default Header;
