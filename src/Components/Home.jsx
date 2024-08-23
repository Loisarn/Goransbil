import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("/posts");
      const postsWithImages = await Promise.all(
        result.data.map(async (post) => {
          const imageUrls = await Promise.all(
            post.ImageIds.map(async (id) => {
              const response = await axios(`/images/${id}`);
              return response.data.image; // Hämta den base64-kodade bilden
            })
          );
          return { ...post, Images: imageUrls };
        })
      );
      setPosts(postsWithImages);
    } catch (err) {
      console.log("something wrong");
    }
  };

  return (
    <div>
      <main className="main">
        <div className="posts_container">
          {posts.map((post, index) => (
            <Link
              to={`/post/${post.Title.replace(/\s+/g, "-").toLowerCase()}`}
              className="post"
              key={index}
            >
              {post.Images &&
                post.Images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image}
                    alt={post.Title}
                    className="post_image"
                  />
                ))}
              <h2 className="post_title">{post.Title}</h2>
              <p className="post_summary">{post.Description}</p>
              <p className="post_price">Pris: {post.Price}</p>
              <p className="post_date">
                {new Date(post.CreatedAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
