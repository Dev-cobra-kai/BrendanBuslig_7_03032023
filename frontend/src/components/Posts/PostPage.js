import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import Comments from "../Comments/Comments";
import Badge from 'react-bootstrap/Badge'
import img from '../../images/icon.png';


function PostPage({ match }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState([]);

    const [likes, setLikes] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " + storage.token;
    let userId = storage.userId;

    let postId = match.params.id;

    useEffect(() => {
        fetch("http://localhost:4000/api/posts/" + postId,
            {
                headers:
                    { "Authorization": token }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPost(result);
                    localStorage.setItem('postPage', JSON.stringify(result));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [postId, token])

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

    useEffect(() => {
        fetch("http://localhost:4000/api/posts/" + postId + "/likes/",
            {
                headers:
                    { "Authorization": token },
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setLikes(result.data.length);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [postId, token])

    function LikeSubmit() {
        fetch('http://localhost:4000/api/likes/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                postId: postId,
                userId: userId,
                like: 1
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setLikes(result.like)
                    setIsLoaded(true);
                }, (error) => {
                    if (error) {
                        setError(error);
                    }
                })
    }

    let userAuth;
    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else if (post.userId === storage.userId) {
        userAuth = <div className="post-button">
            <button className="btn btn-outline-info btn-sm" onClick={() => { navigate.push("/postupdate/" + postId) }}>Modifier</button>
            <button className="btn btn-outline-danger btn-sm" onClick={() => { navigate.push("/postdelete/" + postId) }}>Supprimer</button>
        </div>
    } else if (storage.userAdmin === true) {
        userAuth = <div className="post-button">
            <button className="btn btn-outline-danger btn-sm" onClick={() => { navigate.push("/postdelete/" + postId) }}>Supprimer</button>
        </div>
    }

    return (
        <React.Fragment>
            <div className="container">
                <h1>{post.title} </h1>
                <div className="post-present">
                    {users.map((user) => {
                        if (user.id === post.userId && user.imageUrl) {
                            return <img src={"http://localhost:4000/images/" + user.imageUrl} alt="user" key={"userImage" + post.id} />
                        } else if (user.id === post.userId && !user.imageUrl) {
                            return <img src={img} alt="user" key={"userImage" + post.id} />
                        } else {
                            return null
                        }
                    })}
                    <div className="post-content">
                        {users.map((user) => {
                            if (post.userId === user.id) {
                                return <h2 key={"h2" + user.id}>Publié par <Link to={"/users/" + user.id} key={user.id + post.id} className="nav-link">{user.firstname} {user.lastname}</Link></h2>
                            } else {
                                return null
                            }
                        })}
                        <p><Moment fromNow key={"date" + post.id}>{post.createdAt}</Moment></p>
                        <div className="post-page">
                            <div className="show-post">
                                <p>{post.content}</p>
                                {post.postUrl
                                    ? <a target="_blank" rel="noopener noreferrer" className="nav-link" href={post.postUrl} >{post.postUrl}</a> : null}
                            </div>
                            {userAuth}
                        </div>
                        <div className="likes">
                            <button onClick={LikeSubmit}>
                                <Badge pill variant="danger">
                                    Likes : {likes}
                                </Badge>
                            </button>
                        </div>
                    </div>
                </div>
                <Comments />
            </div>
        </React.Fragment>
    );
};

export default PostPage;