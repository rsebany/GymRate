const db = require('../config/db')
const { updateExpiredStatus } = require('./subscriptionController')

const create = async (req, res) => {
  try {
    const { member_id, member_subscription_id, montant, date_paiement, methode, notes } = req.body
    if (!member_id || !montant) {
      return res.status(400).json({ message: 'member_id et montant requis' })
    }

    const date = date_paiement || new Date().toISOString().split('T')[0]

    const [result] = await db.query(
      'INSERT INTO payments (member_id, member_subscription_id, montant, date_paiement, methode, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [member_id, member_subscription_id || null, parseFloat(montant), date, methode || 'especes', notes || null]
    )
    res.status(201).json({ id: result.insertId, member_id, montant, date_paiement: date })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const getByMember = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM payments WHERE member_id = ? ORDER BY date_paiement DESC',
      [req.params.memberId]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// Revenus du mois courant
const getMonthlyRevenue = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT COALESCE(SUM(montant), 0) as total 
       FROM payments 
       WHERE YEAR(date_paiement) = YEAR(CURDATE()) AND MONTH(date_paiement) = MONTH(CURDATE())`
    )
    res.json({ revenue: parseFloat(rows[0].total) })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

module.exports = { create, getByMember, getMonthlyRevenue }
