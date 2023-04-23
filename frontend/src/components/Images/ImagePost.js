import React from 'react';
import { Navigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class ImagePost extends React.Component {

    state = { navigate: false }
    constructor(props) {
        const storage = JSON.parse(localStorage.getItem('userConnect'));

        super(props)
        this.state = {
            userId: storage.userId,
            isAdmin: storage.userAdmin,
            imageUrl: undefined || '',
            navigate: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        const imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append('image', imagedata);

        const storage = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " + storage.token;

        fetch("http://localhost:4000/api/posts/",
            {
                method: 'post',
                headers: { "Authorization": token },
                body: formData
            })
            .then((res) => {
                this.setState({ navigate: true })
                if (res.ok) {
                    alert("Votre image à bien été ajoutée !");
                } else if (res.status === 401) {
                    alert("Une erreur s'est produite, retentez ! ");
                }
            }, function (e) {
                alert("Une erreur s'est produite : " + e);
            });
    }

    render() {

        const { navigate } = this.state;
        if (navigate) {
            return <Navigate to={'/posts/'} />;
        }

        return <div className="container">
            <h1>Ajouter une image</h1>
            <div className="update-image">
                <form className="addPhotoForm" onSubmit={this.handleSubmit}>
                    <input className="form-control" type="file" name="imageUrl" />
                    <Button color="success" type="Submit">Ajouter image</Button>
                </form>
            </div>
        </div>
    }
}

export default ImagePost;