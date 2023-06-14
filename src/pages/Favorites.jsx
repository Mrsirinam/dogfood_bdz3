import Card from "../components/Card"

const Favorites = ({goods, userId, setServerGoods}) => {
	return <div className="container">
		{goods.filter(el => el.likes.includes
		(userId)).map(g => <Card 
				{...g} //передаем все свойства goods
				key={g._id}
				img={g.pictures}
				setServerGoods={setServerGoods}
			 />)}
	</div>

}

export default Favorites;