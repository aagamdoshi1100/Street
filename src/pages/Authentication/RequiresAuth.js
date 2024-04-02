import { Navigate } from "react-router-dom";

export default function RequiresAuth({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}
