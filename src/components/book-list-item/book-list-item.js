import React from "react";
import "./book-list-item.css";
import { useDispatch } from "react-redux";
import { addBooks } from "../../store/booksSlice";

const BookListItem = ({ book }) => {
  const dispatch = useDispatch();
  const { title, author, price, image } = book;

  const addItem = () => dispatch(addBooks(book.isbn13));
  return (
    <div className="book-list-item">
      <div className="book-cover">
        <img src={image} alt="cover" />
      </div>
      <div className="book-details">
        <span className="book-title">{title}</span>
        <div className="book-author">{author}</div>
        <div className="book-price">{price}</div>
        <button onClick={addItem} className="btn btn-info add-to-cart">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default BookListItem;
