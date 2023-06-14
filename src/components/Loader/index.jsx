import { ArrowClockwise } from "react-bootstrap-icons";
// import { useState, useEffect } from "react";
import "./style.css"

const Loader = () => {
	return <div className="loader">
		<span className="loader-img">
			<ArrowClockwise/>
		</span>
		<h6>Данные загружаются</h6>
		</div>
}

export default Loader