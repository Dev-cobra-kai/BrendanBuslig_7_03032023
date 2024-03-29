// LA PAGE MODIFIER UN USER

import * as React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Field from '../Form/Field';
import Form from 'react-bootstrap/Form'


class UpdateAccount extends React.Component {

    state = { navigate: false };

    constructor(props) {
        super(props)
        const userAccount = JSON.parse(localStorage.getItem('userAccount'));
        const userConnect = JSON.parse(localStorage.getItem('userConnect'));

        this.state = {
            userId: userConnect.userId,
            isAdmin: userConnect.userAdmin,
            firstname: userAccount.firstname,
            lastname: userAccount.lastname,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        const userId = storage.userId
        let token = "Bearer " + storage.token;

        const requestOptions = {
            method: 'put',
            headers: {
                "Content-type": 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        };

        fetch(('http://localhost:4000/api/users/' + userId), requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.error) {
                    alert("Votre compte n'a pas pu être modifié : " + response.error)
                } else {
                    this.setState({ navigate: true })
                }
            })
            .catch(error => {
                this.setState({ Erreur: error.toString() });
                console.error('Il y a eu une erreur !', error);
            });
    }

    render() {
        const userAccount = JSON.parse(localStorage.getItem('userAccount'));
        const userId = userAccount.id;

        const { navigate } = this.state;

        if (navigate) {
            return <Navigate to={'/user/' + userId} />;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Modifiez votre profil</h1>
                <form>
                    <Field name="firstname" value={this.state.firstname} onChange={this.handleChange}>Prénom</Field>
                    <Field name="lastname" value={this.state.lastname} onChange={this.handleChange}>Nom</Field>
                    <Form.Group controlId="exampleForm.ControlTextarea1" ></Form.Group>
                    <div className="form-submit">
                        <button className="btn btn-outline-success btn-sm" onClick={this.handleSubmit}>Enregistrer les modifications</button>
                        <Link to={'/user/' + userId} className="btn btn-outline-info btn-sm">Retour à mon compte</Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    };
};

export default UpdateAccount;