import { useFormik } from "formik"
import api from "../components/Api"
import BackdropLoader from "./BackdropLoader";
import Alert from "@mui/material/Alert";
import { useState } from "react";
export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const signUp = async ({ email, password }) => {
        try {
            setLoading(true);
            let res = await api.post(
                "/signUp", { email, password }
            );
            console.log("created new user", (res).data);
            setSuccess(true);
        } catch (err) {
            console.log(`error creating new user${err}`);
            setError(err);
        } finally {
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
        if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
        }
        if (values.password != values.confirmPassword) {
            errors.confirmPassword = "Does not match with password";
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        }, validate,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            signUp({ email: values.email, password: values.password });
            console.log(values)

        },
    });




    return (<>
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

                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Confirm Password</label>
                </div>
                <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-primary transition-colors">
                        lock
                    </span>
                    <input
                        className="w-full pl-12 pr-4 h-14 bg-slate-50 dark:bg-[#101922] border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-base transition-all"
                        placeholder="••••••••"
                        type="password" name="confirmPassword"
                        onChange={formik.handleChange} value={formik.values.confirmPassword}
                    />
                    {formik.errors.confirmPassword ? <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div> : null}
                </div>
            </div>

            <button
                className="w-full bg-primary text-white h-14 rounded-lg font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mt-4"
                type="submit"
            >
                <span>Sign Up</span>
                <span className="material-symbols-outlined">login</span>
            </button>
        </form>
        {loading && <BackdropLoader />}
        <div className="mt-4">
            {error && <Alert severity="error">{error.message}</Alert>}
            {success && <Alert severity="success">User created successfully.Proceed to Sign In</Alert>}
        </div>

    </>
    )
}