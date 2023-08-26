import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/layouts/Sidebar";

const Protected = ({ children }) => {
  if (!Cookies.get("Aprint_Dash_Token")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default Protected;
