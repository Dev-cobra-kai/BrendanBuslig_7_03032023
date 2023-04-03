import * as React from 'react';
import {Navigate, Link} from 'react-router-dom';

class DeletePost extends React.Component {
    state = { navigation: false };

    constructor (props) {
        super(props)
        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        
        this.state = {
            userId: userConnect.userId,
            isAdmin: userConnect.userAdmin
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault()

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  storage.token;
      
        const requestOptions = {
            method: 'delete',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(this.state)
        };

        let postPage = JSON.parse(localStorage.getItem('postPage'));
        let postId = postPage.id

        fetch(('http://localhost:4000/api/posts/' + postId), requestOptions)
                .then(response => response.json())
                .then(
                    (response) => {
                        if (response.error) { 
                            this.setState({ navigation: true })
                            alert("Votre post n'a pas pu être supprimé."); 
                        } else { 
                            this.setState({ navigation: true })
                            alert("Votre post à bien été supprimé !");
                            
                        }
                    }
                )
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('Il y a eu une erreur !', error);
                }
            );
    }

    render () {
        const { navigation } = this.state;
        if (navigation) {
            return <Navigate to='/posts' />;
        }

        return <React.Fragment>
            <div className="container">
                <h1>Souhaitez vous vraiment supprimer ce post ?</h1>
                <div className="form-submit">
                    <Link to={'/posts/'} className="btn btn-outline-info btn-sm">Retour aux posts</Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={this.handleSubmit}>Supprimer ce post</button>
                </div>
            </div>
        </React.Fragment>
    };
};

export default DeletePost;