import { Navigate, useNavigate } from "react-router-dom";
import api from "./Api"

export default function NavBarDashboard({setIsUser}) {
    const navigate = useNavigate();
    const  logout = async ()=>{
        try{
            await api.post("/logout");
            setIsUser(null);
            console.log("logout successful")
            navigate("/login");

        }catch(err){
            console.log("logout failed:",err)
            // navigate("/login")
        }
    }





    return (
        <header className="h-20 border-b border-[#30363d] flex items-center justify-between px-8 shrink-0 bg-[#161b22]/30 backdrop-blur-md">
            <div>
                <h2 className="text-xl font-bold text-white">Welcome back, Alex!</h2>
                <p className="text-sm text-slate-400">You're in the top 10% of candidates this week.</p>
            </div>
            <div className="flex items-center gap-4">
                <button className="bg-[#137fec] hover:bg-[#137fec]/90 text-white text-xs font-bold py-2 px-5 rounded-lg shadow-lg shadow-[#137fec]/20 transition-all flex items-center gap-2 justify-center cursor-pointer" onClick={logout}>
                        Logout
                    </button>
            </div>
        </header>

    )

}