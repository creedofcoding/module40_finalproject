import React from "react";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import { Box, Avatar } from "@mui/material";
import { Colors } from "../../../theme/Colors/Colors";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../store/Slicers/AuthSlicer";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../../../store/Slicers/UserInfoSlicer";

const Authorized = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOut = () => {
        dispatch(clearUserInfo());
        dispatch(logout());
        navigate("/login");
    };
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: { xs: "none", lg: "flex" },
                justifyContent: "end",
                alignItems: "center",
            }}
        >
            <div style={{ textAlign: "right" }}>
                <ComponentText
                    style={{
                        color: Colors.colorBlack,
                        marginBottom: 0,
                    }}
                >
                    {localStorage.getItem("userLogin")}
                </ComponentText>

                <button
                    onClick={() => {
                        logOut();
                    }}
                    style={{
                        fontFamily: "Inter",
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        marginTop: 0,
                    }}
                >
                    Выйти
                </button>
            </div>
            <Avatar />
        </Box>
    );
};

export { Authorized };
