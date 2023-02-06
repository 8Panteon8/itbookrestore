import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async function (_, { rejectWithValue, getState }) {
    const inputBook = getState().books.search;
    try {
      const response = await fetch(
        `https://api.itbook.store/1.0/search/${inputBook}`
      );
      if (!response.ok) {
        throw new Error("ServeError!");
      }
      const data = response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const updetOrder = (state, bookId, quantity) => {
  const book = state.books.find((book) => book.isbn13 === bookId);
  const itemIndex = state.shoppingCart.findIndex((book) => book.id === bookId);
  const price = parseFloat(book.price.match(/[0-9]*[.,][0-9]+$/)[0]);
  const newItem = {
    id: book.isbn13,
    title: book.title,
    count: 1,
    total: price,
  };

  if (itemIndex > -1) {
    state.shoppingCart.forEach((book) => {
      if (book.id === bookId) {
        book.count = book.count + quantity;
        book.total = parseFloat(
          (book.total + quantity * newItem.total).toFixed(2)
        );
      }
      if (book.count === 0) {
        state.shoppingCart.splice(itemIndex, 1);
      }
    });
  } else {
    state.shoppingCart.push(newItem);
  }

  state.total = state.shoppingCart
    .reduce((acc, book) => acc + book.total, 0)
    .toFixed(2);
  state.count = state.shoppingCart.reduce((acc, book) => acc + book.count, 0);
};

const booksSlice = createSlice({
  name: "books",
  initialState: {
    search: "javaScript",
    books: [],
    seachBook: [],
    shoppingCart: [],
    total: 0,
    count: 0,
    loading: null,
    error: null,
  },
  reducers: {
    addBooks(state, action) {
      updetOrder(state, action.payload, 1);
    },
    removedFromCart(state, action) {
      updetOrder(state, action.payload, -1);
    },
    allRemovedFromCart(state, action) {
      const item = state.shoppingCart.find(
        (book) => book.id === action.payload
      );
      updetOrder(state, action.payload, -item.count);
    },
    seachBook(state, action) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.seachBook = action.payload.books;
      if (action.payload.books)
        action.payload.books.map((book) => state.books.push(book));
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addBooks, removedFromCart, allRemovedFromCart, seachBook } =
  booksSlice.actions;

export default booksSlice.reducer;
