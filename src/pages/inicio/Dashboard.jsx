import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/styledComponets/Containers/Containers";
import { StyledLink, Text2, Text4 } from "../../components/styledComponets/Text/Text";
import ThemeProvider from "../../components/styledComponets/Theme/ThemeProvider";
import Footer from "../../components/Footer/footer";
import { StyledButton } from "../../components/styledComponets/Bottons/botton";
import { logout } from "../../redux/states/AuthUser";

const Dashboard = () => {
  const { success, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({ AuthError: "" });

  useEffect(() => {
    if (!success) {
      navigate("/");
    }

    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AuthError: error,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        AuthError: "",
      }));
    }
  }, [user, success, error, navigate]);

  const handleLogout = () => {
  dispatch(logout());
  navigate("/");
};

  return (
    <ThemeProvider>
      <Container>
        <div style={{ padding: "2rem", backgroundColor: "#f4f4f4", borderRadius: "12px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
          <Text2>Información del Usuario</Text2>
          <Text4> <strong>Nombre:</strong> {user?.firstName || "No disponible"}</Text4>
          <Text4> <strong>Apellido: </strong>   {user?.lastName || "No disponible"}</Text4>
          <Text4> <strong>Cédula: </strong> {user?.dni || "No disponible"}</Text4>
          <Text4><strong>token:</strong>  {user?.token || "No disponible"}</Text4>
         <StyledButton onClick={handleLogout}>Salir</StyledButton>
        </div>
          
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default Dashboard;
