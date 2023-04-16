import React, { useState, useCallback } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';


function DeleteUserAccount() {
    const [navigate, setNavigate] = useState(false);
    const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " + storage.token;
    const { id } = useParams();
    let userId = id;

    const handleSubmit = useCallback(function (value) {

        fetch(('http://localhost:4000/api/users/' + userId), {
            method: "delete",
            headers:
            {
                "Content-type": 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: value.id,
                userId: storage.userId,
                isAdmin: storage.userAdmin
            })
        })
            .then(res => res.json())
            .then(
                (res) => {
                    if (res.error) {
                        alert("Ce compte n'a pas pu être supprimé.");
                    } else {
                        alert("Compte supprimé !");
                        setNavigate(true);
                    }
                }
            )
            .catch(error => {
                this.setState({ Erreur: error.toString() });
                alert("Ce compte n'a pas pu être supprimé !");
                console.error('Il y a eu une erreur !', error);
            })
    }, [userId, storage.userAdmin, storage.userId, token])

    return (
        <React.Fragment>
            {navigate ? <Navigate to="/posts/" /> : null}
            <div className="container">
                <h1>Souhaitez vous vraiment supprimer ce compte ?</h1>
                <div className="form-submit">
                    <Link to={'/user/' + userId} className="btn btn-outline-info btn-sm">Retour au compte utilisateur</Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={handleSubmit}>Supprimer ce compte</button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DeleteUserAccount;