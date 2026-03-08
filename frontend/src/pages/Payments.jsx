import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Payments() {
  const [members, setMembers] = useState([])
  const [revenue, setRevenue] = useState(0)
  const [form, setForm] = useState({ member_id: '', montant: '', date_paiement: new Date().toISOString().split('T')[0], methode: 'especes' })

  const load = () => {
    api.get('/members').then(({ data }) => setMembers(data))
    api.get('/payments/monthly-revenue').then(({ data }) => setRevenue(data.revenue))
  }

  useEffect(() => { load() }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    api.post('/payments', form).then(() => { load(); setForm({ ...form, member_id: '', montant: '' }) })
      .catch((err) => alert(err.response?.data?.message || 'Erreur'))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Paiements</h1>

      <div className="bg-emerald-600 text-white rounded-lg p-6 mb-6 max-w-xs">
        <p className="text-sm opacity-90">Revenus du mois (DH)</p>
        <p className="text-2xl font-bold">{revenue?.toFixed(2) || '0'}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <h2 className="text-lg font-semibold mb-4">Enregistrer un paiement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Membre</label>
            <select required value={form.member_id} onChange={(e) => setForm({ ...form, member_id: e.target.value })} className="w-full px-4 py-2 border rounded">
              <option value="">Sélectionner</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>{m.prenom} {m.nom}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Montant (DH)</label>
            <input type="number" required min="0" step="0.01" value={form.montant} onChange={(e) => setForm({ ...form, montant: e.target.value })} className="w-full px-4 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" value={form.date_paiement} onChange={(e) => setForm({ ...form, date_paiement: e.target.value })} className="w-full px-4 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Méthode</label>
            <select value={form.methode} onChange={(e) => setForm({ ...form, methode: e.target.value })} className="w-full px-4 py-2 border rounded">
              <option value="especes">Espèces</option>
              <option value="carte">Carte</option>
              <option value="virement">Virement</option>
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700">Enregistrer</button>
        </form>
      </div>
    </div>
  )
}
