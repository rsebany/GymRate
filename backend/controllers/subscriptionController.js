const db = require('../config/db')

// Types d'abonnements
const getAllTypes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM subscriptions ORDER BY prix ASC')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const createType = async (req, res) => {
  try {
    const { type, duree_jours, prix, description } = req.body
    if (!type || !duree_jours || !prix) {
      return res.status(400).json({ message: 'Type, durée (jours) et prix requis' })
    }

    const [result] = await db.query(
      'INSERT INTO subscriptions (type, duree_jours, prix, description) VALUES (?, ?, ?, ?)',
      [type, parseInt(duree_jours), parseFloat(prix), description || null]
    )
    res.status(201).json({ id: result.insertId, type, duree_jours, prix })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const updateType = async (req, res) => {
  try {
    const { type, duree_jours, prix, description } = req.body
    const [result] = await db.query(
      'UPDATE subscriptions SET type = ?, duree_jours = ?, prix = ?, description = ? WHERE id = ?',
      [type, duree_jours, prix, description || null, req.params.id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Type non trouvé' })
    res.json({ message: 'Type mis à jour' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const deleteType = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM subscriptions WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Type non trouvé' })
    res.json({ message: 'Type supprimé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// Associer un abonnement à un membre
const assignToMember = async (req, res) => {
  try {
    const { member_id, subscription_id } = req.body
    if (!member_id || !subscription_id) {
      return res.status(400).json({ message: 'member_id et subscription_id requis' })
    }

    const [[sub]] = await db.query('SELECT duree_jours FROM subscriptions WHERE id = ?', [subscription_id])
    if (!sub) return res.status(404).json({ message: 'Type d\'abonnement non trouvé' })

    const dateDebut = new Date().toISOString().split('T')[0]
    const dateFin = new Date()
    dateFin.setDate(dateFin.getDate() + sub.duree_jours)

    await db.query(
      'INSERT INTO member_subscriptions (member_id, subscription_id, date_debut, date_fin, statut) VALUES (?, ?, ?, ?, ?)',
      [member_id, subscription_id, dateDebut, dateFin.toISOString().split('T')[0], 'actif']
    )

    const [[row]] = await db.query(
      'SELECT ms.*, s.type, s.prix FROM member_subscriptions ms JOIN subscriptions s ON ms.subscription_id = s.id WHERE ms.member_id = ? ORDER BY ms.id DESC LIMIT 1',
      [member_id]
    )
    res.status(201).json(row)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// Mettre à jour le statut des abonnements expirés
const updateExpiredStatus = async () => {
  await db.query(
    "UPDATE member_subscriptions SET statut = 'expire' WHERE date_fin < CURDATE() AND statut = 'actif'"
  )
}

module.exports = { getAllTypes, createType, updateType, deleteType, assignToMember, updateExpiredStatus }
