import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../components/Api";
import BackdropLoader from "../components/BackdropLoader";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

function Settings({ isUser, checkAuth }) {
  const navigate = useNavigate();

  // Profile Form States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // UI Control States
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, message: "", severity: "success" });

  // Password Modal States
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Confirmation Modals States
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Sync state with logged-in user
  useEffect(() => {
    if (isUser) {
      setUsername(isUser.username || "");
      setEmail(isUser.email || "");
    }
  }, [isUser]);

  // Profile update submission
  const handleSaveProfile = async () => {
    if (!email) {
      setAlertInfo({ show: true, message: "Email is required.", severity: "error" });
      return;
    }
    try {
      setLoading(true);
      const res = await api.put("/user/profile", { username, email });
      setAlertInfo({ show: true, message: "Profile updated successfully!", severity: "success" });
      if (checkAuth) {
        await checkAuth();
      }
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Failed to update profile.";
      setAlertInfo({ show: true, message: errMsg, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Password change submission
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("All password fields are required.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await api.put("/user/password", {
        current_password: currentPassword,
        new_password: newPassword
      });
      setPasswordSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess("");
      }, 1500);
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Failed to change password.";
      setPasswordError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Progress reset submission
  const handleResetProgress = async () => {
    try {
      setLoading(true);
      await api.delete("/user/progress");
      setAlertInfo({ show: true, message: "All progress and history have been successfully reset.", severity: "success" });
      setShowResetConfirm(false);
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Failed to reset progress.";
      setAlertInfo({ show: true, message: errMsg, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Account deletion submission
  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await api.delete("/user/account");
      localStorage.removeItem("access_token");
      setShowDeleteConfirm(false);
      if (checkAuth) {
        await checkAuth();
      }
      navigate("/login");
    } catch (err) {
      const errMsg = err.response?.data?.detail || "Failed to delete account.";
      setAlertInfo({ show: true, message: errMsg, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar />

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
                                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                                      <input
                                          className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-slate-200 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all font-medium"
                                          type="text" 
                                          value={username} 
                                          onChange={(e) => setUsername(e.target.value)} 
                                          placeholder="e.g. Alex Rivera" 
                                      />
                                  </div>
                                  <div className="space-y-2">
                                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                                      <input
                                          className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-slate-200 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all font-medium"
                                          type="email" 
                                          value={email} 
                                          onChange={(e) => setEmail(e.target.value)} 
                                          placeholder="e.g. alex.rivera@dev.io" 
                                      />
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
                                  onClick={() => setShowPasswordModal(true)}
                                  className="px-5 py-2 border border-[#30363d] rounded-lg text-sm font-semibold hover:bg-[#1f242c] hover:text-white text-slate-300 transition-colors">
                                  Change Password
                              </button>
                              <button 
                                  onClick={() => setShowDeleteConfirm(true)}
                                  className="text-red-400 text-sm font-semibold hover:underline">
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
                              onClick={() => setShowResetConfirm(true)}
                              className="px-5 py-2 border border-red-500/40 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500/10 transition-colors uppercase tracking-wider shrink-0">
                              Reset All History
                          </button>
                      </div>
                  </div>
              </section>

              {/* Save Changes Area */}
              <div className="pt-4 flex justify-end">
                  <button
                      onClick={handleSaveProfile}
                      className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-2.5 rounded-lg font-bold text-sm transition-all focus:ring-2 focus:ring-teal-500/50 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      Save Changes
                  </button>
              </div>

            </div>
          </div>
        </main>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl p-6 shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
                <span className="material-symbols-outlined text-teal-500 text-[20px]">lock_reset</span>
              </div>
              <h3 className="text-xl font-bold text-white">Change Password</h3>
            </div>
            
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-slate-200 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-slate-200 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg p-3 text-slate-200 outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>

              {passwordError && (
                <div className="text-red-400 text-xs font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="text-teal-400 text-xs font-medium bg-teal-500/10 border border-teal-500/20 p-3 rounded-lg">
                  {passwordSuccess}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border border-[#30363d] rounded-lg text-sm font-semibold hover:bg-[#1f242c] text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-bold transition-all focus:ring-2 focus:ring-teal-500/50"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Progress Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161b22] border border-red-500/20 rounded-2xl p-6 shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setShowResetConfirm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="material-symbols-outlined text-red-400 text-[20px]">warning</span>
              </div>
              <h3 className="text-xl font-bold text-white">Reset Progress</h3>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              Are you absolutely sure you want to reset all your progress? This will <span className="text-red-400 font-semibold">permanently delete</span> all your interview history, code snapshots, AI feedback, and performance analytics. 
            </p>
            <p className="text-xs text-slate-400">
              This action is immediate and cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-[#30363d] rounded-lg text-sm font-semibold hover:bg-[#1f242c] text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-bold transition-all focus:ring-2 focus:ring-red-500/50"
              >
                Reset All History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161b22] border border-red-500/40 rounded-2xl p-6 shadow-2xl space-y-6 relative">
            <button 
              onClick={() => setShowDeleteConfirm(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/40">
                <span className="material-symbols-outlined text-red-500 text-[20px]">report</span>
              </div>
              <h3 className="text-xl font-bold text-white">Delete Account</h3>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                You are about to <span className="text-red-500 font-bold">PERMANENTLY DELETE</span> your BigO(You) account. 
              </p>
              <ul className="text-xs text-slate-400 list-disc list-inside space-y-1">
                <li>Your profile and credentials will be removed.</li>
                <li>All active and completed mock sessions will be erased.</li>
                <li>You will be signed out instantly.</li>
              </ul>
              <p className="text-xs text-red-400 font-medium">
                This action is destructive and irreversible.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-[#30363d] rounded-lg text-sm font-semibold hover:bg-[#1f242c] text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-bold transition-all focus:ring-2 focus:ring-red-500/50"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar Alert Toast */}
      <Snackbar 
        open={alertInfo.show} 
        autoHideDuration={4000} 
        onClose={() => setAlertInfo({ ...alertInfo, show: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setAlertInfo({ ...alertInfo, show: false })} 
          severity={alertInfo.severity} 
          sx={{ 
            width: '100%', 
            bgcolor: alertInfo.severity === 'success' ? '#0f5132' : '#842029', 
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid',
            borderColor: alertInfo.severity === 'success' ? '#198754' : '#dc3545',
            '& .MuiAlert-icon': {
              color: '#fff'
            }
          }}
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>

      {loading && <BackdropLoader />}
    </div>
  );
}

export default Settings;
