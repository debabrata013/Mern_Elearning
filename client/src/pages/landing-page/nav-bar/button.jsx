// React Component
import React from "react";
import "./button.css";

const NextButton = () => {
  return (
    <div className="next-button-wrapper">
      <a className="next-button-cta" href="#">
        <span className="start">Next</span>
        <span>
          <svg
            width="55px"
            height="30px"
            viewBox="0 0 66 43"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none">
              <path className="next-button-one" d="M40.15 3.89L43.98.14c.2-.19.51-.19.71 0L65.69 20.78c.39.39.4 1.03 0 1.41l-21.01 20.65c-.2.19-.51.19-.71 0l-3.82-3.75c-.2-.19-.2-.51 0-.71L56.99 21.86c.2-.19.2-.51 0-.71L40.15 3.89z" fill="#FFF" />
              <path className="next-button-two" d="M20.15 3.89L23.98.14c.2-.19.51-.19.71 0L45.69 20.78c.39.39.4 1.03 0 1.41L24.67 42.86c-.2.19-.51.19-.71 0l-3.82-3.75c-.2-.19-.2-.51 0-.71L36.99 21.86c.2-.19.2-.51 0-.71L20.15 3.89z" fill="#FFF" />
              <path className="next-button-three" d="M.15 3.89L3.98.14c.2-.19.51-.19.71 0L25.69 20.78c.39.39.4 1.03 0 1.41L4.68 42.86c-.2.19-.51.19-.71 0L.15 39.11c-.2-.19-.2-.51 0-.71L16.99 21.86c.2-.19.2-.51 0-.71L.15 3.89z" fill="#FFF" />
            </g>
          </svg>
        </span>
      </a>
    </div>
  );
};

export default NextButton;
