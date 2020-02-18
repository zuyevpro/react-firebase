import React from "react";
import style from './style.css';

class BookRow extends React.Component
{
	remove() {
		// thus.props.id
	}

	render() {
		console.log(style);
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.author}</td>
				<td>
					<span className={style.book__remove} onClick={this.remove()}>Удалить</span>
				</td>
			</tr>
		);
	}
}

export default BookRow;