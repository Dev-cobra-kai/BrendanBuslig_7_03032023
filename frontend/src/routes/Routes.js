//imports React
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Imports composants
import AuthApi from '../components/Auth/AuthApi';
import Home from '../pages/Home';
import Signup from '../components/Auth/Signup';
import Login from '../components/Auth/Login';
import User from '../components/Users/User';
import UsersPage from '../components/Users/UsersPage';
import UpdateAccount from '../components/Users/UpdateAccount';
import DeleteAccount from '../components/Users/DeleteAccount';
import DeleteUserAccount from '../components/Users/DeleteUserAccount';
import Posts from '../components/Posts/Posts';
import PostPage from '../components/Posts/PostPage';
import CreatePost from '../components/Posts/CreatePost';
import UpdatePost from '../components/Posts/UpdatePost';
import DeletePost from '../components/Posts/DeletePost';
import DeleteComment from '../components/Comments/DeleteComment';
import ImageUpdate from '../components/Images/ImageUpdate';

const Router = () => {

    const Auth = React.useContext(AuthApi)

    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" auth={Auth.auth} element={<Login />} />
            <Route path="/posts" auth={Auth.auth} element={<Posts />} />
            <Route path="/user/:id" auth={Auth.auth} element={<User />} />
            <Route path="/userdelete/:id" auth={Auth.auth} element={<DeleteAccount />} />
            <Route path="/userupdate/:id" auth={Auth.auth} element={<UpdateAccount />} />
            <Route path="/users/:id" auth={Auth.auth} element={<UsersPage />} />
            <Route path="/createpost" auth={Auth.auth} element={<CreatePost />} />
            <Route path="/post/:id" auth={Auth.auth} element={<PostPage />} />
            <Route path="/postupdate/:id" auth={Auth.auth} element={<UpdatePost />} />
            <Route path="/postdelete/:id" auth={Auth.auth} element={<DeletePost />} />
            <Route path="/deletecomment/:id" auth={Auth.auth} element={<DeleteComment />} />
            <Route path="/imageupdate/:id" auth={Auth.auth} element={<ImageUpdate />} />
            <Route path="/adminuserdelete/:id" auth={Auth.auth} element={<DeleteUserAccount />} />
        </Routes>
    )
}

export default Router;