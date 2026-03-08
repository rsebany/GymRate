const bcrypt = require('bcryptjs')
const mysql = require('mysql2/promise')
require('dotenv').config()

async function seed() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'gym_management'
  })

  const hashedPassword = await bcrypt.hash('admin123', 10)
  await conn.execute(
    'INSERT INTO users (nom, prenom, email, telephone, password, role) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = VALUES(password)',
    ['Admin', 'Gym', 'admin@gym.com', null, hashedPassword, 'admin']
  )
  console.log('✅ Admin créé: admin@gym.com / admin123')

  await conn.end()
}

seed().catch(console.error)
