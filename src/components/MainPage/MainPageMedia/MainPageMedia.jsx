import React from 'react'
import ComponentImage from '../../CustomComponents/ComponentImage/ComponentImage';
import MyImage from './images/Group14.svg';
import {useTheme, useMediaQuery } from "@mui/material";

function MainPageMedia() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<div style={{width: "100%", overflow: "hidden"}}>
			<ComponentImage img source={MyImage} width={matches ? "225%" : "100%"} />
		</div>
	)
}

export default MainPageMedia