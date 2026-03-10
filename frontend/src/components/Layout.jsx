import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PAGE_CONFIG = {
  dashboard: {
    title: 'Tableau de bord',
    subtitle: '',
    searchPlaceholder: 'Rechercher un membre...',
    primaryLabel: '+ Ajouter membre',
  },
  members: {
    title: 'Gestion des membres',
    subtitle: 'Gérer les informations et abonnements des membres',
    searchPlaceholder: 'Rechercher un membre...',
    primaryLabel: 'Ajouter un membre',
  },
  subscriptions: {
    title: 'Gestion des abonnements',
    subtitle: 'Configurer et suivre les abonnements des membres',
    searchPlaceholder: 'Rechercher un abonnement ou un membre...',
    primaryLabel: 'Créer un abonnement',
  },
  payments: {
    title: 'Gestion des paiements',
    subtitle: 'Enregistrer et suivre les paiements des membres',
    searchPlaceholder: 'Rechercher un paiement…',
    primaryLabel: '+ Enregistrer un paiement',
  },
  coaches: {
    title: 'Gestion des coachs',
    subtitle: 'Ajouter, planifier et suivre l’affectation des coachs',
    searchPlaceholder: 'Rechercher un coach…',
    primaryLabel: '+ Ajouter un coach',
  },
}

export default function Layout({ children, page }) {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const cfg = PAGE_CONFIG[page] || PAGE_CONFIG.dashboard

  const linkClasses = (to) =>
    [
      'flex items-center gap-2 px-3 py-2 rounded-full text-sm',
      location.pathname.startsWith(to) ? 'bg-slate-900 text-white' : 'text-slate-200 hover:bg-slate-700',
    ].join(' ')

  return (
    <div className="min-h-screen bg-slate-100 grid grid-cols-[220px,1fr] grid-rows-[64px,1fr]">
      {/* SIDEBAR */}
      <aside className="row-span-2 col-start-1 bg-slate-900 text-slate-100 border-r border-slate-800 flex flex-col gap-6 p-4">
        <div className="font-bold text-lg tracking-[0.15em]">GYM MANAGER</div>
        <nav className="flex flex-col gap-1 text-sm">
          <Link to="/dashboard" className={linkClasses('/dashboard')}>
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          <Link to="/members" className={linkClasses('/members')}>
            <span>👤</span>
            <span>Gestion des membres</span>
          </Link>
          {isAdmin && (
            <Link to="/subscriptions" className={linkClasses('/subscriptions')}>
              <span>🗓</span>
              <span>Gestion des abonnements</span>
            </Link>
          )}
          {isAdmin && (
            <Link to="/payments" className={linkClasses('/payments')}>
              <span>💳</span>
              <span>Gestion des paiements</span>
            </Link>
          )}
          {isAdmin && (
            <Link to="/coaches" className={linkClasses('/coaches')}>
              <span>🏋️</span>
              <span>Gestion des coachs</span>
            </Link>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 px-3 py-2 rounded-full text-sm text-slate-200 hover:bg-slate-700 text-left"
          >
            <span>⏻</span>
            <span>Déconnexion</span>
          </button>
        </nav>
      </aside>

      {/* HEADER */}
      <header className="col-start-2 row-start-1 border-b border-slate-200 bg-slate-50 flex items-center px-6 gap-6">
        <div className="flex flex-col gap-1">
          <div className="text-lg font-semibold text-slate-900">{cfg.title}</div>
          {cfg.subtitle && <div className="text-xs text-slate-500">{cfg.subtitle}</div>}
        </div>

        <div className="flex-1 flex justify-center">
          {cfg.searchPlaceholder && (
            <input
              type="text"
              placeholder={cfg.searchPlaceholder}
              className="w-full max-w-md px-4 py-2 rounded-full border border-slate-300 bg-white text-sm"
            />
          )}
        </div>

        <div className="flex items-center gap-3">
          {cfg.primaryLabel && (
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium"
            >
              {cfg.primaryLabel}
            </button>
          )}
          <span className="text-lg">🔔</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-300" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-800">Admin</span>
              <span className="text-[10px] text-slate-500">
                Profil · Paramètres · Déconnexion
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="col-start-2 row-start-2 p-6 bg-slate-100 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
