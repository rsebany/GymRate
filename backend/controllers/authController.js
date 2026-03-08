const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/db')

const register = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, password } = req.body
    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ message: 'Nom, prénom, email et mot de passe requis' })
    }

    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.query(
      'INSERT INTO users (nom, prenom, email, telephone, password, role) VALUES (?, ?, ?, ?, ?, ?)',
      [nom, prenom, email, telephone || null, hashedPassword, 'coach']
    )

    res.status(201).json({ message: 'Inscription réussie' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' })
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    if (!users.length) {
      return res.status(401).json({ message: 'Identifiants incorrects' })
    }

    const user = users[0]
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: 'Identifiants incorrects' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const me = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, nom, prenom, email, role FROM users WHERE id = ?', [req.user.id])
    if (!users.length) return res.status(404).json({ message: 'Utilisateur non trouvé' })
    res.json(users[0])
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

module.exports = { register, login, me }
