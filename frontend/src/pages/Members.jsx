import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import MemberForm from '../components/MemberForm'

export default function Members() {
  const { isAdmin } = useAuth()
  const [members, setMembers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const load = () => api.get('/members').then(({ data }) => setMembers(data))

  useEffect(() => { load() }, [])

  const handleDelete = (id) => {
    if (confirm('Supprimer ce membre ?')) api.delete(`/members/${id}`).then(load)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Membres</h1>
        {isAdmin && (
          <button onClick={() => { setEditing(null); setShowForm(true) }} className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700">
            Ajouter un membre
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Nom</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Téléphone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Statut</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">{m.prenom} {m.nom}</td>
                <td className="px-4 py-3">{m.telephone}</td>
                <td className="px-4 py-3">{m.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${m.statut_abonnement === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                    {m.statut_abonnement === 'actif' ? 'Actif' : '-'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/members/${m.id}`} className="text-blue-600 hover:underline mr-2">Détails</Link>
                  {isAdmin && (
                    <>
                      <button onClick={() => { setEditing(m); setShowForm(true) }} className="text-amber-600 hover:underline mr-2">Modifier</button>
                      <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:underline">Supprimer</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && isAdmin && (
        <MemberForm
          member={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSave={() => { load(); setShowForm(false); setEditing(null) }}
        />
      )}
    </div>
  )
}
