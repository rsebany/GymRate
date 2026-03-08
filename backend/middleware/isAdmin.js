const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Non authentifié' })
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé - Admin uniquement' })
  }
  next()
}

module.exports = isAdmin
