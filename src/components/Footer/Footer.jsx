import React from 'react';
import './Footer.css'
import logo from './logo2.svg'
import Box from "@mui/material/Box";
import { CustomContainer } from '../CustomComponents/CustomContainer/CustomContainer';

const Footer = () => {
	return (
		< footer >
			<div className="content_footer">
				<a href="/"><img src={logo} className="Logo" /></a>
				<p className="foot_text">
					г. Москва, Цветной б-р, 40<br />
					+7 495 711 21 11<br />
					info@skan.ru<br />
					<br />
					Copyright, 2024
				</p>
			</div>

		</footer >

	)
}

export default Footer;
