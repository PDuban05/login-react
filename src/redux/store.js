// Importing necessary functions and reducers
import { configureStore } from '@reduxjs/toolkit'; // Importing the configureStore function from Redux Toolkit
import userReducer from './states/RegisterSlice'; // Reducer for managing user registration state
import authReducer from './states/AuthUser'; // Reducer for managing user authentication state


// Configuring the Redux store with combined reducers
const store = configureStore({
  reducer: {
    user: userReducer, // Mapping user state to the user reducer
    auth: authReducer, // Mapping authentication state to the auth reducer
  },
});

// Exporting the configured store for use in the application
export default store;