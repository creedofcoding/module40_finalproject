import * as React from "react";
import ComponentText from "../../CustomComponents/ComponentText/ComponentText";
import { Box } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { UserInfo } from "../../../store/Slicers/UserInfoSlicer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const InfoBlock = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));
    const dispatch = useDispatch();
    const data = useSelector((state) => state.userInfo);

    useEffect(() => {
        if (!data.is_Auth) {
            dispatch(UserInfo(localStorage.getItem("accessToken")));
        }
    }, [dispatch, data]);

    
    return (
        <Box
            sx={{
                flexGrow: 0,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#d9d9d9",
                padding: matches ? "5px 2px" : "5px 14px",
                borderRadius: "5px",
                color: "rgba(0, 0, 0, 0.5)",
                width: matches ? "150px" : "200px", // Увеличиваем ширину
            }}
        >
            {data.loading || data.is_Auth === false ? (
                <div style={{ width: "150px", alignSelf: "center" }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <Box style={{ marginLeft: matches ? "7px" : "0" }}>
                        <ComponentText
                            style={{
                                textAlign: matches ? "left" : "right",
                                fontSize: "10px",
                                marginRight: matches ? "0" : "10px",
                                display: matches ? "block" : "inline-block",
                            }}
                        >
                            Использовано компаний
                        </ComponentText>

                        <ComponentText
                            style={{
                                margin: "0",
                                fontSize: "14px",
                                fontWeight: 700,
                                textAlign: "left",
                                display: matches ? "block" : "inline-block",
                            }}
                        >
                            {data.userInfo.eventFiltersInfo.usedCompanyCount}
                        </ComponentText>
                    </Box>

                    <Box style={{ marginLeft: matches ? "7px" : "0" }}>
                        <ComponentText
                            style={{
                                fontSize: "10px",
                                marginRight: matches ? "0" : "10px",
                                textAlign: matches ? "left" : "right",
                                display: matches ? "block" : "inline-block",
                            }}
                        >
                            Лимит по компаниям
                        </ComponentText>

                        <ComponentText
                            style={{
                                margin: "0",
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "#8AC540",
                                textAlign: "left",
                                display: matches ? "block" : "inline-block",
                            }}
                        >
                            {data.userInfo.eventFiltersInfo.companyLimit}
                        </ComponentText>
                    </Box>
                </>
            )}
        </Box>
    );
};

export { InfoBlock };
