import React from "react";
import { Row, Col } from "react-bootstrap";
import backGround from "../../assets/images/backGround.png"



const Block = ({ pic, bg, caption, text }) => {
	let style = {
		backgroundImage: `url(https://bogatyr.club/uploads/posts/2023-03/thumbs/1677900038_bogatyr-club-p-sobachya-lapka-foni-oboi-88.png)`,
		backgroundSize: "auto 100%",
		backgroundColor: bg,
		borderRadius: "5px", // добавлено свойство для радиуса границы

	};

	return <Row style={style}>
		<Col xs={8} style={{ padding: "30px" }}>
			<h3 style={{ fontWeight: "bold", paddingBottom: "10px" }}>{caption}</h3>
			<p>{text}</p>
		</Col>
		<Col xs={4} style={{ padding: "15px" }}>
			<img src={pic}
				alt={caption}
				className="w-100" />
		</Col>

	</Row>

}


export default Block