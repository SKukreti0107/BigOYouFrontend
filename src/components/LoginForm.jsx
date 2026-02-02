import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import api from "../components/Api"
import { useState } from "react";
import BackdropLoader from "./BackdropLoader";

export default function LoginForm({checkAuth}) {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const login = async ({ email, password }) => {
        try {
            setLoading(true);
            await api.post(
                "/login", { email, password }
            )
            console.log("login done (cookie set)")

            const user = await checkAuth();
            if (user){
                setLoading(false);
                navigate("/dashboard")
            }else{
                console.log("Check auth failed after login")
                setLoading(false);
            }
                
        }catch(error){
            console.log("Login Failed",error)
            setLoading(false);
        }
        
    }

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validate,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            login({ email: values.email, password: values.password })
        },
    });




    return (
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors">
                        mail
                    </span>
                    <input
                        className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-[#101922] border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base transition-all"
                        placeholder="nerd@dsa.com" name="email"
                        type="email" onChange={formik.handleChange} value={formik.values.email}
                    />

                    {formik.errors.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}

                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <a className="text-xs text-primary hover:underline font-medium" href="#">
                        Forgot Password?
                    </a>
                </div>
                <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors">
                        lock
                    </span>
                    <input
                        className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-[#101922] border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base transition-all"
                        placeholder="••••••••"
                        type="password" name="password"
                        onChange={formik.handleChange} value={formik.values.password}
                    />

                    {formik.errors.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}

                </div>
            </div>

            <button
                className="w-full bg-primary text-white h-14 rounded-lg font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mt-4 cursor-pointer"
                type="submit" disabled={loading}
            >
                <span>{loading ? "Signing In..." : "Sign In"}</span>
                {!loading && <span className="material-symbols-outlined">login</span>}
            </button>

            {loading && <BackdropLoader/>}
        </form>
    )
}