import { Link } from 'react-router-dom'

export default function NavBarHome() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight">
            <Link to={"/"}>
              BigO<span className="text-primary">(You)</span>
            </Link>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-sm font-medium hover:text-primary transition-colors" to={"/dashboard"}>Dashboard</Link>
          
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">
            About
          </a>
        </nav>
        <div className="flex items-center gap-4">
          {/* <Link
            className="hidden sm:block text-sm font-bold px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            to="/login"
          >
            Login/SignUp
          </Link> */}
          <Link
            className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            to="/login"
          >
            Login/SignUp
          </Link>
        </div>
      </div>
    </header>
  )
}