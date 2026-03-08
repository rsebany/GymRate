const db = require('../config/db')

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT m.*, 
        (SELECT ms.statut FROM member_subscriptions ms 
         WHERE ms.member_id = m.id AND ms.statut = 'actif' 
         AND CURDATE() BETWEEN ms.date_debut AND ms.date_fin 
         ORDER BY ms.date_fin DESC LIMIT 1) as statut_abonnement
      FROM members m ORDER BY m.created_at DESC`
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const getById = async (req, res) => {
  try {
    const [members] = await db.query('SELECT * FROM members WHERE id = ?', [req.params.id])
    if (!members.length) return res.status(404).json({ message: 'Membre non trouvé' })

    const [subscriptions] = await db.query(
      `SELECT ms.*, s.type, s.duree_jours, s.prix 
       FROM member_subscriptions ms 
       JOIN subscriptions s ON ms.subscription_id = s.id 
       WHERE ms.member_id = ? ORDER BY ms.date_debut DESC`,
      [req.params.id]
    )

    const [payments] = await db.query(
      'SELECT * FROM payments WHERE member_id = ? ORDER BY date_paiement DESC',
      [req.params.id]
    )

    res.json({ ...members[0], abonnements: subscriptions, paiements: payments })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const create = async (req, res) => {
  try {
    const { nom, prenom, telephone, email } = req.body
    if (!nom || !prenom || !telephone || !email) {
      return res.status(400).json({ message: 'Nom, prénom, téléphone et email requis' })
    }

    const [result] = await db.query(
      'INSERT INTO members (nom, prenom, telephone, email) VALUES (?, ?, ?, ?)',
      [nom, prenom, telephone, email]
    )
    res.status(201).json({ id: result.insertId, nom, prenom, telephone, email })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const update = async (req, res) => {
  try {
    const { nom, prenom, telephone, email } = req.body
    const [result] = await db.query(
      'UPDATE members SET nom = ?, prenom = ?, telephone = ?, email = ? WHERE id = ?',
      [nom, prenom, telephone, email, req.params.id]
    )
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Membre non trouvé' })
    res.json({ message: 'Membre mis à jour' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const remove = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM members WHERE id = ?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Membre non trouvé' })
    res.json({ message: 'Membre supprimé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

module.exports = { getAll, getById, create, update, remove }
