import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import Button from "@mui/material/Button";
import Carousel from "./Carousel.jsx";
import axios from "axios";
import "./Details.css";

const Details = ({ isAdmin }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [countUp, setCountUp] = useState(0);
  const buttonRef = useRef(null);

  useEffect(() => {
    console.log(`Fetching post with ID: ${id}`);
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Post not found</div>;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.Title,
          text: post.Description,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Share not supported on this browser");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${post.Id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Är du säker på att du vill radera denna annons?")) {
      console.log("Post raderad", post.Id);
      navigate(-1);
    }
  };

  return (
    <div className="details_container">
      <header className="details_header">
        <h1 className="details_heading">{post.Title}</h1>
        <p className="details_date">
          {new Date(post.CreatedAt).toLocaleDateString()}
        </p>
      </header>
      <main className="details_body">
        <Carousel data={post.Images || []} className="carousel" />

        <div className="reactions-group">
          <Button ref={buttonRef} onClick={() => setCountUp(countUp + 1)}>
            <ThumbUpIcon />
            {`${countUp === 0 ? `` : countUp}`}
          </Button>
          <Button className="shareBtn" onClick={handleShare}>
            Dela <ShareIcon />
          </Button>
        </div>
        <p>{post.Description}</p>
        <p>{post.Price}</p>
      </main>
      <div className="button-container">
        <Button onClick={() => navigate(-1)} className="backBtn">
          Tillbaka
        </Button>
        {/* {isAdmin && ( */}
        <div className="admin-actions">
          <Button onClick={handleEdit} className="editBtn">
            Redigera
          </Button>
          <Button onClick={handleDelete} className="deleteBtn">
            Radera
          </Button>
        </div>
        {/* <div className="views">{post.ViewCount}</div> */}
      </div>
      <footer className="details_footer">
        <p className="views"> Antal visningar: {post.ViewCount}</p>
      </footer>
    </div>
  );
};

export default Details;
