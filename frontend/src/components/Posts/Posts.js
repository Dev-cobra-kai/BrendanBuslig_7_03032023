// LA PAGE DES POSTS

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import img from '../../images/icon.png';

const Posts = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    // const [image, setImage] = useState('');
    // const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " + storage.token;

    useEffect(() => {
        fetch("http://localhost:4000/api/posts/",
            {
                headers:
                    { "Authorization": token }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPosts(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [token])

    useEffect(() => {
        fetch("http://localhost:4000/api/users/",
            {
                headers:
                    { "Authorization": token }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUsers(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [token])

    
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <React.Fragment>
                <div className="container">
                    <h1>Tous les posts publiés</h1>
                    <div className="form-submit">
                        <button className="btn btn-outline-info btn-sm" onClick={() => { navigate("/createpost/") }}>Publier un post</button>
                    </div>
                    {posts.map((post) => (
                        <div className="post-card" key={"postCard" + post.id}>
                            {users.map((user) => {
                                if (user.id === post.userId && user.imageUrl) {
                                    return <img src={"http://localhost:4000/images/" + user.imageUrl} alt="user" key={"userImage" + post.id} />
                                } else if (user.id === post.userId && !user.imageUrl) {
                                    return <img src={img} alt="user" key={"userImage" + post.id} />
                                } else {
                                    return null
                                }
                            })}
                            <div className="show-post" key={"show" + post.id}>
                                {users.map((user) => {
                                    if (user.id === post.userId) {
                                        return <h2 key={"h2" + user.id}>Publié par <Link to={"/users/" + user.id} key={user.id + post.id} className="nav-link">{user.firstname} {user.lastname}</Link></h2>
                                    } else {
                                        return null
                                    }
                                })}
                                <Link to={"/post/" + post.id} key={"post" + post.id} className="nav-link">{post.title}</Link>
                                <p key={"content" + post.id}>{post.content}</p>
                                <p key={"imageUrl" + post.id}>{post.imageUrl}</p>
                                <button className="btn btn-outline-info btn-sm" onClick={() => { navigate("/imagepost/") }}>Ajouter une image</button>
                                {/* <img src={"http://localhost:4000/images/" + post.imageUrl} alt="post" key={"postImage" + post.id} /> */}
                                <p key={post.createdAt} id="created-at"><Moment fromNow key={"date" + post.id}>{post.createdAt}</Moment></p>
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }
};

export default Posts;
