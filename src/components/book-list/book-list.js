import React, { useEffect } from "react";
import BookListItem from "../book-list-item";
import { useSelector } from "react-redux";
import { fetchBooks } from "../../store/booksSlice";
import { useDispatch } from "react-redux";

import "./book-list.css";
import Spinner from "../spinner/spinner";

const BookList = ({ books }) => {
  if (books)
    return (
      <ul className="book-list">
        {books.map((book) => {
          return (
            <li key={book.isbn13}>
              <BookListItem book={book} />
            </li>
          );
        })}
      </ul>
    );
};

const BookListContainer = () => {
  const dispatch = useDispatch();
  const { seachBook, loading, search } = useSelector((state) => state.books);
  useEffect(() => {
    dispatch(fetchBooks());
  }, [search, dispatch]);

  const checkInput =
    (seachBook && seachBook.length === 0 && !loading) ||
    (!seachBook && !loading);

  const showBooks = loading ? <Spinner /> : <BookList books={seachBook} />;
  const showAlert = checkInput ? <h1>The search was inconclusive </h1> : null;

  return (
    <div>
      {showBooks}
      {showAlert}
    </div>
  );
};

export default BookListContainer;
