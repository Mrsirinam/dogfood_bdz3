import React from "react";
import Logo from "./Logo"; // Путь к файлу с компонентом Logo
import { Link } from "react-router-dom";
import Draft from "../../pages/Draft"; // Путь к файлу с компонентом Draft
// import "./footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__cell">
				<div className="d-flex flex-column align-items-center align-md-start">
					<Logo />
					<div className="year">©{new Date().getFullYear()}</div>
				</div>
			</div>
			<div className="footer__cell footer__menu">
				<Link to="" className="link">Каталог</Link>
				<Link to="" className="link">Избранное</Link>
				<Link to="" className="link">Корзина</Link>
				<Link to="/draft" className="link">Черновик</Link>
			</div>
		</footer>
	);
};

export default Footer;