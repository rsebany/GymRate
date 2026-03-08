import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthPage = () => {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motDePasse: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isSignUp) {
        await register(formData)
        setIsSignUp(false)
        setFormData((prev) => ({ ...prev, nom: '', prenom: '', telephone: '', motDePasse: '' }))
        alert('Inscription réussie. Connectez-vous.')
      } else {
        await login(formData.email, formData.motDePasse)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur')
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 min-h-[550px]">
        <div className="relative min-h-[250px] lg:min-h-full bg-gradient-to-br from-slate-600 to-slate-800">
          <img
            src="/management_bg.jpg"
            alt="Gestion de salle de sport"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl opacity-30" aria-hidden>💪</span>
          </div>
          <div className="absolute inset-0 bg-slate-800/60" />
        </div>

        <div className="flex flex-col justify-center p-8 sm:p-12">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {isSignUp ? 'Sign Up' : 'Se connecter'}
          </h1>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent outline-none" placeholder="Votre nom" />
                </div>
                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent outline-none" placeholder="Votre prénom" />
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent outline-none" placeholder="Votre numéro" />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent outline-none" placeholder="votre@email.com" />
            </div>
            <div>
              <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input type="password" id="motDePasse" name="motDePasse" value={formData.motDePasse} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-slate-600 focus:border-transparent outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full py-3 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700 transition-colors">
              {isSignUp ? "S'inscrire" : 'Se connecter'}
            </button>
          </form>

          <div className="relative flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="flex-shrink mx-4 text-sm text-gray-500">Ou</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>
          <button type="button" onClick={() => { setIsSignUp(!isSignUp); setError('') }} className="w-full py-3 bg-slate-800 text-white font-medium rounded-md hover:bg-slate-700 transition-colors">
            {isSignUp ? 'Se connecter' : "S'inscrire"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
