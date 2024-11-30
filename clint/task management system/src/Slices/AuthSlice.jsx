// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  isAdmin: false, // Flag to indicate admin status
  isLogin: false, // Flag to indicate login status
  user: {}, // User data
};

// Create user slice
const userSlice = createSlice({
  name: "user", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to set admin status
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    // Reducer to set login status
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    // Reducer to set user data
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export actions
export const { setIsAdmin, setIsLogin, setUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;