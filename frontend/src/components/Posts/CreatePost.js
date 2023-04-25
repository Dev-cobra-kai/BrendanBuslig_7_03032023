// LA PAGE CREER UN POST

import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Field from '../Form/Field';
import Form from 'react-bootstrap/Form'


class CreatePost extends React.Component {

    state = { navigate: false };
    constructor(props) {

        const storage = JSON.parse(localStorage.getItem('userConnect'));

        super(props)
        this.state = {
            userId: storage.userId,
            isAdmin: storage.userAdmin,
            title: undefined || '',
            content: undefined || '',
            imageUrl: undefined || ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    handleImage = (e) => {
        e.preventDefault();
        const imagedata = document.querySelector('input[type="file"]').files[0]
        this.setState({
            imageUrl: imagedata
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', this.state.userId);
        formData.append('isAdmin', this.state.isAdmin);
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('imageUrl', this.state.imageUrl);

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " + storage.token;

        fetch("http://localhost:4000/api/posts/",
            {
                method: 'post',
                headers: {
                    "Authorization": token
                },
                body: formData
            })
            .then(response => response.json())
            .then((response) => {
                if (response.error) {
                    alert("Votre post n'a pas pu être publié : " + response.error);
                } else {
                    this.setState({ navigate: true })
                    alert("Votre post à bien été publié !")
                }
            })
            .catch(error => {
                this.setState({ Erreur: error.toString() });
                console.error('Il y a eu une erreur !', error);
            });
        console.log(formData);
    };

    render() {
        const { navigate } = this.state;
        if (navigate) {
            return <Navigate to={'/posts/'} />;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Publiez un post</h1>
                <Form onSubmit={this.handleSubmit} className="w-50 m-auto">
                    <Field name="title" value={this.state.title} onChange={this.handleChange}>Titre</Field>
                    <Form.Group controlId="exampleForm.ControlTextarea1" >
                        <Form.Label>Contenu du post</Form.Label>
                        <Form.Control as="textarea" rows={8} name="content" value={this.state.content} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label>Ajouter une image :</Form.Label>
                        <Form.Control type="file" name="imageUrl" onChange={this.handleImage} />
                    </Form.Group>
                    <div className="form-submit">
                        <button className="btn btn-outline-success btn-sm" type="Submit" onClick={this.handleSubmit}>Publiez le post</button>
                        <Link to='/posts' className="btn btn-outline-info btn-sm">Retour aux posts</Link>
                    </div>
                </Form>
            </div>
        </React.Fragment>
    };
};

export default CreatePost;


