// Importing necessary libraries
import { createSlice } from '@reduxjs/toolkit'; // Importing createSlice from Redux Toolkit for slice creation
import '../../services/api.js'
import { createUser } from '../../services/api.js';
import bcrypt from 'bcryptjs';

// Defining the initial state of the user slice
export const initialState = {
  success: false, // Indicates whether the user addition was successful
  error: null, // Holds any error messages related to the addition process
  loading: false, // Indicates if a user addition request is currently in progress
};

// Creating the user slice to manage user-related actions and state
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Setting the initial state defined above
  reducers: {
    // Action dispatched when user addition starts
    addUserStart(state) {
      state.loading = true; // Set loading to true when the process begins
      state.success = false; // Reset success to false at the start
      state.error = null; // Clear any previous errors
    },
    // Action dispatched when user addition is successful
    addUserSuccess(state) {
      state.loading = false; // Set loading to false upon successful addition
      state.success = true; // Mark the addition as successful
      state.error = null; // Clear any errors
    },
    // Action dispatched when user addition fails
    addUserFailure(state, action) {
      state.loading = false; // Set loading to false when the addition fails
      state.success = false; // Mark the addition as unsuccessful
      state.error = action.payload; // Store the error message from the action payload
    },
    // Action to reset the user slice state to its initial values
    resetUserState(state) {
      Object.assign(state, initialState); // Resetting the state to initial values
    },
  },
});

// Exporting actions for use in components
export const { addUserStart, addUserSuccess, addUserFailure, resetUserState } = userSlice.actions;

// Exporting the reducer to be included in the Redux store
export default userSlice.reducer;

// Thunk function to handle the user addition process

export const userAdd = (formData) => async (dispatch) => {
 const hashedPassword = await bcrypt.hash(formData.password, 10);
  try {
  const response = await createUser({
    nombreUsuario: formData.username,
    nombre: formData.firstName,
    apellido: formData.lastName,
    email: formData.email,
     password: hashedPassword, // Enviar password hasheada
    cedula: formData.dni
  });

    if (response) {
      dispatch(addUserSuccess()); // Si la respuesta es exitosa, actualiza el estado
      console.log('User added successfully:', response); // Añadir log para ver la respuesta
    } else {
      dispatch(addUserFailure("usuario no registrado")); // Si hay un error, actualiza el estado con el mensaje
    }

  } catch (error) {
    console.error('Error during user registration:', error); // Mejor manejo de errores
    dispatch(addUserFailure("Error al conectar con el servidor"));
  }
};


