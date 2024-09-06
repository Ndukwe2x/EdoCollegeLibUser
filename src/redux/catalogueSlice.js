import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosConfig';
import { combineResources } from '../utils/combineResources';

// Define the asynchronous thunk to fetch Books
export const fetchBooks = createAsyncThunk('catalogue/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/books");
    console.log(response.data.data.books)
    return response.data.data.books;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Define the asynchronous thunk to fetch Videos
export const fetchVideos = createAsyncThunk('catalogue/fetchVideos', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/videos');
    console.log(response.data.data.videos)
    return response.data.data.videos;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Define the asynchronous thunk to fetch a single book
export const fetchSelectedBook = createAsyncThunk('catalogue/fetchSelectedBook', async (bookId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/books/${bookId}`);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Define the asynchronous thunk to fetch a single video
export const fetchSelectedVideo = createAsyncThunk('catalogue/fetchSelectedVideo', async (videoId, { rejectWithValue }) => {
  try {
    const response = await api.get(`/videos/${videoId}`);
    console.log(response)
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  books: [],
  videos: [],
  resources: [], // Combined array of books and videos
  loading: false,
  searchQuery: '',
  selectedBook: null,
  selectedVideo: null,
  error: null,
};

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
        state.searchQuery = action.payload;  // Update the search query state
      },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchBooks
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        // state.resources = combineResources(state.books, state.videos); // Combine books and videos
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchVideos
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
        // state.resources = combineResources(state.books, state.videos); // Combine books and videos
        state.loading = false;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchSelectedBook
      .addCase(fetchSelectedBook.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSelectedBook.fulfilled, (state, action) => {
        state.selectedBook = action.payload;
        state.loading = false;
      })
      .addCase(fetchSelectedBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchSelectedVideo
      .addCase(fetchSelectedVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSelectedVideo.fulfilled, (state, action) => {
        state.selectedVideo = action.payload;
        state.loading = false;
      })
      .addCase(fetchSelectedVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery } = catalogueSlice.actions;

export default catalogueSlice.reducer;
