import React from "react";
import ComponentImage from "../../../CustomComponents/ComponentImage/ComponentImage";
import ComponentText from "../../../CustomComponents/ComponentText/ComponentText";
import { CustomButton } from "../../../CustomComponents/CustomButton/CustomButton";
import { CustomCard } from "../../../CustomComponents/CustomCard/CustomCard";
import { Colors } from "../../../../theme/Colors/Colors";
import "./ComponentSearchDoc.css";
import HTMLReactParser from "html-react-parser";

const ComponentSearchDoc = (props) => {
	function returnText(text)
	{
		let markup = text;

		markup = markup.replaceAll("&lt;", "<").replaceAll("&gt;", ">")
			.replaceAll("<scandoc>", `<div>`)
			.replaceAll("</scandoc>", "</div>")
			.replaceAll("<p>", "<span>").replaceAll("</p>", "</span>")
			.replaceAll("<sentence>", "<p>").replaceAll("</sentence>", "</p>")
			.replaceAll("<entity", "<span").replaceAll("</entity>", "</span>")
			.replaceAll("<speech", "<span").replaceAll("</speech>", "</span>")
			.replaceAll("<vue", "<span").replaceAll("</vue>", "</span>")
			.replaceAll("<br>", "");

		while (markup.includes("<figure>")) {
			let figureHTML = markup.substring(markup.indexOf("<figure>"));
			figureHTML = figureHTML.substring(0, figureHTML.indexOf("</figure>") + "</figure>".length);

			if (!figureHTML.includes("data-image-src")) {
				markup = markup.replace(figureHTML, "");
				continue;
			}

			let url = figureHTML.substring(figureHTML.indexOf("data-image-src") + "data-image-src=\"".length);
			url = url.substring(0, url.indexOf("\""));

			if (url.includes("span")) console.log(figureHTML);
			markup = markup.replace(figureHTML, `<img src="${url}" alt="Фото из публикации">`);
		}

		while (markup.includes("<span></span>"))
			markup = markup.replace("<span></span>", "");

		while (markup.includes("<p></p>"))
			markup = markup.replace("<p></p>", "");

		if (markup.length > 1800) {
			markup = markup.substring(0, markup.lastIndexOf("</p>", 1700) + "</p>".length);
			markup += "...";
		}

		markup = HTMLReactParser(markup, "text/xml");

		return markup;
	}

	// Функция для форматирования даты в формат DD.MM.YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // добавляем ведущие нули
        const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы начинаются с 0
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

	return (
		<>
			<div>
				<div className="flex">
					<div>
						<ComponentText style={{
							fontSize: "16px",
							fontWeight: "500",
							lineHeight: "20px",
							marginTop: "5px",
							textAlign: "left",
							color: Colors.colorGray
						}}>
							{formatDate(props.textDate)}
						</ComponentText>
					</div>
					<div>
						<a target="blank" href={props.url}>
							<ComponentText style={{
								fontSize: "16px",
								fontWeight: "500",
								lineHeight: "20px",
								marginTop: "5px",
								marginLeft: "15px",
								textAlign: "left",
								textDecoration: "underline",
								color: Colors.colorGray
							}}>
								{props.textSource}
							</ComponentText>
						</a>
					</div>
				</div>
				<div>
					<ComponentText style={{
						fontSize: "26px",
						fontWeight: "500",
						lineHeight: "36px",
						marginTop: "20px",
						textAlign: "left",
						color: props.colorText
					}}>
						{props.textHeader}
					</ComponentText>
				</div>
				<div>
					<ComponentText style={{
						fontSize: "12px",
						fontWeight: "400",
						lineHeight: "15px",
						marginTop: "20px",
						marginBottom: "20px",
						textAlign: "left"
					}}>
						<span className="span_div">{props.textType}</span>
					</ComponentText>
				</div>
				<ComponentImage source={props.image} width="30%">

				</ComponentImage>
				<div>
					<ComponentText style={{
						fontSize: "16px",
						fontWeight: "500",
						lineHeight: "20px",
						marginTop: "20px",
						textAlign: "left",
						color: props.colorText
					}}>
						{returnText(props.text)}
					</ComponentText>
				</div>
				<div className="left">
					<CustomButton variant='lightblue' style={{height: "50px"}}>
						<a className = "a_div" 
						target = "blank"
						href = {props.url}>Читать в источнике</a>
					</CustomButton>
				</div>
				<div>
					<ComponentText style={{
						fontSize: "16px",
						fontWeight: "400",
						lineHeight: "20px",
						marginTop: "20px",
						textAlign: "right",
						color: Colors.colorGray
					}}>
						{props.textNumWord}
					</ComponentText>
				</div>
			</div>

		</>
	)
}

export default ComponentSearchDoc
