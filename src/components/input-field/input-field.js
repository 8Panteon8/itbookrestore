import React from "react";
import { Link } from "react-router-dom";

const InputField = ({ text, handleInput, handleSubmit }) => {
  return (
    <label className="search-book">
      <input value={text} onChange={(e) => handleInput(e.target.value)} />
      <Link to="/">
        <button onClick={handleSubmit}>Search</button>
      </Link>
    </label>
  );
};

export default InputField;
