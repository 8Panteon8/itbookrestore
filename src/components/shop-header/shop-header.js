import React, { useState } from "react";
import "./shop-header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { seachBook } from "../../store/booksSlice";
import InputField from "../input-field";

const ShopHeader = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const searchInput = () => {
    dispatch(seachBook(text));
    setText("");
  };
  const { total, count } = useSelector((state) => state.books);
  return (
    <header className="shop-header row">
      <Link to="/">
        <span className="logo text-dark">IT-Book ReStore</span>
      </Link>
      <InputField
        text={text}
        handleInput={setText}
        handleSubmit={searchInput}
      />
      <Link to="/cart">
        <div className="shop-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {count} items (${total})
        </div>
      </Link>
    </header>
  );
};

export default ShopHeader;
