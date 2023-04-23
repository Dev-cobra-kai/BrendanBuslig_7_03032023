import React from "react";
import { useState } from 'react'


function App() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('')

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }


       const handleSubmitImage = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        fetch('http://localhost:4000/posts', {
          method: 'POST',
          body: formData,
        })

        if (response) setStatus(response.statusText)
      }

      const handleFileChange = (e) => {
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImage(img)
      }

      return (
        <div className='App'>
          <h1>Upload to server</h1>
          {image.preview && <img src={image.preview} width='100' height='100' />}
          <hr></hr>
          <form onSubmit={handleSubmit}>
            <input type='file' name='file' onChange={handleFileChange}></input>
            <button type='submit'>Submit</button>
            <div className="update-image" >
              <input className="form-control" type="file" name="postUrl" onChange={this.handleImage} />
              {/* <button className="btn btn-outline-success btn-sm" type="Submit" onClick={this.handleSubmitImage}>Ajouter image</button> */}
            </div>
          </form>
          {status && <h4>{status}</h4>}
        </div>
      )
    }

    export default App;