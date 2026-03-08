const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Token invalide ou expiré' })
  }
}

module.exports = auth
