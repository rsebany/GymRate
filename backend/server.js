require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const memberRoutes = require('./routes/memberRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Gym Management API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/subscriptions', subscriptionRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
})
