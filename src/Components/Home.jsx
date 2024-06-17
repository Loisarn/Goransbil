import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <main className="main">
        <h2 className="heading">Senaste</h2>
        <div className="posts_container">
          <Link to={`/post/details`} className="post">
            <h2 className="post_title">Test</h2>
          </Link>

          {/* <Link to={`/post/details`} className="post">
            <h2 className="post_title">How to install Novu in React</h2>
          </Link> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
