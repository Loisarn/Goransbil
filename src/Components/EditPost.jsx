import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NewPost.css";

const EditPost = ({ posts, updatePost }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for post data
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    // Fetch existing post data from the API
    const post = posts.find((p) => p.id === parseInt(id));

    if (post) {
      setTitle(post.title);
      setText(post.text);
      setPrice(post.price);
      setExistingImages(post.images || []);
    }
  }, [id, posts]);

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
    const updatedPost = {
      title,
      text,
      price,
      images,
      date: new Date().toISOString(),
    };
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Post updated:", result);
        navigate("/");
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="new-post-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Rubrik</label>
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

        <label htmlFor="price">Pris</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={handlePriceChange}
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
        {existingImages.length > 0 && (
          <div className="image-preview">
            {existingImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Existing post ${index + 1}`}
                className="post_image"
              />
            ))}
          </div>
        )}
        {images.length > 0 && (
          <div className="image-preview">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`New post ${index + 1}`}
                className="post_image"
              />
            ))}
          </div>
        )}
      </div>
      <button type="submit">Uppdatera</button>
    </form>
  );
};

export default EditPost;
