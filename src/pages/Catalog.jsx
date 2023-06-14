import { useState, useContext, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";

import Card from "../components/Card";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";

import Ctx from "../context"

const Catalog = ({ setServerGoods }) => {
	const { goods, text } = useContext(Ctx)
	const paginate = usePagination(goods, 20)
	const [sort, setSort] = useState(null);
	const filtersSt = {
		gridColumnEnd: "span 4",
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: "10px",
	};

	useEffect(() => {
		paginate.step(1);
	}, [text])

	const sortHandler = (vector) => {
		if (vector === sort) {
			setSort(null);
			// setServerGoods((old) => [...old]);
			goods.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

		} else {
			setSort(vector);
			goods.sort((a, b) => {
				return vector === "up" ? a.price - b.price : b.price - a.price;
			});
		}
	};

	return (
		<div className="container">

			<div style={{ gridColumnEnd: "span 4" }}><Pagination hk={paginate} /></div>
			<div style={filtersSt}>
				{/* сортировка по числу price */}
				<button
					style={{ backgroundColor: sort === "up" ? "orange" : "white" }}
					onClick={() => sortHandler("up")}
				>По возрастанию цены
				</button>
				<button
					style={{ backgroundColor: sort === "down" ? "orange" : "white" }}
					onClick={() => sortHandler("down")}
				>По убыванию цены
				</button>
				{/* фильтрация */}
				<button>Новинки</button>
				<button>Скидки</button>
			</div>

			{paginate.setDataPerPage().map((g) => (
				<Card
					key={g._id}
					{...g}
					img={g.pictures}
					setServerGoods={setServerGoods}
				/>
			))}
			{/* //id из бд приходит с нижним подчеркиванием */}
		</div>
	);
};

export default Catalog;
