import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import {
	Folder2,
	Star,
	Cart4,
	PersonSquare,
	BoxArrowInRight,
	PlusSquare
} from "react-bootstrap-icons";
import { useEffect, useState, useContext } from "react";

import Ctx from "../../context"

const Header = ({ user, setModalActive, serverGoods }) => {
	const [likeCnt, setLikeCnt] = useState(0);
	const [cartCnt, setCartCnt] = useState(0);
	const { basket } = useContext(Ctx);
	useEffect(() => {
		//фильтруем только те товары, у которых в лайках есть id нашего пользователя - id берем из ls, ибо мы про него забыли
		console.log(serverGoods.map(el => el.likes));
		console.log(localStorage.getItem("rockId"));
		setLikeCnt(serverGoods.filter(el => el.likes.includes(localStorage.getItem("rockId"))).length)
	}, [serverGoods]);


	//счетчик на корзине
	useEffect(() => {
		if (basket) {
			let cnt = 0;
			for (let i = 0; i < basket.length; i++) {
				cnt += basket[i].cnt
			}
			setCartCnt(cnt);
		}
	}, [basket])

	const navigate = useNavigate();
	const logIn = (e) => {
		e.preventDefault();
		// setUser("lk-band");
		// localStorage.setItem("rockUser", "lk-band");
		setModalActive(true);
		navigate("/profile")
	}
	return <header>
		<Logo />
		<div className="search"></div>
		<nav className="header__menu">
			{/* Если пользователь === true */}
			{user && <>
				<Link to="/add" title="Добавить товар" className="badge-el"><PlusSquare /> </Link>

				<Link to="/catalog" title="Каталог">
					<Folder2 />
				</Link>
				<Link to="/favorites" title="Избранное" className="badge-el">
					<Star />
					<span className="badge-item">{likeCnt}</span>
				</Link>
				<Link to="/basket" title="Корзина" className="badge-el">
					<Cart4 />
					<span className="badge-item">{cartCnt}</span>
				</Link>
				<Link to="/profile" title="Профиль">
					<PersonSquare />
				</Link>

			</>}
			{!user && <a href="" onClick={logIn} title="Войти">
				<BoxArrowInRight />
			</a>}
		</nav>
	</header>
}

export default Header;