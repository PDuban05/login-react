import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import './App.css';
import Register from './pages/Register/Register';
import Login from "./pages/login/Login";
import Dashboard from "./pages/inicio/Dashboard";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>


  )
}

export default App
