export default function BottomFooter(){
    return(
        <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-slate-50 dark:bg-slate-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold tracking-tight">BigO(You)</span>
                        </div>
                        <div className="flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <a className="hover:text-primary transition-colors" href="#">
                                Privacy Policy
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Terms of Service
                            </a>
                            <a className="hover:text-primary transition-colors" href="#">
                                Contact
                            </a>
                        </div>
                        <div className="text-sm text-slate-500">© 2024 BigO(You). Built with precision for developers.</div>
                    </div>
                </div>
            </footer>
    )
}