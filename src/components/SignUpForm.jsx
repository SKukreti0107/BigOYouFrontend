import { useFormik } from "formik"
import api from "../components/Api"
import BackdropLoader from "./BackdropLoader";
import { useState } from "react";

export default function SignUpForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const signUp = async ({ username, email, password }) => {
        try {
            setLoading(true);
            setError(null);
            let res = await api.post("/signUp", { username, email, password });
            console.log("created new user", res.data);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.detail || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const validate = values => {
        const errors = {};
        if (!values.username) errors.username = 'Full name is required';
        else if (values.username.trim().length < 2) errors.username = 'Name must be at least 2 characters';
        if (!values.email) errors.email = 'Email is required';
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address';
        if (!values.password) errors.password = 'Password is required';
        else if (values.password.length < 6) errors.password = 'Must be at least 6 characters';
        if (!values.confirmPassword) errors.confirmPassword = 'Please confirm your password';
        else if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        return errors;
    };

    const formik = useFormik({
        initialValues: { username: '', email: '', password: '', confirmPassword: '' },
        validate,
        onSubmit: values => {
            signUp({ username: values.username, email: values.email, password: values.password });
        },
    });

    const inputClass = (field) =>
        `w-full pl-11 pr-4 h-12 rounded-xl text-sm font-medium text-white placeholder-slate-600 outline-none transition-all ` +
        `bg-[#070b11]/80 border ` +
        (formik.errors[field] && formik.touched[field]
            ? 'border-rose-500/60 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
            : 'border-[#30363d] hover:border-slate-600/70 focus:border-[#137fec] focus:ring-2 focus:ring-[#137fec]/20');

    if (success) {
        return (
            <div className="text-center py-4 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-400 text-3xl">check_circle</span>
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">Account Created!</h3>
                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                        Your account is ready. Click <strong className="text-[#137fec]">Sign In</strong> below to log in.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                {/* Global error */}
                {error && (
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                        <span className="material-symbols-outlined text-rose-400 text-base shrink-0 mt-0.5">error</span>
                        <p className="text-xs text-rose-300 leading-relaxed">{error}</p>
                    </div>
                )}

                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-lg group-focus-within:text-[#137fec] transition-colors">
                            person
                        </span>
                        <input
                            className={inputClass('username')}
                            placeholder="Alex Rivera"
                            name="username"
                            type="text"
                            autoComplete="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                    </div>
                    {formik.errors.username && formik.touched.username && (
                        <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">error_outline</span>
                            {formik.errors.username}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-lg group-focus-within:text-[#137fec] transition-colors">
                            mail
                        </span>
                        <input
                            className={inputClass('email')}
                            placeholder="nerd@dsa.com"
                            name="email"
                            type="email"
                            autoComplete="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                    </div>
                    {formik.errors.email && formik.touched.email && (
                        <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">error_outline</span>
                            {formik.errors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-lg group-focus-within:text-[#137fec] transition-colors">
                            lock
                        </span>
                        <input
                            className={`${inputClass('password')} pr-11`}
                            placeholder="••••••••••"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            autoComplete="new-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-lg">
                                {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                    {formik.errors.password && formik.touched.password && (
                        <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">error_outline</span>
                            {formik.errors.password}
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirm Password</label>
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-lg group-focus-within:text-[#137fec] transition-colors">
                            lock_reset
                        </span>
                        <input
                            className={`${inputClass('confirmPassword')} pr-11`}
                            placeholder="••••••••••"
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            autoComplete="new-password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(v => !v)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-lg">
                                {showConfirm ? 'visibility_off' : 'visibility'}
                            </span>
                        </button>
                    </div>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">error_outline</span>
                            {formik.errors.confirmPassword}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    className="w-full h-12 rounded-xl font-bold text-sm text-white mt-2 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30"
                    style={{
                        background: loading
                            ? '#1e293b'
                            : 'linear-gradient(135deg, #137fec 0%, #0b6fcc 60%, #0a5fb5 100%)',
                    }}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3V0a12 12 0 00-12 12h4z" />
                            </svg>
                            <span className="text-white/70">Creating account…</span>
                        </>
                    ) : (
                        <>
                            <span>Create Account</span>
                            <span className="material-symbols-outlined text-lg">person_add</span>
                        </>
                    )}
                </button>
            </form>

            {loading && <BackdropLoader />}
        </>
    );
}