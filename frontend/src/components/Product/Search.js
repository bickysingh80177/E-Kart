import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Search.css";
import Metadata from "../layout/Metadata";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <Fragment>
      <Metadata title="Search a product -- E-COMMERCE" />
      <form className="searchBox" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
