import { useState, useEffect, useContext } from "react";
import Ctx from "../../context"

import "./style.css"

//arr -список товаров из json-файла
const Search = ({ arr }) => {
	// let text = "Corn";
	const { setGoods, text, setText } = useContext(Ctx)
	// const [text, setText] = useState("");
	const [quantity, setQuantity] = useState(arr.length);

	/*
	useState = то, чо создает пару из переменной и функции, которая ее изменяет

	Единственный аргумент useState - значение по умолчанию
	*/
	// const [count, updateCount] = useState(0);
	useEffect(() => {
		if (text) {
			let result = arr.filter(el => new RegExp(text, "i").test(el.name))
			setGoods(result);
			setQuantity(result.length);
		} else {
			setGoods(arr);
			setQuantity(arr.length)
		}
	}, [arr]);
	let n = 1;
	const click = () => { }
	const searchByText = (e) => {
		// e.target - обращение к тегу, на котором висит событие
		let val = e.target.value;
		setText(val);
		let result = arr.filter(el => el.name.toLowerCase().includes(val.toLowerCase()))
		//тоже самое с регуляркой
		// let result = arr.filter(el => new RegExp(val, "i".test(el.name))
		setGoods(result)
		setQuantity(result.length)
		console.log(result);
	}

	// вызывая функцию updateCount, мы говорим приложению, что при следующем монтаже его параметр count будет равен новому значению
	// updateCount(count+1); //новое состояние

	return (
		<div className="search-block">
			<input type="search" value={text}
				onChange={searchByText} />
			<button onClick={click}>Найти</button>
			<hr />
			{/* <div>{text}, {n}, {count}</div> */}
			<div>По вашему запросу «{text}» найдено {quantity} подходящих товаров</div>
		</div>
	)
}

export default Search;


/*
Жизненный цикл компонента
Рендеринг 
		render
Монтировка (монтаж приложения)
			componentWillMount
			componentDidMount
Размонтировка
			componentWillUnMount
			componentDidUnMount
			componentWillUpdate
			componentDidUpdate

	
	*/
