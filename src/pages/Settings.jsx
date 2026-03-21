import Sidebar from "../components/Sidebar";

function Settings({isUser}) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar></Sidebar>

        <main className="flex-1 flex flex-col min-w-0 ml-10 overflow-y-auto custom-scrollbar">
          <header className="px-8 pt-10 pb-8">
            <div className="flex flex-col gap-3 max-w-5xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
                  <span className="material-symbols-outlined text-teal-500 text-[24px]">settings</span>
                </div>
                <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Settings
                </h2>
              </div>
              <p className="text-slate-400 text-base max-w-2xl leading-relaxed mt-1">
                Manage your profile, adjust preferences, and secure your account.
              </p>
            </div>
          </header>

          <div className="px-8 max-w-4xl pb-24">
            <div className="space-y-12">
            
              {/* Profile Section */}
              <section>
                  <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined text-teal-500">person</span>
                      <h2 className="text-xl font-bold">Profile</h2>
                  </div>
                  <div className="bg-[#161b22] p-8 rounded-2xl border border-[#30363d] space-y-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                          <div className="relative group shrink-0">
                              <img alt="Profile avatar"
                                  className="w-24 h-24 rounded-full object-cover border-4 border-[#30363d]"
                                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3xZlo-ThyHRdciBZuCRNJI2wSdc4oUxh9jjjRoyYsajvNdGlHkMssTexg9Eu78IUqT4KEhtBUI4CW4dcmxljVUbZ-dLg-PVmpVefX_WGPiWtoLS_nxf2qzCvlOr02d7c4Cn0gAC8J7b_Bjgnd_1nrr0fvuHCEjsET9vrKhEfRxUodu2ylyB8tOGtNktMu9_nyY0X_aVGqUnvPGL6G584qBydbQ42k3NhqPkfUth-Si_KNZ2XBGS8shO_8FM3S13EbX7Z_Er3qoPPQ" />
                              <button
                                  className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center border border-[#161b22]">
                                  <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                              </button>
                          </div>
                          <div className="flex-1 w-full space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full
                                          Name</label>
                                      <input
                                          className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-slate-200 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all font-medium"
                                          type="text" defaultValue={isUser?.name || "Alex Rivera"} />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email
                                          Address</label>
                                      <input
                                          className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-slate-200 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all font-medium"
                                          type="email" defaultValue={isUser?.email || "alex.rivera@dev.io"} />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>

              {/* Account Section */}
              <section>
                  <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined text-teal-500">security</span>
                      <h2 className="text-xl font-bold">Account</h2>
                  </div>
                  <div className="bg-[#161b22] p-8 rounded-2xl border border-[#30363d] space-y-10">
                      
                      {/* Security & Privacy */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-[#30363d]">
                          <div className="space-y-1">
                              <p className="font-semibold text-slate-200">Security & Privacy</p>
                              <p className="text-sm text-slate-400">Manage your credentials and data privacy</p>
                          </div>
                          <div className="flex items-center gap-6 shrink-0">
                              <button
                                  className="px-5 py-2 border border-[#30363d] rounded-lg text-sm font-semibold hover:bg-[#1f242c] hover:text-white text-slate-300 transition-colors">
                                  Change Password
                              </button>
                              <button className="text-red-400 text-sm font-semibold hover:underline">
                                  Delete Account
                              </button>
                          </div>
                      </div>

                      {/* Reset Progress Section */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                          <div className="space-y-1">
                              <p className="font-semibold text-red-400">Reset Progress</p>
                              <p className="text-sm text-slate-400 max-w-md">This will permanently delete all your interview history and analytics. This action cannot be undone.</p>
                          </div>
                          <button
                              className="px-5 py-2 border border-red-500/40 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500/10 transition-colors uppercase tracking-wider shrink-0">
                              Reset All History
                          </button>
                      </div>
                  </div>
              </section>

              {/* Save Changes Area */}
              <div className="pt-4 flex justify-end">
                  <button
                      className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-2.5 rounded-lg font-bold text-sm transition-all focus:ring-2 focus:ring-teal-500/50 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      Save Changes
                  </button>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Settings
