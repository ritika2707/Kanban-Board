import React from "react";
import { BsExclamationSquareFill } from "react-icons/bs";
import "../styles/card.css";

const Card = ({ id, title, tags, status }) => {
  return (
    <div className="container">
      <div className="card-Heading2" style={{ justifyContent: "space-between" }}>
        <span style={{ textTransform: "uppercase", color: "darkgrey" }}>
          {id}
        </span>

        <div className="card-image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREl1TQtDYX5h2D_zEWAcR7uZge3w8w-BVjd-4QqFc4ZncS05EcIP7oVgvJWHY7ETxPp8Y&usqp=CAU" alt="QuickSell"
          />

          <div className="card-status"></div>
        </div>
      </div>

      <div className="card-title">
        <p>{title}</p>
      </div>

      <div className="card-tags">
        <div className="card-tag">
          <BsExclamationSquareFill />
        </div>
        {tags?.map((element, index) => {
          return (
            <div key={index} className="card-tag">
              <span>●</span> {element}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;