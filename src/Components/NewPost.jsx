import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewPost.css";

const NewPost = ({ addPost }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    // setImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Skapa ett FormData-objekt och lägg till data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

    // Lägg till bilder till formData, om några finns
    images.forEach((image) => {
      formData.append(`images`, image);
    });

    try {
      const response = await axios.post(
        "http://localhost:8081/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Post created:", response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response ? error.response.data : error.message
      );
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("title", title);
  //   formData.append("description", description);
  //   formData.append("price", price);
  //   formData.append("date", new Date().toISOString());

  //   images.forEach((image) => {
  //     formData.append("images", image);
  //     // images.forEach((image, index) => {
  //     //   formData.append(`images[${index}]`, image);
  //   });

  //   try {
  //     const response = await axios.post("/posts", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     if (response.status === 201) {
  //       console.log("Post created:", response.data);
  //       navigate("/");
  //     } else {
  //       console.error("Failed to create post");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

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
          id="description"
          value={description}
          onChange={handleDescriptionChange}
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
