import React from "react";
import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Field from '../Form/Field';

const CreatePost = () => {


    // const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);


    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }


    const handlePost = () => {
        if (title || content || image) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('image', file);

            // let defaultConfig = {
            //     formData: false,
            // }

            // let token = localStorage.getItem('token');
            const storage = JSON.parse(localStorage.getItem('userConnect'));
            let token = "Bearer " + storage.token;

            fetch("http://localhost:4000/api/posts/", formData,
                {
                    method: 'post',
                    headers: {
                        'Content-Type': formData ? 'multipart/form-data' : 'application/json',
                        // "Authorization": `Bearer ${JSON.parse(token)}`,
                        Authorization: `Bearer ${token}`
                    },
                })
                .then(response => response.json())
                .then((res) => res)
                .catch((error) => console.log(error))
            console.log(token);
        };

    }

    const cleanState = () => {
        setTitle("")
        setContent("")
        setImage(null)
        setFile(null)
    };

    return (
        <div>

            <Field
                type="text"
                name="post"
                id="post"
                autoFocus={true}
                placeholder='Une nouvelle à partager?'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            >
            </Field>
            <div>
                {image
                    ? (<div>
                        <img src={image} alt="" />
                        <button onClick={(e) => { setImage(null); setFile(null) }}>X</button>
                    </div>)
                    : null
                }
            </div>


            <Form.Label htmlFor="file">
                <img sx={{ fontSize: { xs: 30, lg: 36 }, color: "#3e3e42", "&:hover": { color: "#24b6a9" }, cursor: "pointer" }} />
            </Form.Label>
            <input type="file"
                id='file'
                name='file'
                onChange={(e) => handleImage(e)}
            />
            <div>
                {title || content || image
                    ? (<button onClick={cleanState}>Annuler</button>)
                    : null}

                <button onClick={handlePost}>Grouposter</button>
            </div>
        </div>
    );
};

export default CreatePost;