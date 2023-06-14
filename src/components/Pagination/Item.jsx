import {
	ChevronDoubleLeft,
	ChevronLeft,
	ChevronDoubleRight,
	ChevronRight,
} from "react-bootstrap-icons";

const Item = ({
	val,
	start = false,
	end = false,
	next = false,
	prev = false,
	active = false,
	onClick
}) => {
	let result;
	switch (true) {
		case start: result = <ChevronDoubleLeft />; break;
		case end: result = <ChevronDoubleRight />; break;
		case next: result = <ChevronRight />; break;
		case prev: result = <ChevronLeft />; break;
		default: result = val;
	}
	return <div className={active ? "pagination__item active" : "pagination__item"} onClick={onClick}>
		{result}
	</div>
}

export default Item;