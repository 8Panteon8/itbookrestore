import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removedFromCart,
  addBooks,
  allRemovedFromCart,
} from "../../store/booksSlice";

import "./shopping-cart-table.css";

const ShoppingCartTable = () => {
  const dispatch = useDispatch();
  const { shoppingCart, total } = useSelector((state) => state.books);
  const renderRow = (item, idx) => {
    const { id, title, count = 0, total } = item;
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>${total}</td>
        <td>
          <button
            onClick={() => dispatch(allRemovedFromCart(id))}
            className="btn btn-outline-danger btn-sm float-right"
          >
            <i className="fa fa-trash-o" />
          </button>
          <button
            onClick={() => dispatch(addBooks(id))}
            className="btn btn-outline-success btn-sm float-right"
          >
            <i className="fa fa-plus-circle" />
          </button>
          <button
            onClick={() => dispatch(removedFromCart(id))}
            className="btn btn-outline-warning btn-sm float-right"
          >
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{shoppingCart.map(renderRow)}</tbody>
      </table>

      <div className="total">Total: ${total}</div>
    </div>
  );
};

export default ShoppingCartTable;
