import * as React from 'react';
import { Navigate, Link } from 'react-router-dom';

class DeleteComment extends React.Component {
    state = { navigate: false };

    constructor(props) {
        super(props)

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));

        this.state = {
            userId: userConnect.userId,
            isAdmin: userConnect.userAdmin
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault()

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " + userConnect.token;

        const requestOptions = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        };

        const commentId = this.props.match.params.id;

        fetch(('http://localhost:4000/api/comments/' + commentId), requestOptions)
            .then(response => response.json())
            .then((response) => {
                if (response.error) {
                    this.setState({ navigate: true })
                    alert("Ce commentaire n'a pas pu être supprimé.");
                } else {
                    this.setState({ navigate: true })
                    alert("Commentaire supprimé !")
                }
            })
            .catch(error => {
                this.setState({ Erreur: error.toString() });
                console.error('Il y a eu une erreur !', error);
            });
    }

    render() {
        const postPage = JSON.parse(localStorage.getItem('postPage'));
        const postId = postPage.id;

        const { navigate } = this.state;
        if (navigate) {
            return <Navigate to={'/post/' + postId} />;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Souhaitez vous vraiment supprimer ce commentaire ?</h1>
                <div className="form-submit">
                    <Link to={'/posts/'} className="btn btn-outline-info btn-sm">Retour aux posts</Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={this.handleSubmit}>Supprimer ce commentaire</button>
                </div>
            </div>
        </React.Fragment>
    };
};

export default DeleteComment;