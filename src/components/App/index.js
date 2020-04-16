import React from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../../firebase";
import BooksList from "../BooksList";

class App extends React.Component
{
	constructor() {
		super();
		//Классовые компоненты всегда должны вызывать базовый конструктор с аргументом props.
		//https://ru.reactjs.org/docs/state-and-lifecycle.html
		this.state = {
			title: "Мои книги",
			books: []
		};

		this.refresh = this.refresh.bind(this);
		//я обычно здесь не привязываю, а пишу просто сразу чтобы нормально было
		//refresh = () => {}

	}

	componentDidMount() {
		const db = firebase.firestore().collection("books");
		db.get().then(row => {
			let books = [];
			//я бы сделала без этой переменной - например через reduce
			row.docs.map(item => {
				let obj = item.data();
				obj['_id'] = item.id;
				books.push(obj);
			});
			//если не используется то, что возвращает map, я бы использовала forEach
			//хотя тут похоже можно было бы как раз записать результат в переменную и обойтись без push и без reduce

			this.setState({
				books: books
			});
		});
	}

	refresh(data) {
		//у нас принято писать методы в порядке срабатывания в жизненном цикле, потом все остальные
		this.setState({
			books: data
		});
	}

	render() {
		return (
			<div className="container">
				<h1>{this.state.title}</h1>
				<BooksList data={this.state.books} onRefresh={this.refresh}/>
			</div>
		);
	}
}

export default App;