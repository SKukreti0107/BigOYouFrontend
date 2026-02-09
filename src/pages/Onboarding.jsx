import { Link } from 'react-router-dom'

function Onboarding() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">DSAMock AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 dark:text-slate-400">Need help?</span>
            <button className="text-sm font-medium hover:text-primary transition-colors">Documentation</button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center py-12 px-6">
        <div className="max-w-4xl w-full">
          <div className="mb-12">
            <div className="flex justify-between items-end mb-3">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Step 1 of 3</h3>
                <p className="text-lg font-medium">Experience &amp; Languages</p>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">33% Complete</p>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '33.33%' }}></div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Customize your interview experience</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Tell us your proficiency level and the languages you'll use for mock interviews. We'll tailor the LLM
              interviewer to match your needs.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">bar_chart</span>
              <h2 className="text-2xl font-bold">Experience Level</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Choose the difficulty level of the problems and interview style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="group relative flex flex-col p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-primary transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Beginner</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Focus on basic data structures like Arrays, Strings, and simple HashMaps. Perfect for early prep.
              </p>
              <div className="mt-auto flex items-center text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Easy Problems
              </div>
            </div>

            <div className="group relative flex flex-col p-6 rounded-xl border-2 border-primary bg-primary/5 dark:bg-primary/10 transition-all cursor-pointer">
              <div className="absolute top-4 right-4 text-primary">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl">trending_up</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Intermediate</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Trees, Graphs, and common patterns like Two Pointers or Sliding Window. Standard interview level.
              </p>
              <div className="mt-auto flex items-center text-xs font-semibold text-primary uppercase tracking-widest">
                Medium Problems
              </div>
            </div>

            <div className="group relative flex flex-col p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-primary transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Hard problems involving DP optimization, Segment Trees, or complex graph algorithms.
              </p>
              <div className="mt-auto flex items-center text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Hard Problems
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary">code</span>
              <h2 className="text-2xl font-bold">Preferred Languages</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Select one or more languages you'd like to use for coding.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-primary bg-primary/5 dark:bg-primary/10 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm">
                <img
                  alt="Python"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQcXAtLCChf-TfEcxZ3s7t88STvAPT4On95BJ_obXv7K-QGaVm4Uhl_vUhZiyuy_9aTQhd1eebG2VpaDmJBlW3fzJLXHPkzVlrTBaaVzMTlmFsZ-evMuXkMSKFHSg27dlpNsXcHRWAmYnYjSBQBw8qnfuym_-9Xacmqu7JRcn01_hs-USOdScIszRbY0fCwOopvGf3VwnVPep7xakLns4n4ZJ0ajgQWyp6Ra0bDaXjqFmyliV2VylE9y3j6h1x5pz8mtHoelgd-OLV"
                />
              </div>
              <span className="font-medium">Python</span>
              <span className="material-symbols-outlined text-primary ml-auto text-sm">check</span>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm">
                <img
                  alt="Java"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfnNgp2KUwEVbRCYJNg6JI6UaYb_XaZhOmRXPXTe2YcX2UEmsVaKl1c91PeEUQHjr-fYvSz3kX41dsE9pWzhDV4KM-dR7loUR4XcRDtVDup1wt3PDfr8F-JC-udOTb4WlXChQztcDDVDszba1WJQlscS_9RBwCR0Fv6dI-JILyFyEbHAeEqOx-X76qDvVjFVzAahj9NpyJiICnCZ230bJekkobI_hikKzucV7sgADV2-bDhdvmRP7H_DEYAM1pjdhqC2pgWG8XJ6rJ"
                />
              </div>
              <span className="font-medium">Java</span>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm">
                <img
                  alt="C++"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKskA-MDKkRxg_vSg1x3k8FRc9LPQ6K7_8hAV2owrfSgSvEZTjlqQUwQ2NBrxtcj10vmErrtFXFllpZF-xOxI5psjwl8QabLqDDOMCZqspKWE6IsnJ46OmpLcZDVegmmpK9ClDrK-exbmrWwJyeRMQ2sVq5XS13VKhyuXRdZ8S6X_gM5homSlrn77oiHpx4oErtPRTnmLcomww-fJ8bjG6pPaCj0nirtowqWzzT7sRW4xNZ0TWeE8hS8nFQWzfMmbW274iQtWCCiLF"
                />
              </div>
              <span className="font-medium">C++</span>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm">
                <img
                  alt="Go"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Jb8MIJ_fRmBpHtMlRgLbkNOwxy80D7-XPs34-lR2lgtfquZsgw3rz7prWgC3K9kOsFAFZ1vSJ5d2RLyVx34cvCTK0qHRApjjx7GTmidnQoqneCAVuScX9AQcxPTWOuLCdfu8S_yYhyaFjz_BYEaSwB2GxVMNwebW9Awtv7EKA6Db33LJBPqVqxUt_J3R1UAsRJiZu4cqF89TxvpXFTeiKQYlauHW3uKdwRPMcBXyZkmrVKPEfATc60BnKnuAUACwSViSZupvXeQK"
                />
              </div>
              <span className="font-medium">Go</span>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm">
                <img
                  alt="JavaScript"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzkSdF0B5GXjlLcoAxUXjt8HhOBr3V5bTbH3SV3KEz075UXUipm5hSkklJeu3yo06lGbVz8-gtNCuhu-A8uQ4FSe4RmFC17qW0NncXpiJn9u81jd1F-Uw4wVV3ujuUuUhegy_cTrUHJ_vBXjbfakK5hBFhEhM4YINJ0kyZ04py9ChvtTfM4nuhNHETXi--3NRlt57w1Ze5jOMPqrMCLJYwz9VvlH6U_xGkzhnk8AxdIkk6QGWi_1s_64YUnokBAiuWb9gYzzxBCpKq"
                />
              </div>
              <span className="font-medium">JavaScript</span>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm">
                <img
                  alt="TypeScript"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALafiZmZblBQpCpp4NRCqJU296Ux0Q01Jevs9VofSdEi2a7UG4lgZ9JYR3b9eucuAM3G1CQ6mw2poFnmJzzGyQsr1gjW5nBZcclCiYbzGz2xbkxh9fkSRnIpkurgQsLA6H2DUs0KcIV675en6r94Y1e7P19h1wzPxI70Ff6Sn66LMyfwvHJLyRA1OjUDjCAitALlW4MGk5wFsLN3zNfbdzIg7XcfjrQulbdIXjwucqHEiLBSPS-tZgWwwxCtgHvnhQ6L4KGlgzUH4Y"
                />
              </div>
              <span className="font-medium">TypeScript</span>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm">
                <img
                  alt="Rust"
                  className="w-5 h-5 dark:invert"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBIWtLxcerWoEJCnecqjZu18xMDtvGv1iBYEQ3iX86JeCxh8TUBQtthAsUOAFrtE6Es7WWSEsOZCGv3ZqOloiRFqMZ1EgDbWKPZ2L6vcKILy-hzaUdqsxc5yK7Wc6FzxL5iY05FgaFdefZKT-KfSF9CU_cpltfle3_tLz6nkn8DcnK7jMBQt5sENAsTMKWDevB8l6OnItn-SPbGogki8i7VMW-oSGkspoANFRfb7LZ9HBoqvKwqzxqabVBsyt_zX6M7XK8XyJKJLd9"
                />
              </div>
              <span className="font-medium">Rust</span>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer">
              <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm">
                <img
                  alt="Swift"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0war99S5ouaKQm7I7Ut04W2zJhPx3LGoQTaBQ_OW52pl77RsFj2R_-yTPgFoEw5tMT7Wt2MGEOWpU7hOw_iWvBJwuXj1chk9KtN-9Q7P7iuMKxZ6-ZAGa8u4Tv9EOERCWQJ5b_nbeQZO-4X10veXkeB22MxuOfhHJnXpB7SVnAtdgygnSNzhLgU6Ec-QbQBDBzIvPXhYzbK7jLJfGremogkfAb3eQqmEgIon2uw2NDiEqsDqMAst426c2CqdvUjAPKdVC5Ts-PzOb"
                />
              </div>
              <span className="font-medium">Swift</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-200 dark:border-slate-800">
            <Link
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
              to="/"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Home
            </Link>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Link
                className="flex-grow md:flex-initial px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
                to="/ide"
              >
                Continue
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="mt-20 p-6 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
            <div className="text-primary mt-1">
              <span className="material-symbols-outlined">lightbulb</span>
            </div>
            <div>
              <h4 className="font-bold mb-1">Pro Tip</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                You can change these settings at any time from your dashboard. We recommend starting with a language you
                are most comfortable with to get the most out of the feedback loops.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">© 2026 BigO(You)</p>
      </footer>
    </div>
  )
}

export default Onboarding
