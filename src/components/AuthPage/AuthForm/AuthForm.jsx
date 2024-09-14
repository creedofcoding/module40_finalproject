import React, { useEffect, useState } from "react";
import "./AuthForm.css";
import goog from "./Goog.svg";
import face from "./face.svg";
import yand from "./Yand.svg";
import lock from "./auth_lock.svg";
import { CustomButton } from "../../CustomComponents/CustomButton/CustomButton";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import { CustomCard } from "../../CustomComponents/CustomCard/CustomCard";
import ComponentImage from "../../CustomComponents/ComponentImage/ComponentImage";
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from "../../../store/Slicers/AuthSlicer";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const AuthForm = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [loginError, setLoginError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state) => state.login);

    useEffect(() => {
        if (data.is_Auth) {
            navigate("/");
        }
    }, [navigate, data.is_Auth]);

    const validateLogin = (login) => {
        const phoneRegex = /^\+?[0-9 ]{11,}$/; // Регулярное выражение для телефона
        const loginRegex = /^[a-zA-Zа-яА-Я0-9_]{3,}$/; // Регулярное выражение для логина (буквы латиницы, кириллицы, цифры и подчеркивания)
    
        if (!login) {
            setLoginError("Обязательное поле");
            return false;
        }
    
        if (/^\+?[\d ]+$/.test(login)) {  // Позволяем только цифры, пробелы и опциональный "+"
            if (!phoneRegex.test(login)) {
                setLoginError("Введите корректные данные");
                return false;
            }
        } else {
            if (login.length < 3) {
                setLoginError("Введите корректные данные");
                return false;
            } else if (!loginRegex.test(login)) {
                setLoginError("Введите корректные данные");
                return false;
            }
        }
    
        // Если все проверки прошли успешно, убираем ошибку
        setLoginError("");
        return true;
    };

    const validatePassword = (password) => {
        if (!password) {
            setPasswordError("Обязательное поле");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    };

    const handleInputChange = () => {
        // Очистка общих ошибок при изменении полей
        setGeneralError("");
        setLoginError("");
        setPasswordError("");

        const loginInput = document.getElementById("login_input").value;
        const passwordInput = document.getElementById("password_input").value;

        const isLoginValid = validateLogin(loginInput);
        const isPasswordValid = validatePassword(passwordInput);

        setIsFormValid(isLoginValid && isPasswordValid);
    };

    const handleSubmit = () => {
        const loginInput = document.getElementById("login_input").value;
        const passwordInput = document.getElementById("password_input").value;

        const isLoginValid = validateLogin(loginInput);
        const isPasswordValid = validatePassword(passwordInput);

        if (!isLoginValid || !isPasswordValid) {
            return;
        }

        dispatch(UserLogin({ login: loginInput, password: passwordInput }));

        if (data.error) {
            setGeneralError("Неправильный логин или пароль");
        } else {
            setGeneralError("");
        }
    };

    return (
        <CustomCard
            style={{
                minWidth: "330px",
                overflow: "visible",
                position: "relative",
                padding: matches ? "10px 15px" : "10px 25px",
                maxHeight: "720px",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    left: matches ? "100px" : "-50px",
                    top: matches ? "-80px" : "-70px",
                }}
            >
                <ComponentImage source={lock} width="75px" height="92px" />
            </div>

            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        columnGap: "20px",
                    }}
                >
                    <CustomButton
                        className="login_btn"
                        variant="blue"
                        style={{
                            backgroundColor: "transparent",
                            color: "#029491",
                            fontSize: matches ? "14px" : "16px",
                            minWidth: "auto",
                            padding: "8px 20px",
                            borderBottom: "2px solid #029491",
                            borderRadius: 0,
                        }}
                    >
                        Войти
                    </CustomButton>
                    <CustomButton
                        className="auth_btn"
                        variant="blue"
                        style={{
                            backgroundColor: "transparent",
                            color: "#c7c7c7",
                            fontSize: matches ? "14px" : "16px",
                            minWidth: "auto",
                            padding: "8px 20px",
                            borderBottom: "2px solid #c7c7c7",
                            borderRadius: 0,
                        }}
                    >
                        Зарегистрироваться
                    </CustomButton>
                </div>

                <label
                    style={{
                        textAlign: "left",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#949494",
                        margin: "30px 0 15px",
                    }}
                >
                    Логин или номер телефона:
                </label>
                <input
                    onChange={handleInputChange}
                    id="login_input"
                    type="text"
                    style={{
                        padding: "10px",
                        border: "1px solid #c7c7c7",
                        borderRadius: "5px",
                    }}
                    required
                />
                {loginError && <p style={{ color: "red", textAlign: "center", marginTop: "0", marginBottom: "0" }}>{loginError}</p>}

                <label
                    style={{
                        textAlign: "left",
                        fontFamily: "Inter",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        color: "#949494",
                        margin: "15px 0",
                    }}
                >
                    Пароль:
                </label>

                <input
                    onChange={handleInputChange}
                    id="password_input"
                    type="password"
                    style={{
                        padding: "10px",
                        border: "1px solid #c7c7c7",
                        borderRadius: "5px",
                    }}
                    required
                />
                {passwordError && <p style={{ color: "red", textAlign: "center", marginTop: "0", marginBottom: "0" }}>{passwordError}</p>}

                {generalError && <p style={{ color: "red", textAlign: "center", marginTop: "0" }}>{generalError}</p>}

                <CustomButton
                    onClick={handleSubmit}
                    variant="blue"
                    style={{ marginTop: "10px" }}
                    disabled={!isFormValid}
                >
                    {data.loading ? <CircularProgress sx={{color: "#ffffff"}}/> : "Войти"}
                </CustomButton>
                <br />
                <a href="#">Восстановить пароль</a>
                <ComponentText
                    style={{
                        textAlign: "left",
                        marginTop: "30px",
                        marginBottom: "15px",
                        color: "#949494",
                    }}
                >
                    Войти через:
                </ComponentText>
                <div className="logos">
                    <button style={{ paddingLeft: 0 }}>
                        <img src={goog} />
                    </button>
                    <button className="mr">
                        <img src={face} />
                    </button>
                    <button>
                        <img src={yand} />
                    </button>
                </div>
            </form>
        </CustomCard>
    );
};

export default AuthForm;
