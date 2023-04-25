// LA PAGE MODIFIER UN POST

import * as React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Field from '../Form/Field';
import Form from 'react-bootstrap/Form'


class UpdatePost extends React.Component {

    state = { navigate: false }

    constructor(props) {
        const postPage = JSON.parse(localStorage.getItem('postPage'));
        const storage = JSON.parse(localStorage.getItem('userConnect'));

        super(props)
        this.state = {
            userId: storage.userId,
            isAdmin: storage.userAdmin,
            title: postPage.title,
            content: postPage.content,
            imageUrl: postPage.imageUrl,

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
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('imageUrl', this.state.imageUrl);

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let postPage = JSON.parse(localStorage.getItem('postPage'));
        let postId = postPage.id;
        let token = "Bearer " + storage.token;

        fetch('http://localhost:4000/api/posts/' + postId,
            {
                method: 'put',
                headers: { "Authorization": token },
                body: formData
            })
            .then(response => response.json())
            .then((response) => {
                if (response.error) {
                    alert("Erreur : " + response.error);
                } else {
                    this.setState({ navigate: true })
                    alert("Votre post à bien été modifié !")
                }
            })
            .catch(error => {
                this.setState({ Erreur: error.toString() });
                console.error('Il y a eu une erreur !', error);
            });
    }

    render() {

        const { navigate } = this.state;
        if (navigate) {
            return <Navigate to={'/posts/'} />;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Modifier ce post</h1>
                <form>
                    <Field name="title" value={this.state.title} onChange={this.handleChange}>Titre</Field>
                    <Form.Group controlId="exampleForm.ControlTextarea1" >
                        <Form.Label>Contenu du post</Form.Label>
                        <Form.Control as="textarea" rows={8} name="content" value={this.state.content} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label>Modifier image :</Form.Label>
                        <Form.Control type="file" name="imageUrl" onChange={this.handleImage} />
                    </Form.Group>
                    <div className="form-submit">
                        <button className="btn btn-outline-success btn-sm" type="Submit" onClick={this.handleSubmit}>Enregistrer les modifications</button>
                        <Link to='/posts/' className="btn btn-outline-info btn-sm">Retour aux posts</Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    };
};

export default UpdatePost;