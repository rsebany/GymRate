import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Subscriptions() {
  const [types, setTypes] = useState([])
  const [members, setMembers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [assignForm, setAssignForm] = useState({ member_id: '', subscription_id: '' })
  const [form, setForm] = useState({ type: '', duree_jours: '', prix: '', description: '' })

  const load = () => {
    api.get('/subscriptions/types').then(({ data }) => setTypes(data))
    api.get('/members').then(({ data }) => setMembers(data))
  }

  useEffect(() => { load() }, [])

  const handleCreateType = (e) => {
    e.preventDefault()
    api.post('/subscriptions/types', form).then(() => { load(); setShowForm(false); setForm({ type: '', duree_jours: '', prix: '', description: '' }) })
      .catch((err) => alert(err.response?.data?.message || 'Erreur'))
  }

  const handleAssign = (e) => {
    e.preventDefault()
    api.post('/subscriptions/assign', assignForm).then(() => { load(); setAssignForm({ member_id: '', subscription_id: '' }) })
      .catch((err) => alert(err.response?.data?.message || 'Erreur'))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Abonnements</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Types d'abonnement</h2>
            <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 text-sm">Nouveau type</button>
          </div>
          <ul className="space-y-2">
            {types.map((t) => (
              <li key={t.id} className="flex justify-between py-2 border-b">
                <span>{t.type} - {t.duree_jours} jours</span>
                <span className="font-medium">{t.prix} DH</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Associer un abonnement</h2>
          <form onSubmit={handleAssign} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Membre</label>
              <select required value={assignForm.member_id} onChange={(e) => setAssignForm({ ...assignForm, member_id: e.target.value })} className="w-full px-4 py-2 border rounded">
                <option value="">Sélectionner</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>{m.prenom} {m.nom}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select required value={assignForm.subscription_id} onChange={(e) => setAssignForm({ ...assignForm, subscription_id: e.target.value })} className="w-full px-4 py-2 border rounded">
                <option value="">Sélectionner</option>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>{t.type} - {t.prix} DH</option>
                ))}
              </select>
            </div>
            <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700">Associer</button>
          </form>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Nouveau type d'abonnement</h2>
            <form onSubmit={handleCreateType} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <input type="text" required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="Ex: Mensuel" className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Durée (jours)</label>
                <input type="number" required min="1" value={form.duree_jours} onChange={(e) => setForm({ ...form, duree_jours: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prix (DH)</label>
                <input type="number" required min="0" step="0.01" value={form.prix} onChange={(e) => setForm({ ...form, prix: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2 border rounded" />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Annuler</button>
                <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded">Créer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
