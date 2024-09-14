import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
    const is_Auth = useSelector((state) => state.userInfo.is_Auth);
   
    if (is_Auth) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectedRoutes;
