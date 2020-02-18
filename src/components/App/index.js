import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "../../firebase";
import BooksList from "../BooksList";
import {Table} from "react-bootstrap";


class App extends React.Component
{
	constructor() {
		super();

		this.state = {
			title: "Мои книги",
			books: []
		};
	}

	componentDidMount() {
		console.log('componentDidMount');
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

	render() {
		return (
			<div className="container">
				<h1>{this.state.title}</h1>
				<BooksList data={this.state.books}/>
			</div>
		);
	}
}

export default App;