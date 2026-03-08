import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setStats(data))
  }, [])

  if (!stats) return <div className="text-center py-12">Chargement...</div>

  const cards = [
    { label: 'Total membres', value: stats.totalMembers, color: 'bg-blue-500' },
    { label: 'Membres actifs', value: stats.activeMembers, color: 'bg-green-500' },
    { label: 'Abonnements expirés', value: stats.expiredSubscriptions, color: 'bg-amber-500' },
    { label: 'Revenus du mois (DH)', value: stats.monthlyRevenue?.toFixed(2) || '0', color: 'bg-emerald-600' }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className={`${c.color} text-white rounded-lg p-6 shadow`}>
            <p className="text-sm opacity-90">{c.label}</p>
            <p className="text-2xl font-bold mt-1">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
