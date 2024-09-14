import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import TopLogo from "../../media/TopLogo.svg";
import BottomLogo from "../../media/BottomLogo.svg";
import Close from "../../media/Close.svg";
import { Colors } from "../../theme/Colors/Colors";
import menuIcon from "../../media/menuIcon.svg";
import { CustomButton } from "../CustomComponents/CustomButton/CustomButton";
import ComponentText from "../CustomComponents/ComponentText/ComponentText";
import { InfoBlock } from "./InfoBlock/InfoBlock";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Authorized } from "./Authorized/Authorized";
import { Unauthorized } from "./Unauthorized/Unauthorized";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../../store/Slicers/UserInfoSlicer";
import { logout } from "../../store/Slicers/AuthSlicer";
import CircularProgress from "@mui/material/CircularProgress";
import { clearDocuments } from "../../store/Slicers/DocumentsSlicer";
import { clearHistograms } from "../../store/Slicers/HistogramsSlicer";


const navItems = [
    { text: "Главная", nav: "/" },
    { text: "Тарифы", nav: "" },
    { text: "FAQ", nav: "" },
];

const drawerWidth = "100%";

const NavBar = (props) => {
    const dispatch = useDispatch();
    const logged = useSelector((state) => state.login);
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 40px",
                }}
            >
                <img src={BottomLogo} alt="Logo" style={{ width: "121px" }} />
                <img
                    src={Close}
                    alt="Close"
                    onClick={handleDrawerToggle}
                    style={{ cursor: "pointer" }}
                />
            </div>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "center" }}
                            onClick={() => {
                                navigate("/");
                                handleDrawerToggle();
                                dispatch(clearDocuments());
                                dispatch(clearHistograms());
                            }}
                        >
                            <ListItemText
                                primary={
                                    <ComponentText>{item.text}</ComponentText>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <div style={{ textAlign: "center", marginTop: "70px" }}>
                <ComponentText
                    style={{
                        marginBottom: "20px",
                        color: "rgba(255,255,255,0.5)",
                        // visibility: logged.is_Auth ? "hidden" : "visible",
                    }}
                    onClick={() => {
                        navigate("/login");
                        handleDrawerToggle();
                    }}
                >
                    Зарегистрироваться
                </ComponentText>

                <CustomButton
                    variant="blue"
                    style={{
                        backgroundColor: "rgba(124, 227, 225, 1)",
                        color: Colors.colorBlack,
                    }}
                    onClick={
                        logged.is_Auth || localStorage.getItem("accessToken")
                            ? () => {
                                  dispatch(clearUserInfo());
                                  dispatch(logout());
                                  handleDrawerToggle();
                              }
                            : () => {
                                  navigate("/login");
                                  handleDrawerToggle();
                              }
                    }
                >
                    {logged.is_Auth || localStorage.getItem("accessToken") ? "Выйти" : "Войти"}
                </CustomButton>
            </div>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <AppBar
                sx={{
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    padding: matches_sm ? "0" : "0 60px",
                    display: "block",
                    position: "relative",
                    paddingTop: "5px",
                }}
            >
                <CssBaseline />
                <Toolbar sx={{ padding: { lg: "0 !important" } }}>
                    <Box
                        sx={{
                            flexGrow: 2,
                            textAlign: "left",
                            width: { md: "121px" },
                        }}
                    >
                        <a href="/"><img src={TopLogo} alt="TopLogo" /></a>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 2,
                            display: { xs: "none", lg: "block" },
                        }}
                    >
                        {navItems.map((item, index) => (
                            <Button
                                onClick={() => navigate(item.nav)}
                                key={index}
                                sx={{
                                    fontFamily: "Inter",
                                    fontWeight: 400,
                                    color: "#000",
                                    textTransform: "none",
                                    margin: "0 25px",
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                    {logged.is_Auth || localStorage.getItem("accessToken") ? (
                        <>
                            <InfoBlock />
                            <Authorized />
                        </>
                    ) : (
                        <>
                            <Unauthorized />
                        </>
                    )}
                    <Box
                        sx={{
                            flexGrow: 2,
                            display: { lg: "none" },
                            textAlign: "right",
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <img src={menuIcon} alt="menuIcon" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    PaperProps={{
                        sx: {
                            color: Colors.colorWhite,
                            backgroundColor: Colors.colorAqua,
                        },
                    }}
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { md: "block", lg: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export { NavBar };
