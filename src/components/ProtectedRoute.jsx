import { Navigate } from "react-router-dom"
export default function ProtectedRoute({isUser,children}){
    
    return(
        isUser? children : <Navigate to="/login" replace></Navigate>
    )
}