import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import img from '../../images/icon.png';
import { useParams } from 'react-router-dom';

const UsersPage = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState([]);
    const [posts, setPost] = useState([]);
    const navigate = useNavigate();

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " +  storage.token;
    const { id } = useParams();
    let userId = id;

    useEffect(() => {
      fetch("http://localhost:4000/api/users/" + userId,
        {headers: 
            {"Authorization" : token}
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setUser(result);
                localStorage.setItem('userAccount', JSON.stringify(result));
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [userId, token])

    useEffect(() => {
        fetch("http://localhost:4000/api/users/" + userId + "/posts/" ,
            {headers: 
                {"Authorization" : token},
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPost(result.data);
                    localStorage.setItem('userPosts', JSON.stringify(result.data));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [userId, token])

    
    let idUser;
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (storage.userAdmin === true) {
        idUser = <div className="user-button">
            <button className="btn btn-outline-danger btn-sm" onClick={() => {navigate("/adminuserdelete/" + userId)}}>Supprimer</button>
        </div>
    }

    return (
        <React.Fragment>
            <div className="container">
            <h1>{user.firstname} {user.lastname}</h1>
                <div className="user-page">
                    <div className="images">
                        {user.imageUrl ?
                            <img
                                src={"http://localhost:4000/images/" + user.imageUrl}
                                alt="user"
                                key={"userImage" + user.id}
                            /> : 
                            <img
                                src={img}
                                alt="user"
                                key={"userImage" + user.id}
                            />
                        }
                    </div>
                  
                    {idUser}
                </div>
                <div className="user-post">
                    <h2>Posts publiés par {user.firstname}</h2>
                    {posts.map((post) => (
                        <div className="user-posts" key={"user" + post.id}>
                            <Link to={"/post/" + post.id} key={"post" + post.id} className="nav-link">{post.title}</Link>
                            <p key={"post" + post.id}>{post.content}</p>
                            <h3 key={"date" + post.id}>Publié le <Moment key={"date" + post.id} format="DD MMM YYYY" date={post.createdAt} /></h3>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
};

export default UsersPage;
