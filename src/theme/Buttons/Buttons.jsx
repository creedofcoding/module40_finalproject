import { createTheme } from "@mui/material/styles";
import { Colors } from "../Colors/Colors";

const theme = createTheme({
    components: {
        
        MuiButton: {
            styleOverrides: {
                root: {
                    "&.Mui-disabled": {
                        backgroundColor: "rgba(89, 112, 255, 0.5)",
                        color: Colors.colorWhite,
                        fontFamily: "Inter, sans",
                        fontWeight: 400,
                        fontSize: "20px",
                        lineHeight: "24px",
                        textTransform: "none",
                        letterSpacing: "1px",
                        borderRadius: "6px"
                    }
                }
            },
            variants: [
                {
                    props: { variant: "blue" },
                    style: {
                        backgroundColor: Colors.colorBlue,
                        color: Colors.colorWhite,
                        padding: "17px 20px",
                        minWidth: "250px",
                        fontFamily: "Inter, sans",
                        fontWeight: 400,
                        fontSize: "20px",
                        lineHeight: "24px",
                        textTransform: "none",
                        letterSpacing: "1px",
                        borderRadius: "5px",
                        
                        "&:hover": {
                            backgroundColor: Colors.colorBlue,
                            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                        },
                    },
                },
                {
                    props: { variant: "grey" },
                    style: {
                        backgroundColor: "#D2D2D2",
                        color: Colors.colorBlack,
                        fontFamily: "Inter, sans",
                        minWidth: "250px",
                        padding: "17px 20px",
                        fontWeight: 400,
                        fontSize: "20px",
                        lineHeight: "21px",
                        textTransform: "none",
                        // letterSpacing: "1px",
                        borderRadius: "5px",
                        "&:hover": {
                            backgroundColor: "#D2D2D2",
                            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                        },
                    },
                },
                {
                    props: { variant: "lightblue" },
                    style: {
                        backgroundColor: Colors.colorLightBlue,
                        color: Colors.colorBlack,
                        fontFamily: "Inter, sans",
                        minWidth: "250px",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "19px",
                        textTransform: "none",
                        letterSpacing: "1px",
                        "&:hover": {
                            backgroundColor: Colors.colorLightBlue,
                            boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                        },
                    },
                },
            ],
        },
    },
});

export { theme };
