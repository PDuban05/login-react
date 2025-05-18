// Importing necessary libraries and modules
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice to manage state

import { userExists } from "../../services/api";



// Creating the auth slice using createSlice
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState: {
    user: {}, // Initial user state, empty object
    success: false, // Flag indicating success status
    error: null, // Holds error messages if any
    loading: false, // Indicates whether a login operation is in progress
  },
  reducers: {
    // Reducer to set loading state and clear any previous errors
    loginStart(state) {
      state.loading = true; // Set loading to true
      state.error = null; // Reset error to null
    },
    // Reducer to handle successful login
    loginSuccess(state, action) {
      state.loading = false; // Set loading to false
      state.user = {
        id: action.payload.id, // Store user ID
        username: action.payload.username, // Store username
        firstName: action.payload.firstName, // Store first name
        lastName: action.payload.lastName, // Store last name
        email: action.payload.email, // Store email
        dni: action.payload.dni, // Store email
        token: action.payload.token, // Store token

        
      };
      state.token = action.payload.token; // Store the token
      state.success = true; // Indicate success
    },
    // Reducer to handle failed login
    loginFailure(state, action) {
      state.user = {}; // Reset user state
      state.success = false; // Indicate failure
      state.loading = false; // Set loading to false
      state.error = action.payload; // Store error message
    },
    // Reducer to set the token directly
    setToken(state, action) {
      state.token = action.payload; // Update the token
    },
    // Reducer to handle user logout
    logout(state) {
      state.user = null; // Reset user state
      state.token = null; // Reset token
      state.success = false; // Indicate failure
      
    },
    // Reducer to verify the user
    verifyUser(state) {
      state.user.isVerified = 1; // Update the verification status
    },
  },
});

// Exporting actions for use in components
export const { loginStart, loginSuccess, loginFailure, setToken, verifyUser, logout } = authSlice.actions;

// Async thunk for handling user login
export const loginAuth = (userData) => async (dispatch) => {

  console.log(userData.password)


  dispatch(loginStart()); // Start login process
  try {
    // Making a POST request to authenticate the user
    const response = await userExists(userData.username, userData.password);
    console.log(response)
     

    if (response != false) {

      console.log(response)
     
          dispatch(loginSuccess({
          id: response.id,
          firstName: response.nombre,
          lastName: response.apellido,
          email: response.email,
          token: response.token,
          username: response.nombreUsuario,
          dni: response.cedula,
        }));
  
    } else {
      dispatch(loginFailure("Usuario no encontrado")); // Dispatch failure action with error message
    }
  } catch (error) {
    dispatch(loginFailure("Error en el servidor")); // Handle server error
  }
};

// Exporting the reducer for use in the Redux store
export default authSlice.reducer;




