import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action for login
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // Assuming payload is user data
    },
    // Action for logout
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

// Export actions to use in components
export const { login, logout } = authSlice.actions;

// Export the reducer to be added to the store
export default authSlice.reducer;
