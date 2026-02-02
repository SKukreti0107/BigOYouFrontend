import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useState } from 'react'
import SignUpForm from '../components/SignUpForm';
function Login({checkAuth}) {

    let [isUser,setIsUser] = useState(true);

    return (
        <div className="relative min-h-screen flex flex-col tech-bg bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 ai-glow -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 ai-glow -z-10"></div>

            <header className="w-full px-6 lg:px-12 py-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-bold tracking-tight">
                        <Link to={"/"}>
                            BigO<span className="text-primary">(You)</span>
                        </Link>
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <Link className="bg-primary text-white text-sm font-bold h-10 p-2 rounded-lg hover:brightness-110 transition-all" to="/dashboard">
                        Dashboard
                    </Link>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white dark:bg-[#1c2127] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Initialize Session</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Welcome back, engineer. Log in to start your timed mock interview.
                        </p>
                    </div>

                    {isUser && <LoginForm checkAuth={checkAuth}/>}
                    {!isUser && <SignUpForm/>}

                    {isUser && <p className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
                        Don't have an account?{' '}
                        <button className='text-white hover:text-primary cursor-pointer' onClick={()=>setIsUser(false)}>Sign Up</button>
                    </p>}
                    {!isUser && <p className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
                        Already a user?{' '}
                        <button className='text-white hover:text-primary cursor-pointer' onClick={()=>setIsUser(true)}>Sign In</button>
                    </p>}
                </div>
            </main>

            <footer className="w-full p-6 text-center text-xs text-slate-400 dark:text-slate-600">
                © 2026 BigO(You). Empowering engineers with LLM-powered practice.
            </footer>
        </div>
    )
}

export default Login
