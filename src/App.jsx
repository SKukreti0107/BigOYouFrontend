import { Navigate, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Onboarding from './pages/Onboarding.jsx'
import InterviewPage from './pages/InterviewPage.jsx'
import History from './pages/History.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Practice from './pages/Practice.jsx'
import api from "./components/Api.jsx"
import ProtectedRoute from './components/ProtectedRoute.jsx'
import BackdropLoader from './components/BackdropLoader.jsx'
// import InterviewFeedback from './components/InterviewFeedback.jsx'


function App() {

  const [isUser, setIsUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get("/me")
      setIsUser(res.data)
      return res.data;
    } catch (err) {
      setIsUser(null)
      return null
    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      // <div>Loading...</div>
      <BackdropLoader></BackdropLoader>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login checkAuth={checkAuth} />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/interviewPage/:sessionId" element={<ProtectedRoute isUser={isUser}> <InterviewPage /></ProtectedRoute> } />
      <Route path="/history" element={<History />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path='/dashboard' element={
        <ProtectedRoute isUser={isUser}><Dashboard setIsUser={setIsUser}></Dashboard></ProtectedRoute>
      } />
      <Route path='/practice' element={<ProtectedRoute isUser={isUser}>
        <Practice />
      </ProtectedRoute>}></Route>
      {/* <Route path="/feedback" element={<InterviewFeedback></InterviewFeedback> } /> */}
    </Routes>
  )
}

export default App
