import React from "react";
import BookRow from "../BookRow";
import BookEdit from "../BookEdit";
import {Button, Table} from "react-bootstrap";

class BooksList extends React.Component
{
	constructor() {
		super();
		this.state = {
			showEdit: false,
			id: '', // for edit
			name: '', // for edit
			author: '' // for edit
		};

		this.showEdit = this.showEdit.bind(this);
		this.hideEdit = this.hideEdit.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	showEdit(data) {
		if (!!data && data.constructor.name === 'Object') {
			data['showEdit'] = true;
		}
		else {
			data = {
				showEdit: true,
				id: '',
				name: '',
				author: ''
			};
		}

		this.setState(data);
	}

	hideEdit() {
		this.setState({
			showEdit: false
		});
	}

	onUpdate(data) {
		this.props.onRefresh(this.props.data.map(item => {
			if (item.id === data.id) {
				data['_id'] = data['id'];
				return data;
			}

			return item;
		}));
	}

	onCreate(data) {
		data['_id'] = data['id'];
		let newData = JSON.parse(JSON.stringify(this.props.data));
		newData.push(data);

		this.props.onRefresh(newData);
	}

	onDelete(id) {
		this.props.onRefresh(this.props.data.filter(item => {
			return item._id !== id;
		}));
	}

	render() {
		const rows = this.props.data.map((row) =>
			<BookRow
				key={row._id}
				id={row._id}
				name={row.name}
				author={row.author}
				onEditCall={this.showEdit}
				onDelete={this.onDelete}
			/>);

		return (
			<div className="books">
				<Table striped bordered hover variant="light">
					<thead>
					<tr>
						<th>Название книги</th>
						<th>Автор</th>
						<th>&nbsp;</th>
					</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
				<div className="books__actions">
					<Button
						onClick={this.showEdit}
					>Добавить</Button>
				</div>
				<BookEdit
					show={this.state.showEdit}
					id={this.state.id}
					name={this.state.name}
					author={this.state.author}
					onClose={this.hideEdit}
					onCreate={this.onCreate}
					onUpdate={this.onUpdate}
				/>
			</div>
		);
	}
}

export default BooksList;