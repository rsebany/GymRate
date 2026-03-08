const db = require('../config/db')
const { updateExpiredStatus } = require('./subscriptionController')

const getStats = async (req, res) => {
  try {
    await updateExpiredStatus()

    const [[totalMembers]] = await db.query('SELECT COUNT(*) as count FROM members')
    const [[activeMembers]] = await db.query(
      `SELECT COUNT(DISTINCT member_id) as count FROM member_subscriptions 
       WHERE statut = 'actif' AND CURDATE() BETWEEN date_debut AND date_fin`
    )
    const [[expiredSubscriptions]] = await db.query(
      `SELECT COUNT(*) as count FROM member_subscriptions 
       WHERE statut = 'expire' OR (date_fin < CURDATE())`
    )
    const [[monthlyRevenue]] = await db.query(
      `SELECT COALESCE(SUM(montant), 0) as total FROM payments 
       WHERE YEAR(date_paiement) = YEAR(CURDATE()) AND MONTH(date_paiement) = MONTH(CURDATE())`
    )

    res.json({
      totalMembers: totalMembers.count,
      activeMembers: activeMembers.count,
      expiredSubscriptions: expiredSubscriptions.count,
      monthlyRevenue: parseFloat(monthlyRevenue.total)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

module.exports = { getStats }
