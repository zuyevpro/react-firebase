import React from "react";
import BookRow from "../BookRow";
import {Table} from "react-bootstrap";

class BooksList extends React.Component
{
	render() {
		const rows = this.props.data.map((row) => <BookRow key={row._id} name={row.name} author={row.author} />);
		return (
			<Table bordered striped hover variant="light">
				<thead>
					<tr>
						<th>Название книги</th>
						<th>Автор</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		);
	}
}

export default BooksList;