import { Navigate, Outlet } from "react-router-dom"
import { toastError } from "../components/utils/ToastNotify"

export const AuthGuard = () => {
    const token = localStorage.getItem("token")
   
    if(token===null){
        toastError("INVALID ACCESS")
    }
    return token? <Outlet/>: <Navigate replace to={'/'}/>
}

export default AuthGuard