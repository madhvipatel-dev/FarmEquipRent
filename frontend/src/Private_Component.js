import { Navigate, Outlet } from "react-router-dom";

function Private_Component(){
    let auth = localStorage.getItem("admin_email");
    return auth ? <Outlet /> : <Navigate to="/" />
}

export default Private_Component;