import * as React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Field from '../Form/Field';
import Form from 'react-bootstrap/Form'


class UpdatePost extends React.Component {

    state = { navigate: false };

    constructor(props) {
        super(props)
        const postPage = JSON.parse(localStorage.getItem('postPage'));
        const storage = JSON.parse(localStorage.getItem('userConnect'));

        this.state = {
            userId: storage.userId,
            isAdmin: storage.userAdmin,
            title: postPage.title,
            content: postPage.content,
            postUrl: postPage.postUrl
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
        let token = "Bearer " + storage.token;
        const requestOptions = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        };

        let postPage = JSON.parse(localStorage.getItem('postPage'));
        let postId = postPage.id;

        fetch(('http://localhost:4000/api/posts/' + postId), requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.error) {
                    alert("Erreur : " + response.error);
                } else {
                    this.setState({ navigate: true })
                    alert("Votre post à bien été modifié !")
                }
            }
            )
            .catch(error => {
                this.setState({ Erreur: error.toString() });
                console.error('Il y a eu une erreur !', error);
            });
    }
  
    render() {

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        const userId = storage.userId;

        const { navigate } = this.state;
        // const { id } = useParams();
        // const postId = id;
        
        if (navigate) {
            return <Navigate to={'/user/' + userId} />;
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
                    <Field name="postUrl" value={this.state.postUrl} onChange={this.handleChange}>Partagez un lien de post</Field>
                    <div className="form-submit">
                        <button className="btn btn-outline-success btn-sm" onClick={this.handleSubmit}>Enregistrer les modifications</button>
                        <Link to='/posts/' className="btn btn-outline-info btn-sm">Retour aux posts</Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    };
};

export default UpdatePost;