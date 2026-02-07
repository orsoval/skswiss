import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Composants
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import DashboardEmployee from './components/DashboardEmployee';
import DashboardManager from './components/DashboardManager';
import DashboardRH from './components/DashboardRH';
import LeaveRequestForm from './components/LeaveRequestForm';
import LeaveCalendar from './components/LeaveCalendar';
import LeaveManagement from './components/LeaveManagement';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Simuler une connexion utilisateur
  const mockLogin = (email, password) => {
    // Dans une vraie application, cette logique serait côté serveur
    const users = [
      { id: 1, email: 'employee@example.com', password: 'password', role: 'employee', name: 'Jean Dupont', department: 'IT' },
      { id: 2, email: 'manager@example.com', password: 'password', role: 'manager', name: 'Marie Curie', department: 'IT' },
      { id: 3, email: 'rh@example.com', password: 'password', role: 'rh', name: 'Pierre Martin', department: 'RH' },
      { id: 4, email: 'admin@example.com', password: 'password', role: 'admin', name: 'Sophie Admin', department: 'Admin' },
    ];

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="app">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        
        <main className="main-content">
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={
                  currentUser ? (
                    currentUser.role === 'employee' ? <DashboardEmployee user={currentUser} /> :
                    currentUser.role === 'manager' ? <DashboardManager user={currentUser} /> :
                    currentUser.role === 'rh' ? <DashboardRH user={currentUser} /> :
                    <DashboardRH user={currentUser} />
                  ) : <Navigate to="/login" />
                } 
              />
              
              <Route path="/login" element={<Login onLogin={mockLogin} />} />
              <Route path="/leave-request" element={currentUser ? <LeaveRequestForm user={currentUser} /> : <Navigate to="/login" />} />
              <Route path="/calendar" element={currentUser ? <LeaveCalendar user={currentUser} /> : <Navigate to="/login" />} />
              <Route path="/leave-management" element={currentUser && (currentUser.role === 'manager' || currentUser.role === 'rh') ? <LeaveManagement user={currentUser} /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;