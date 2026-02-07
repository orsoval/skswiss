const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware pour parser le corps des requêtes
app.use(express.json());

// Routes de l'API
// Endpoint pour l'authentification
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Dans une vraie application, vous vérifieriez les identifiants dans une base de données
  // Ici, nous utilisons des données simulées pour la démonstration
  const users = [
    { id: 1, email: 'employee@example.com', password: 'password', role: 'employee', name: 'Jean Dupont', department: 'IT' },
    { id: 2, email: 'manager@example.com', password: 'password', role: 'manager', name: 'Marie Curie', department: 'IT' },
    { id: 3, email: 'rh@example.com', password: 'password', role: 'rh', name: 'Pierre Martin', department: 'RH' },
    { id: 4, email: 'admin@example.com', password: 'password', role: 'admin', name: 'Sophie Admin', department: 'Admin' },
  ];
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Retirer le mot de passe de la réponse
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
  } else {
    res.status(401).json({ success: false, message: 'Identifiants incorrects' });
  }
});

// Endpoint pour récupérer les congés
app.get('/api/leaves', (req, res) => {
  // Données simulées de congés
  const leaves = [
    { id: 1, employee: 'Jean Dupont', startDate: '2023-06-15', endDate: '2023-06-22', type: 'annual', status: 'approved' },
    { id: 2, employee: 'Marie Lambert', startDate: '2023-07-01', endDate: '2023-07-05', type: 'exceptional', status: 'pending' },
  ];
  
  res.json(leaves);
});

// Endpoint pour soumettre une demande de congé
app.post('/api/leaves', (req, res) => {
  const { startDate, endDate, type, reason, userId } = req.body;
  
  // Dans une vraie application, vous enregistreriez la demande dans une base de données
  const newLeaveRequest = {
    id: Date.now(), // ID temporaire
    startDate,
    endDate,
    type,
    reason,
    userId,
    status: 'pending',
    createdAt: new Date()
  };
  
  // Réponse simulée
  res.status(201).json({ success: true, leave: newLeaveRequest });
});

// Endpoint pour approuver/rejeter une demande de congé
app.put('/api/leaves/:id', (req, res) => {
  const { id } = req.params;
  const { status, rejectionReason } = req.body;
  
  // Dans une vraie application, vous mettriez à jour la base de données
  // Ici, nous retournons simplement une réponse positive
  res.json({ 
    success: true, 
    message: `Demande ${status === 'approved' ? 'approuvée' : 'rejetée'}`,
    updatedStatus: status
  });
});

// Route pour servir l'application React pour toutes les autres requêtes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});