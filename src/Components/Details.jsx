import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Details.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";

const Details = () => {
  const [countUp, setCountUp] = useState(0);
  let navigate = useNavigate();

  return (
    <div>
      <header className="details_header">
        <h1 className="details_heading">How to install Novu in React</h1>
        <div className="post_details">
          <div>
            <p className="details_date">Posted on 30th July, 2023</p>
          </div>
        </div>
      </header>
      <main className="details_body">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </main>
      <div>
        <button onClick={() => navigate(-1)} className="backBtn">
          Tillbaka
        </button>
      </div>
      <div className="reactions-group">
        <Button onClick={() => setCountUp(countUp + 1)}>
          <ThumbUpIcon />
          {`${countUp === 0 ? `` : countUp}`}
        </Button>
        <Button className="shareBtn">
          Dela {""} <ShareIcon />
        </Button>
      </div>
    </div>
  );
};

export default Details;
