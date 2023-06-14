// import News from "../components/News";
import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Block from "../components/AdBlock/AdBlock";
import image_1 from "../assets/images/image_1.png"
import News from "../components/News"
// import data from "../assets/data.json"
import Card from "../components/Card";
import Ctx from "../context"
import { useContext } from "react";
import { useNavigate } from "react-router";


let ads = [
	{
		caption: "Pedigree",
		text: "Натуральный корм для счастливых питомцев",
		bg: "#dfa0a6",
		pic: "https://pngimg.com/d/dog_food_PNG37.png",

	},
	{
		caption: "Здоровый питомец",
		text: "Качественные ингридиенты с полезными микроэлементами",
		bg: "#b5ccdc",
		pic: " https://free-png.ru/wp-content/uploads/2021/05/free-png.ru-366-340x340.png"
	},
	{
		caption: "Ням-ням",
		text: "Лучшее лакомство для собак",
		bg: "#dfa0a6",
		pic: "https://domkorma.ru/components/com_jshopping/files/img_products/______2.png"
	}
]
const Main = () => {

	const { user } = useContext(Ctx);
	const { goods } = useContext(Ctx);
	const { setServerGoods } = useContext(Ctx);
	const { setModalActive } = useContext(Ctx);
	const navigate = useNavigate();
	// const logIn = (e) => {
	// 	e.preventDefault();
	// 	setModalActive(true);
	// 	navigate("/profile")
	// }
	return (
		<>
			<Row className="gx-10 gy-5">
				<Col xs={12}>
					<div></div>
				</Col>
			</Row>

			<Row className="gx-5 gy-4">
				<Col xs={12}>
					<Block {...ads[0]} />
					{/* первая рекламная карточка на весь экран */}
				</Col>

			</Row>

			<Row className="gx-5 gy-4 " >

				<Col xs={12}>
					<h2 style={{ paddingTop: "15px" }}>Любимые товары</h2>
				</Col>
				{goods
					.filter((el, i) => i >= 4 && i < 8)
					.map((el) => (
						<Col xs={12} md={3} key={el._id}>
							<Card {...el} img={el.pictures} setServerGoods={setServerGoods} />
						</Col>
					))}
			</Row>

			<Row className="gx-5 gy-4">
				<Col xs={12} md={6}>
					{/* вторая и третья рекламная карточка каждая занимает по половине экрана */}
					<Block {...ads[1]} />
				</Col>
				<Col xs={12} md={6}>
					<Block {...ads[2]} />

				</Col>
				<News />
			</Row>
			<Row className="gx-5 gy-4">
				<Col xs={12}>
					<h2 style={{ paddingTop: "15px" }}>Любимые товары</h2>
				</Col>
				{goods
					.filter((el, i) => i >= 8 && i < 12)
					.map((el) => (
						<Col xs={12} md={3} key={el._id}>
							<Card {...el} img={el.pictures} setServerGoods={setServerGoods} />
						</Col>
					))}
			</Row>
		</>
	);
};

export default Main