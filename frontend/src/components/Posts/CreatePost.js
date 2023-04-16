// LA PAGE CREER UN POST

import * as React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Field from '../Form/Field';
import Form from 'react-bootstrap/Form'

class CreatePost extends React.Component {

    state = { navigate: false };
    constructor(props) {
        super(props)
        const userConnect = JSON.parse(localStorage.getItem('userConnect'));

        this.state = {
            userId: userConnect.userId,
            isAdmin: userConnect.userAdmin,
            title: undefined || '',
            content: undefined || '',
            postUrl: undefined || '',
            navigate: false
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
        // this.setState({
        //     postUrl:e.target.files[0]
        // })
    }

    handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData();
        const imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append('image', imagedata);

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        // const postId = storage.postId;
        let token = "Bearer " + storage.token;

        const requestOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify(this.state)
        };

        fetch('http://localhost:4000/api/posts/', requestOptions, formData)
            .then(response => response.json())
            .then(
                (response) => {
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
            console.log(imagedata);
    }

    render() {
        const { navigate } = this.state;
        if (navigate) {
            return <Navigate to='/posts' />;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Publiez un post</h1>
                <form onSubmit={this.handleSubmit} className="w-50 m-auto">
                    <Field name="title" value={this.state.title} onChange={this.handleChange}>Titre</Field>
                    <Form.Group controlId="exampleForm.ControlTextarea1" >
                        <Form.Label>Contenu du post</Form.Label>
                        <Form.Control as="textarea" rows={8} name="content" value={this.state.content} onChange={this.handleChange} />
                    </Form.Group>
                    <div className="update-image" name="postUrl" value={this.state.postUrl} onChange={this.handleChange} >
                        <input className="form-control" type="file" name="postUrl" onChange={this.handleChange}/>
                    </div>
                    {/* <Field name="postUrl" value={this.state.postUrl} onChange={this.handleChange}>URL d'un post</Field> */}
                    <div className="form-submit">
                        <button className="btn btn-outline-success btn-sm" type="Submit" onClick={this.handleSubmit}>Publiez le post</button>
                        <Link to='/posts' className="btn btn-outline-info btn-sm">Retour aux posts</Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    };
};

export default CreatePost;