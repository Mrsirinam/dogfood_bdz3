import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap"

import Ctx from "../context"

const Basket = () => {
	const { basket, setBasket } = useContext(Ctx)
	const { goods, setGoods } = useContext(Ctx)

	const setPrice = ({ price, cnt, discount }) => {
		return price * cnt * (1 - discount / 100)
	}
	const sum = basket.reduce((acc, el) => {
		return acc + el.cnt * el.price
	}, 0)
	const sale = basket.reduce((acc, el) => {
		return acc + el.cnt * el.price * (1 - el.discount / 100)
	}, 0)

	// const [goods, setGoods] = useState([]);

	const inc = (id) => {
		setBasket(prev => prev.map(el => {
			if (el.id === id) {
				el.cnt++;
			}
			return el;
		}))
	}
	const dec = (id, cnt) => {
		if (cnt === 1) {
			setBasket(prev => prev.filter(el => el.id !== id))
		} else {
			setBasket(prev => prev.map(el => {
				if (el.id === id) {
					el.cnt--;
				}
				return el;
			}))
		}
	}


	return <>
		<h1>Корзина</h1>
		{basket.length > 0 && goods.length > 0 && <Table hover>


			<thead style={{ textAlign: 'left' }}>
				<tr>
					<td style={{ textAlign: 'left' }}>Изображение</td>
					<td>Название</td>
					<td>Количество</td>
					<td>Цена</td>
					<td>Скидка</td>
					<td>Цена со скидкой</td>
				</tr>
			</thead>
			<tbody>
				{basket.map(el => <tr key={el.id}>
					<td style={{ textAlign: 'left' }}>
						<img src={el.img} alt={el.name} height="50" />
					</td>
					<td><Link to={`/product/${el.id}`}>{el.name}</Link></td>
					<td>
						<button onClick={() => dec(el.id, el.cnt)}>-</button>
						<span style={{ padding: "0 10px" }}>{el.cnt}</span>
						<button onClick={() => inc(el.id)}>+</button>
					</td>
					<td>{el.price * el.cnt}&nbsp;₽ </td>
					<td>{el.discount > 0 && `${el.discount}%`}</td>
					<td>{el.discount > 0 && <>{setPrice(el).toFixed(2)}&nbsp;₽</>}</td>

				</tr>)}
			</tbody>
			<tfoot >
				<tr>
					<td colSpan={3}>Итоговая сумма:</td>
					<td colSpan={3}>{sale.toFixed(2)} ₽<del>{sum}  ₽</del></td>				</tr>
			</tfoot>
		</Table>}
	</>
}

export default Basket;
// style={{ background: '#dfa0a6' }} 