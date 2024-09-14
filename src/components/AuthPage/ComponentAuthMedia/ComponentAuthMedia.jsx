import React from "react";
import ComponentHeaderText from "../../CustomComponents/ComponentHeaderText/ComponentHeaderText";
import { useTheme, useMediaQuery } from "@mui/material";
function ComponentAuthMedia() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<div>
			<ComponentHeaderText className='font_ferry' style={{
				fontWeight: "900",
				marginTop: "20px",
				textAlign: "left",
				fontFamily: 'Ferry',
				fontStyle: "normal",
				fontWeight: "900",
				fontSize: "45px",
				lineHeight: "72px",
				letterSpacing: "0.02em"

		}}> Для оформления подписки
			<br />на тариф, необходимо <br />авторизоваться.
		</ComponentHeaderText>
		</div >
	)
}

export default ComponentAuthMedia;
