import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import MemberDetail from './pages/MemberDetail'
import Subscriptions from './pages/Subscriptions'
import Payments from './pages/Payments'

function PrivateRoute({ children, adminOnly }) {
  const { user, loading, isAdmin } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>
  if (!user) return <Navigate to="/" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
      <Route path="/members" element={<PrivateRoute><Layout><Members /></Layout></PrivateRoute>} />
      <Route path="/members/:id" element={<PrivateRoute><Layout><MemberDetail /></Layout></PrivateRoute>} />
      <Route path="/subscriptions" element={<PrivateRoute adminOnly><Layout><Subscriptions /></Layout></PrivateRoute>} />
      <Route path="/payments" element={<PrivateRoute adminOnly><Layout><Payments /></Layout></PrivateRoute>} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
