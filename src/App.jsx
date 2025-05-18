import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import Register from './pages/Register/Register';
import InputCode from "./pages/Autenticate/InputCode";
import Login from "./pages/login/Login";
import Dashboard from "./pages/inicio/Dashboard";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inputcode" element={<InputCode />} />
      


      </Routes>
    </BrowserRouter>


  )
}

export default App
