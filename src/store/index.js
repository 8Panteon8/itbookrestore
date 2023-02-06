import { configureStore } from "@reduxjs/toolkit";

import booksSlice from "./booksSlice";

export default configureStore({
  reducer: {
    books: booksSlice,
  },
});
