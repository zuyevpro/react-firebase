import React from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../../firebase";
import BooksList from "../BooksList";

class App extends React.Component
{
	constructor() {
		super();

		this.state = {
			title: "Мои книги",
			books: []
		};

		this.refresh = this.refresh.bind(this);
	}

	componentDidMount() {
		const db = firebase.firestore().collection("books");
		db.get().then(row => {
			let books = [];
			row.docs.map(item => {
				let obj = item.data();
				obj['_id'] = item.id;
				books.push(obj);
			});

			this.setState({
				books: books
			});
		});
	}

	refresh(data) {
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