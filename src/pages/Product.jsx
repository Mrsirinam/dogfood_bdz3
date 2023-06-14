import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { TrashFill } from "react-bootstrap-icons";
import Ctx from "../context";
import { Col, Row, Button, Image, ButtonGroup, Alert, Badge, Table } from "react-bootstrap";
import { ChevronLeft, Plus, Dash, Heart, HeartFill, Truck, Award } from "react-bootstrap-icons";

import Loader from "../components/Loader";

const Product = () => {
	const [product, setProduct] = useState({});
	const [cnt, setCnt] = useState(1);

	const { id } = useParams();
	const navigate = useNavigate();
	const { userId, setServerGoods, api, setBasket } = useContext(Ctx);

	useEffect(() => {
		api.getSingleProduct(id)
			.then(data => {
				if (!data.err) {
					console.log(data);
					setProduct(data);
				}
			})
	}, []);

	/*
			product?.name
			~
			product && product.name
	*/

	const del = () => {
		api.delProduct(id)
			.then(data => {
				console.log(data);
				setServerGoods(prev => prev.filter(el => el._id !== id))
				navigate("/catalog")
			})
	}

	const move = (e) => {
		e.preventDefault();
		navigate("/catalog");
	}

	const addToCart = () => {
		// в качестве аргумента можно передать что это будет +1 или -1
		setBasket(prev => {
			let inBasket = prev.filter(el => el.id === id);
			// если товар уже есть в корзине
			if (inBasket.length) {
				return prev.map(el => {
					if (el.id === id) {
						// тут можно проверять нажатие кнопочек + и -
						el.cnt = cnt
					}
					return el;
				})
			} else {
				// если товара еще нет в корзине
				return [...prev, {
					id: id,
					cnt: cnt,
					name: product.name,
					img: product.pictures,
					price: product.price,
					discount: product.discount
				}]
			}
		})
	}

	return (
		<Row className="my-4">
			<Col xs={12}>
				<a href="" onClick={move} className="text-decoration-none text-secondary text-small"><ChevronLeft /> Назад</a>
			</Col>
			<Col xs={12} >
				{product.name && <h1 style={{ padding: "20px 0" }}>{product.name}</h1>}
			</Col>

			<Col xs={12} sm={5} style={{ position: 'relative' }}>
				{product.discount > 0 && <Badge bg="danger" style={{ position: 'absolute', top: 0 }}>{product.discount}%</Badge>}
				{product.pictures && <Image src={product.pictures} alt="pic" fluid style={{ width: '300px' }} />}
			</Col>
			<Col xs={12} sm={1} />
			<Col xs={12} sm={6}>
				{product.discount ?
					<>
						{product.price &&
							<>
								<div><del><small >{product.price} ₽</small></del></div>
								<div><strong className="text-danger">{product.price * (100 - product.discount) / 100} ₽</strong></div>
							</>
						}
					</> :
					<>
						{product.price && <div><strong>{product.price} ₽</strong></div>}
					</>
				}
				<Row className="gx-5 my-3">
					<Col xs={4}>
						<ButtonGroup>
							<Button variant="outline-secondary" disabled={cnt === 0} onClick={() => { setCnt(cnt - 1) }}><Dash /></Button>
							<Button variant="secondary" style={{ backgroundColor: "#dfa0a6", color: "#000" }}>{cnt}</Button>
							<Button variant="outline-secondary" onClick={() => { setCnt(cnt + 1) }}><Plus /></Button>
						</ButtonGroup>
					</Col>
					<Col xs={8}>
						<Button
							variant="btn-outline-light"
							className="w-100"
							style={{ backgroundColor: "#dfa0a6" }}
							onClick={addToCart}>В корзину</Button>
					</Col>
				</Row>
				<div className="text-secondary"><Heart /> В избранное</div>
				<Alert variant="secondary" className="my-2" style={{ backgroundColor: "#b5ccdc" }} >
					<Row>
						<Col xs={2} style={{ fontSize: "2em" }}><Truck /></Col>
						<Col xs={10}>
							<h6 className="fw-bold">Доставка по всему Миру!</h6>
							<p className="mt-3">Доставка курьером - <strong>от 399 ₽</strong></p>
							<p className="mb-0">Доставка в пункт выдачи - <strong>от 199 ₽</strong></p>
						</Col>
					</Row>
				</Alert>
				<Alert variant="secondary" style={{ backgroundColor: "#b5ccdc" }}>
					<Row>
						<Col xs={2} style={{ fontSize: "2em" }}><Award /></Col>
						<Col xs={10}>
							<h6 className="fw-bold">Гарантия качества</h6>
							<p className="mt-3 mb-0">Если Вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды</p>
						</Col>
					</Row>
				</Alert>
				{userId === product.author?._id ? (
					<Alert variant="secondary" className="my-2" style={{ backgroundColor: "#b5ccdc" }} >
						<Row className="d-flex justify-content-center justify-content-md-start" >
							<Col xs={2} style={{ fontSize: "2em" }}>					{userId === product.author?._id && <Button variant="link" onClick={del} style={{ color: "crimson", textDecoration: 'none' }}><TrashFill />&nbsp;Удалить</Button>}
							</Col>

						</Row>
					</Alert>
				) : null}
			</Col>

			<Col xs={12} style={{ padding: "20px 0" }}>
				<h3 style={{ padding: "20px 0" }}>Описание</h3>
				{product.description && <p>{product.description}</p>}
			</Col>
			<Col xs={12} style={{ padding: "20px 0" }}>
				<h3 style={{ padding: "20px 0" }}>Характеристики</h3>
				<Table>
					<tbody>
						{product.wight && <tr>
							<th>Вес</th>
							<td>{product.wight}</td>
						</tr>}
						{product.price && <tr>
							<th>Цена</th>
							<td>{product.price} / 100 г</td>
						</tr>}
						{product.description && <tr>
							<th>Польза</th>
							<td>{product.description}</td>
						</tr>}
					</tbody>
				</Table>
			</Col>


			<Col xs={12} style={{ padding: "20px 0" }}>
				<h3>Отзывы</h3>
				{product.reviews && product.reviews.map(el => <div className="my-4" key={el._id}>
					{el.rating && <h5>{"★".repeat(el.rating)}{"☆".repeat(5 - el.rating)}</h5>}
					{el.text && <p className="my-2">{el.text}</p>}
					<div className="text-secondary text-small">{new Date(el.created_at).toLocaleString()}</div>
				</div>)}
			</Col>


			{/* {product.name
				? <>
					{userId === product.author._id && <button style={{ justifySelf: "flex-end" }} onClick={del}><Trash /></button>}
					<h1>{product.name}</h1>

					<img src={product.pictures} alt={product.name} height="200" />
					<mark>{product.price}₽</mark>
				</>
				: <Loader />
			} */}
			{/* <h1>
            {product.name ? product.name : "Страница одного товара"}
        </h1>
        {product.pictures && <img src={product.pictures} alt={product.name} />}
        {product.price && <mark>{product.price}₽</mark>} */}
		</Row>
	);
}

export default Product;