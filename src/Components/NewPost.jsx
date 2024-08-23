import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";

const NewPost = ({ addPost }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("date", new Date().toISOString());

    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      const response = await fetch("/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Post created:", result);
        navigate("/");
      } else {
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newPost = { title, text, images, date: new Date().toISOString() };
  //   addPost(newPost);
  //   navigate("/");
  // };

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

        <label htmlFor="text">Beskrivning</label>
        <textarea
          id="text"
          value={text}
          onChange={handleTextChange}
          rows="4"
          cols="50"
        />
      </div>
      <div className="form-group">
        <input
          type="file"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <label htmlFor="header">Pris</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <button type="submit">Ladda upp</button>
    </form>
  );
};

export default NewPost;
