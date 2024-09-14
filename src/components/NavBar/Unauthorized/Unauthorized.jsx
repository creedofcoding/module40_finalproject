import { Box } from "@mui/material";
import React from "react";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import { CustomButton } from "../../CustomComponents/CustomButton/CustomButton";
import { Colors } from "../../../theme/Colors/Colors";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                flexGrow: 2,
                display: { xs: "none", lg: "flex" },
                justifyContent: "end",
                alignItems: "center",
                gap: "50px"
            }}
        >
            <ComponentText style={{ color: "rgba(0, 0, 0, 0.5)", cursor: "pointer" }}>
                Зарегистрироваться
            </ComponentText>
            <CustomButton
                variant="blue"
                onClick={() => navigate('/login')}
                style={{
                    position: "relative",
                    backgroundColor: "#7CE3E1",
                    color: Colors.colorBlack,
                    fontSize: "14px",
                    lineHeight: "17px",
                    fonWeight: 500,
                    padding: "5px 10px",
                    minWidth: "inherit",
                }}
            >
                <div
                    style={{
                        content: "",
                        position: "absolute",
                        borderLeft: "3px solid #7CE3E1",
                        height: "100%",
                        top: 0,
                        left: "-20px",
                    }}
                />
                Войти
            </CustomButton>
        </Box>
    );
};

export { Unauthorized };
