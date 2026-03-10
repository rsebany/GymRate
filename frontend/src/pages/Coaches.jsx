import { useState } from 'react'

const SAMPLE_COACHES = [
  { id: '001', nom: 'Rakoto', prenom: 'Jean', tel: '0340000000', activite: 'Yoga', dispo: 'Disponible', membres: 8 },
  { id: '002', nom: 'Andri', prenom: 'Marie', tel: '0320000000', activite: 'Musculation', dispo: 'Indisponible', membres: 12 },
  { id: '003', nom: 'Hery', prenom: 'Paul', tel: '0330000000', activite: 'Cardio', dispo: 'Disponible', membres: 5 },
]

export default function Coaches() {
  const [showCoachModal, setShowCoachModal] = useState(false)
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState(null)

  const openPlan = (coach) => {
    setSelectedCoach(coach)
    setShowPlanModal(true)
  }

  return (
    <div className="space-y-6 text-slate-800">
      {/* Cartes synthétiques */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">
          <p className="text-xs text-slate-500 mb-1">Nombre total de coachs</p>
          <p className="text-2xl font-semibold">12</p>
        </div>
        <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">
          <p className="text-xs text-slate-500 mb-1">Coach disponible aujourd’hui</p>
          <p className="text-2xl font-semibold">8</p>
        </div>
        <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">
          <p className="text-xs text-slate-500 mb-1">Sessions planifiées cette semaine</p>
          <p className="text-2xl font-semibold">46</p>
        </div>
      </section>

      {/* Barre d’outils */}
      <section className="border border-slate-200 rounded-lg bg-white p-4 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Rechercher par nom du coach"
          className="px-3 py-2 border border-slate-300 rounded-md text-sm flex-1 min-w-[180px]"
        />
        <select className="px-3 py-2 border border-slate-300 rounded-md text-sm">
          <option>Filtre disponibilité</option>
          <option>Disponible</option>
          <option>Indisponible</option>
          <option>En pause</option>
        </select>
        <select className="px-3 py-2 border border-slate-300 rounded-md text-sm">
          <option>Filtre activité</option>
          <option>Yoga</option>
          <option>Musculation</option>
          <option>Cardio</option>
          <option>Crossfit</option>
        </select>
        <button className="px-4 py-2 border border-slate-300 rounded-full text-xs">
          Exporter (Excel / PDF)
        </button>
        <button
          className="ml-auto px-4 py-2 bg-slate-900 text-white rounded-full text-xs"
          onClick={() => setShowCoachModal(true)}
        >
          + Ajouter un coach
        </button>
      </section>

      {/* Tableau + planning rapide */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,2.5fr),minmax(0,1.2fr)]">
        <div className="border border-slate-200 rounded-lg bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Liste des coachs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border-t border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">ID</th>
                  <th className="px-3 py-2 text-left font-semibold">Nom</th>
                  <th className="px-3 py-2 text-left font-semibold">Prénom</th>
                  <th className="px-3 py-2 text-left font-semibold">Téléphone</th>
                  <th className="px-3 py-2 text-left font-semibold">Spécialité / Activité</th>
                  <th className="px-3 py-2 text-left font-semibold">Disponibilité</th>
                  <th className="px-3 py-2 text-left font-semibold">Membres affectés</th>
                  <th className="px-3 py-2 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_COACHES.map((c) => (
                  <tr key={c.id} className="border-t border-slate-200">
                    <td className="px-3 py-2">{c.id}</td>
                    <td className="px-3 py-2">{c.nom}</td>
                    <td className="px-3 py-2">{c.prenom}</td>
                    <td className="px-3 py-2">{c.tel}</td>
                    <td className="px-3 py-2">{c.activite}</td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          'px-2 py-1 rounded-full text-[10px] ' +
                          (c.dispo === 'Disponible'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700')
                        }
                      >
                        {c.dispo}
                      </span>
                    </td>
                    <td className="px-3 py-2">{c.membres}</td>
                    <td className="px-3 py-2 space-x-2">
                      <button className="text-xs" title="Modifier">✏️</button>
                      <button className="text-xs" title="Supprimer">🗑️</button>
                      <button
                        className="text-xs"
                        title="Planifier"
                        onClick={() => openPlan(c)}
                      >
                        📅
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500">
            <div>{'<< Précédent 1 2 3 … Suivant >>'}</div>
            <div>Affichage 1–10 sur 12 coachs</div>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg bg-slate-50 p-4">
          <h3 className="text-sm font-semibold mb-3">Planning rapide</h3>
          <ul className="space-y-2 text-xs">
            <li>Jean Rakoto — Yoga — 10h–11h — 4 membres</li>
            <li>Marie Andri — Musculation — 12h–13h — 6 membres</li>
            <li>Paul Hery — Cardio — 17h–18h — 3 membres</li>
          </ul>
          <button
            className="mt-4 px-3 py-2 border border-slate-300 rounded-full text-[11px]"
            onClick={() => setShowPlanModal(true)}
          >
            Planifier session
          </button>
        </div>
      </section>

      {/* Modal Ajouter coach */}
      {showCoachModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg border border-slate-200 w-full max-w-lg p-5 text-xs">
            <h2 className="text-sm font-semibold mb-4">Ajouter un nouveau coach</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block mb-1">Nom</label>
                <input className="w-full border border-slate-300 rounded px-2 py-1" />
              </div>
              <div>
                <label className="block mb-1">Prénom</label>
                <input className="w-full border border-slate-300 rounded px-2 py-1" />
              </div>
              <div>
                <label className="block mb-1">Téléphone</label>
                <input className="w-full border border-slate-300 rounded px-2 py-1" />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input className="w-full border border-slate-300 rounded px-2 py-1" />
              </div>
              <div className="col-span-2">
                <label className="block mb-1">Spécialité / Activité</label>
                <select className="w-full border border-slate-300 rounded px-2 py-1">
                  <option>Yoga</option>
                  <option>Musculation</option>
                  <option>Cardio</option>
                  <option>Crossfit</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block mb-1">Disponibilité (jours et créneaux)</label>
                <textarea className="w-full border border-slate-300 rounded px-2 py-1 h-16" />
              </div>
              <div className="col-span-2">
                <label className="block mb-1">Membres affectés</label>
                <input
                  className="w-full border border-slate-300 rounded px-2 py-1"
                  placeholder="Multi-sélection ou 'Affecter plus tard'"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-2 border border-slate-300 rounded-full"
                onClick={() => setShowCoachModal(false)}
              >
                Annuler
              </button>
              <button className="px-3 py-2 bg-slate-900 text-white rounded-full">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Planifier coach */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg border border-slate-200 w-full max-w-2xl p-5 text-xs">
            <h2 className="text-sm font-semibold mb-3">
              Planifier coach {selectedCoach ? `${selectedCoach.prenom} ${selectedCoach.nom}` : ''}
            </h2>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((d) => (
                <div key={d} className="border border-slate-200 rounded p-2 h-24 flex flex-col text-[10px]">
                  <div className="font-semibold mb-1">{d}</div>
                  <div className="flex-1 border border-dashed border-slate-300 rounded" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mb-3 text-[10px]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-300" /> Disponible
                <span className="inline-block w-3 h-3 rounded-full bg-amber-300" /> Partiellement réservé
                <span className="inline-block w-3 h-3 rounded-full bg-red-300" /> Indisponible
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-2 border border-slate-300 rounded-full"
                onClick={() => setShowPlanModal(false)}
              >
                Annuler
              </button>
              <button className="px-3 py-2 bg-slate-900 text-white rounded-full">
                Enregistrer planification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

