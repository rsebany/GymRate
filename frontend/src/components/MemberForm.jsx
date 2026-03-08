import { useState, useEffect } from 'react'
import api from '../services/api'

export default function MemberForm({ member, onClose, onSave }) {
  const [form, setForm] = useState({ nom: '', prenom: '', telephone: '', email: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (member) setForm({ nom: member.nom, prenom: member.prenom, telephone: member.telephone, email: member.email })
  }, [member])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    const req = member ? api.put(`/members/${member.id}`, form) : api.post('/members', form)
    req.then(onSave).catch((err) => alert(err.response?.data?.message || 'Erreur')).finally(() => setLoading(false))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{member ? 'Modifier' : 'Ajouter'} un membre</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className="w-full px-4 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input type="text" required value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} className="w-full px-4 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" required value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} className="w-full px-4 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2 border rounded" />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-50">Annuler</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 disabled:opacity-50">
              {loading ? 'En cours...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
