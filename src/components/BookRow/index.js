import React from "react";
import style from './style.css';
import firebase from "../../firebase";

class BookRow extends React.Component
{

	constructor() {
		super();
		this.state = {
			id: '',
			name: '',
			author: ''
		};

		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
	}

	componentDidMount() {
		this.setState({
			id: this.props.id,
			name: this.props.name,
			author: this.props.author
		});
	}

	remove() {
		firebase.firestore().collection("books").doc(this.state.id).delete().then(() => {
			this.props.onDelete(this.state.id);
		});
	}

	edit() {
		this.props.onEditCall(this.state);
	}

	render() {
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.author}</td>
				<td>
					<span className="link book__edit" onClick={this.edit}>Изменить</span>&nbsp;
					<span className="link book__remove" onClick={this.remove}>Удалить</span>
				</td>
			</tr>
		);
	}
}

export default BookRow;