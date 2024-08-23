import React from "react";
import { Link } from "react-router-dom";
import "./ForSale.css";

const ForSale = ({ posts }) => {
  return (
    <div>
      <main className="main">
        <div className="posts_container">
          {posts.map((post, index) => (
            <Link
              to={`/post/${post.title.replace(/\s+/g, "-").toLowerCase()}`}
              className="post"
              key={index}
            >
              {post.image && (
                <img src={post.image} alt={post.title} className="post_image" />
              )}
              <h2 className="post_title">{post.title}</h2>
              <p className="post_summary">
                {post.text.length > 100
                  ? `${post.text.substring(0, 100)}...`
                  : post.text}
              </p>
              <p className="post_date">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ForSale;
