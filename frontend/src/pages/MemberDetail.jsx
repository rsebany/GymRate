import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function MemberDetail() {
  const { id } = useParams()
  const { isAdmin } = useAuth()
  const [member, setMember] = useState(null)

  useEffect(() => {
    api.get(`/members/${id}`).then(({ data }) => setMember(data))
  }, [id])

  if (!member) return <div className="text-center py-12">Chargement...</div>

  return (
    <div>
      <Link to="/members" className="text-slate-600 hover:underline mb-4 inline-block">← Retour aux membres</Link>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{member.prenom} {member.nom}</h1>
        <p className="text-gray-600 mt-1">{member.email}</p>
        <p className="text-gray-600">{member.telephone}</p>
        <p className="text-sm text-gray-500 mt-2">Inscrit le {new Date(member.date_inscription).toLocaleDateString('fr-FR')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Abonnements</h2>
          {member.abonnements?.length ? (
            <ul className="space-y-2">
              {member.abonnements.map((a) => (
                <li key={a.id} className="flex justify-between items-center py-2 border-b">
                  <span>{a.type} - {a.prix} DH</span>
                  <span className={`text-sm ${a.statut === 'actif' ? 'text-green-600' : 'text-gray-500'}`}>
                    {a.date_debut} → {a.date_fin} ({a.statut})
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun abonnement</p>
          )}
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Paiements</h2>
          {member.paiements?.length ? (
            <ul className="space-y-2">
              {member.paiements.map((p) => (
                <li key={p.id} className="flex justify-between py-2 border-b">
                  <span>{p.montant} DH</span>
                  <span className="text-sm text-gray-500">{new Date(p.date_paiement).toLocaleDateString('fr-FR')}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucun paiement</p>
          )}
        </div>
      </div>
    </div>
  )
}
