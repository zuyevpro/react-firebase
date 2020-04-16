import React from 'react';
import {Form, Modal, Button, FormGroup} from "react-bootstrap";
import firebase from "../../firebase";
//хорошо бы чтобы путь был не такой относительный

class BookEdit extends React.Component
{

	constructor() {
		super();
		this.state = {
			title: 'Добавление',
			author: '',
			name: '',
			id: '',
			show: false
		};

		this.getFormData = this.getFormData.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.close = this.close.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		//у нас широко распространена деструктуризация -
		//const = { id, name, author } = this.props;
		this.setState({
			id: this.props.id,
			name: this.props.name,
			author: this.props.author
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.id !== this.props.id) {
      const {id, author, name} = this.props;
      let title;
			if (id !== '') {
				title = 'Редактирование';
			}
			else {
				title = 'Добавление';
			}

			this.setState({author, name, id, title});
		}
	}

	getFormData() {
		return {
			id: this.state.id,
			name: this.state.name,
			author: this.state.author
		};
	}

	submitForm() {
		const data = this.getFormData();

		if (data.name.length > 0 && data.author.length > 0) {
			const db = firebase.firestore().collection("books");

			if (data.id.length > 0) {
				db.doc(data.id).set(data).then(() => {
					this.props.onUpdate(data);
					this.close();
				});
				//TODO: catch error!
			}
			else {
				const id = this.generateId(24);
				db.doc(id).set(data).then(() => {
					data['id'] = id;
					//а зачем так делать? почему не так - data.id = id; ?
					this.props.onCreate(data);
					this.close();
				});
			}
		}
		else {
			//TODO: show errors!
		}
	}

	close() {
		this.props.onClose();
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	generateId(length) {
		var result           = '';//ну ты извращенец)
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	render() {

		return (
			<Modal show={this.props.show} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>{this.state.title}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<FormGroup>
							<Form.Label>Название книги</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={this.state.name}
								onChange={this.handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Form.Label>Автор</Form.Label>
							<Form.Control
								type="text"
								name="author"
								value={this.state.author}
								onChange={this.handleChange}
							/>
						</FormGroup>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={this.close}>Закрыть</Button>
					<Button variant="primary" onClick={this.submitForm}>Сохранить</Button>
				</Modal.Footer>
			</Modal>
		);
	};
}

export default BookEdit;