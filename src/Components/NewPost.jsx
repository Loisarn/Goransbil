import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, text, image });
    setTitle("");
    setText("");
    setImage("");

    // You can also handle the form submission to send data to the backend
  };

  return (
    <form className="new-post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="header">Rubrik</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />

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
