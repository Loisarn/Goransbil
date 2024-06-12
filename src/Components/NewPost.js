import React, { useState } from 'react';
import './NewPost.css';

const NewPost = () => {
    const [header, setHeader] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleHeaderChange = (e) => {
        setHeader(e.target.value);
    }

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission
        console.log('Header', header);
        console.log('Text:', text);
        console.log('Image:', image);

        // You can also handle the form submission to send data to the backend
    };

    return (
        <form className="new-post-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="header">Rubrik</label>
                <input
                type="text"
                id="header"
                value={header}
                onChange={handleHeaderChange}/>

                <label htmlFor="text">Text</label>
                <textarea
                    id="text"
                    value={text}
                    onChange={handleTextChange}
                    rows="4"
                    cols="50"
                />
            </div>
            <div className="form-group">
                {/* <label htmlFor="image">Ladda upp bild</label> */}
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <button type="submit">Ladda upp</button>
        </form>
    );
};

export default NewPost;