-- Schema MySQL - Gestion de salle de sport
-- Exécuter ce fichier pour créer la base de données

CREATE DATABASE IF NOT EXISTS gym_management;
USE gym_management;

-- Table Users (Admin et Coach)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  telephone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'coach') NOT NULL DEFAULT 'coach',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Members
CREATE TABLE members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date_inscription DATE NOT NULL DEFAULT (CURRENT_DATE),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table Subscriptions (Types d'abonnement)
CREATE TABLE subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  duree_jours INT NOT NULL,
  prix DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table member_subscriptions (Association membre <-> abonnement avec dates)
CREATE TABLE member_subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  subscription_id INT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  statut ENUM('actif', 'expire', 'annule') DEFAULT 'actif',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE RESTRICT
);

-- Table Payments
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  member_subscription_id INT,
  montant DECIMAL(10, 2) NOT NULL,
  date_paiement DATE NOT NULL DEFAULT (CURRENT_DATE),
  methode VARCHAR(50) DEFAULT 'especes',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (member_subscription_id) REFERENCES member_subscriptions(id) ON DELETE SET NULL
);

-- Index pour optimiser les requêtes
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_member_subscriptions_dates ON member_subscriptions(date_debut, date_fin);
CREATE INDEX idx_payments_date ON payments(date_paiement);
CREATE INDEX idx_payments_member ON payments(member_id);

-- Données initiales (exécuter seed.js après création du schéma)
-- INSERT admin via: node database/seed.js
