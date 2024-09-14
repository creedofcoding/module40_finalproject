import React, { useEffect, useState } from "react";
import "./SearchForm.modules.css";
import { CustomButton } from "../../CustomComponents/CustomButton/CustomButton";
import { CustomCard } from "../../CustomComponents/CustomCard/CustomCard";
import { HistogramsSearchBody } from "./HistogramsSearchBody";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Histograms } from "../../../store/Slicers/HistogramsSlicer";
import { requestBody } from "../../../store/Slicers/HistogramsSlicer";
import { loadMore } from "../../../store/Slicers/DocumentsSlicer";
import SearchPageMediaImage from "../SearchPageMediaImage/SearchPageMediaImage";
import { useMediaQuery, useTheme } from "@mui/material";

const SearchForm = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("accessToken");

    //console.log(accessToken);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("lg"));

    const navigate = useNavigate();
    const histograms = useSelector((state) => state.histograms);

    useEffect(() => {
        if (histograms.success && histograms.histograms.data) {
            if (histograms.histograms.data.length === 0) {
                setError("ИНН компании не найден");
            } else if (histograms.histograms.data.length > 0) {
                setError("");
                navigate("/result");
            }
        }
    }, [histograms]);

    //useStates для валидации полей
    //ИНН
    const [innError, setInnError] = useState(""); // состояние для ошибки ИНН
    const [isInnValid, setIsInnValid] = useState(true); // состояние для валидации ИНН

    //Количество документов в выдаче
    const [countError, setCountError] = useState(""); // состояние для ошибки "Количество документов"
    const [isCountValid, setIsCountValid] = useState(true); // состояние для валидации "Количество документов"

    //Диапазон поиска
    const [dateRangeError, setDateRangeError] = useState(""); // состояние для ошибки "Диапазон поиска"
    const [isDateRangeValid, setIsDateRangeValid] = useState(true); // состояние для валидации диапазона

    const checkFormAndRequest = () => {
        const inn = document.querySelector("#inn").value.replace(/\s/g, "");;
        validateInn(inn); // Валидация поля "ИНН"

        const tonality = document.querySelector("#tonality").value;

        const count = document.querySelector("#count").value;
        validateCount(count); // Валидация поля "Количество документов"

        const startDate = document.querySelector("#startDate").value;
        const endDate = document.querySelector("#endDate").value;
        validateDateRange(startDate, endDate); // Валидация диапазона дат

        const body = () => {
            dispatch(
                requestBody(
                    HistogramsSearchBody(
                        inn,
                        tonality,
                        count,
                        startDate,
                        endDate
                    )
                )
            );
            dispatch(loadMore(count));
            return HistogramsSearchBody(
                inn,
                tonality,
                count,
                startDate,
                endDate
            );
        };

        if (isInnValid && isCountValid && isDateRangeValid) {
            dispatch(
                Histograms({
                    accessToken: accessToken,
                    body: body(),
                })
            );
        }
    };

    //пробелы в поле ИНН
    const [inn, setInn] = useState("");

    const formatInn = (value) => {
        // Убираем все пробелы
        value = value.replace(/\s/g, "");
        
        // Форматируем значение с пробелами после 2, 3 и 3 цифр
        if (value.length > 2) {
            value = value.slice(0, 2) + " " + value.slice(2);
        }
        if (value.length > 6) {
            value = value.slice(0, 6) + " " + value.slice(6);
        }
        if (value.length > 10) {
            value = value.slice(0, 10) + " " + value.slice(10);
        }
        return value;
    };

    //проверка ИНН

    const validateInn = (inn) => {
        const innWithoutSpaces = inn.replace(/\s/g, ""); // Удаляем все пробелы
        if (innWithoutSpaces === "") {
            setInnError("Обязательное поле");
            setIsInnValid(false);
        } else if (!/^\d+$/.test(innWithoutSpaces) || innWithoutSpaces.length < 10 || innWithoutSpaces.length > 13) {
            setInnError("Введите корректные данные");
            setIsInnValid(false);
        } else {
            setInnError("");
            setIsInnValid(true);
        }
    };

    const handleInnChange = (e) => {
        const formattedInn = formatInn(e.target.value);
        setInn(formattedInn);
        validateInn(e.target.value); // Валидация при изменении
    };

    //проверка Количество документов в выдаче

    const validateCount = (count) => {
        if (count.trim() === "") {
            setCountError("Обязательное поле");
            setIsCountValid(false);
        } else if (count < 1 || count > 999) {
            setCountError("Введите корректные данные");
            setIsCountValid(false);
        } else {
            setCountError(""); // Убираем ошибку, если всё корректно
            setIsCountValid(true); // Убираем подсветку
        }
    };

    const handleCountChange = (e) => {
        const countValue = e.target.value;
        validateCount(countValue); // Запускаем валидацию при каждом изменении
    };

    //проверка Диапазон поиска

    const validateDateRange = (startDate, endDate) => {
        if (!startDate || !endDate) {
            setDateRangeError("Обязательные поля");
            setIsDateRangeValid(false);
        } else if (Date.parse(startDate) > Date.parse(endDate) || Date.parse(endDate) > Date.now()) {
            setDateRangeError("Введите корректные данные");
            setIsDateRangeValid(false);
        } else {
            setDateRangeError("");
            setIsDateRangeValid(true);
        }
    };

    const handleDateChange = () => {
        const startDate = document.querySelector("#startDate").value;
        const endDate = document.querySelector("#endDate").value;
        validateDateRange(startDate, endDate); // Запускаем валидацию при каждом изменении
    };

    return (
        <div style={{display: "flex", flexDirection: matches ? "column" : "row", position: "relative"}} className="customCard" >
            <CustomCard style={{ marginTop: "20px", padding: "35px" }}>
                <form>
                    <div style={{ display: "flex" }}>
                        <div style={{ textAlign: "left", flex: matches ? "1" : "0.8" }}>
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        textAlign: "left",
                                        marginBottom: "5px",
                                    }}
                                >
                                    ИНН компании<span style={{ color: isInnValid ? "black" : "red" }}>*</span>
                                    <input
                                        style={{
                                            marginTop: "10px",
                                            maxWidth: matches ? "100%" : "240px",
                                            borderColor: isInnValid ? "#c7c7c7" : "red" // Подсветка поля
                                        }}
                                        type="text"
                                        id="inn"
                                        value={inn}
                                        onChange={handleInnChange}
                                        placeholder="10-13 цифр"
                                        maxLength={13}
                                    />
                                    {!isInnValid && <p style={{ color: "red", marginTop: "0" }}>{innError}</p>} {/* Сообщение об ошибке */}
                                </label>
                            </div>
                            <div>
                                <label
                                    style={{
                                        display: "block",
                                        textAlign: "left",
                                        marginBottom: "30px",
                                    }}
                                >
                                    Тональность
                                    <div
                                        style={{
                                            marginTop: "10px",
                                        }}
                                    >
                                        <select
                                            className="tonality"
                                            id="tonality"
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: 400,
                                                padding: "13px 22px",
                                                borderRadius: "5px",
                                                borderColor: "#c7c7c7",
                                                width: matches ? "100%" : "240px"
                                            }}
                                        >
                                            <option value="any">Любая</option>
                                            <option value="positive">
                                                Позитивная
                                            </option>
                                            <option value="negative">
                                                Негативная
                                            </option>
                                        </select>
                                    </div>
                                </label>
                            </div>
                            <label
                                style={{
                                    display: "block",
                                    textAlign: "left",
                                    marginBottom: "30px",
                                }}
                            >
                                Количество документов в выдаче<span style={{ color: isCountValid ? "black" : "red" }}>*</span>
                                <input
                                    style={{
                                        maxWidth: matches ? "100%" : "240px",
                                        marginTop: "10px",
                                        borderColor: isCountValid ? "#c7c7c7" : "red" // Подсветка поля
                                    }}
                                    type="number"
                                    id="count"
                                    placeholder="от 1 до 1000"
                                    min="1" max="999"
                                    maxLength="10"
                                    required="required"
                                    onChange={handleCountChange}
                                />
                                {!isCountValid && <p style={{ color: "red", marginTop: "0" }}>{countError}</p>} {/* Сообщение об ошибке */}
                            </label>

                            <label
                                style={{
                                    display: "block",
                                    textAlign: "left",
                                    marginBottom: "30px",
                                }}
                            >
                                Диапазон поиска<span style={{ color: isDateRangeValid ? "black" : "red" }}>*</span>
                                <div
                                    style={{
                                        display: "flex",
                                        columnGap: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    <input
                                        style={{ 
                                            maxWidth: "175px",
                                            borderColor: isDateRangeValid ? "#c7c7c7" : "red" // Подсветка полей
                                        }}
                                        type="date"
                                        id="startDate"
                                        required="required"
                                        placeholder="Дата начала"
                                        onChange={handleDateChange}
                                    />
                                    <input
                                        style={{ 
                                            maxWidth: "175px",
                                            borderColor: isDateRangeValid ? "#c7c7c7" : "red" // Подсветка полей
                                        }}
                                        type="date"
                                        id="endDate"
                                        required="required"
                                        placeholder="Дата конца"
                                        onChange={handleDateChange}
                                    />
                                </div>
                                {!isDateRangeValid && (
                                    <p style={{ color: "red", textAlign: "center", marginTop: "0" }}>{dateRangeError}</p> // Сообщение об ошибке по центру
                                )}
                            </label>
                            <div
                                className="btn"
                                style={{
                                    position: "relative",
                                    marginTop: "20px",
                                    display: matches ? "block" : "none"
                                }}
                            >
                                <CustomButton style={{width: "100%"}}
                                    variant="blue"
                                    id="submit"
                                    onClick={() => {
                                        checkFormAndRequest();
                                    }}
                                >
                                    Поиск
                                </CustomButton>

                                <p style={{color: "#949494"}}>*Обязательные к заполнению поля</p>
                                <span
                                    id="error"
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        bottom: 0,
                                        fontSize: "18px",
                                        color: "red",
                                    }}
                                >
                                    {error}
                                </span>
                            </div>
                        </div>

                        <div
                            style={{
                                display: matches ? "none" : "flex",
                                flexDirection: "column",
                                flex: "1.1",
                            }}
                        >
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Признак максимальной полноты
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    value="test"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Упоминания в бизнес-контенте
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Главная роль в публикации
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Публикации только с риск-факторами
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Включать технические новости рынков
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Включать анонсы и календари
                                </span>
                            </div>
                            <div className="checkbox_block">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        verticalAlign: "bottom",
                                    }}
                                />
                                <span className="checkbox_span">
                                    Включать сводки новостей
                                </span>
                            </div>

                            <div
                                className="btn"
                                style={{
                                    position: "relative",
                                    textAlign: "right",
                                    marginTop: "60px",
                                }}
                            >
                                <CustomButton
                                    variant="blue"
                                    id="submit"
                                    onClick={() => {
                                        checkFormAndRequest();
                                    }}
                                >
                                    Поиск
                                </CustomButton>

                                <p style={{color: "#949494"}}>*Обязательные к заполнению поля</p>
                            </div>
                        </div>
                    </div>
                </form>
            </CustomCard>
      
        </div>
    );
};

export default SearchForm;
