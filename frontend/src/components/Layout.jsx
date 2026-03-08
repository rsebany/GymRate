import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="font-bold text-lg">Gym Management</Link>
              <Link to="/dashboard" className="hover:text-slate-300">Tableau de bord</Link>
              <Link to="/members" className="hover:text-slate-300">Membres</Link>
              {isAdmin && <Link to="/subscriptions" className="hover:text-slate-300">Abonnements</Link>}
              {isAdmin && <Link to="/payments" className="hover:text-slate-300">Paiements</Link>}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-300">{user?.prenom} {user?.nom} ({user?.role})</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded">Déconnexion</button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
