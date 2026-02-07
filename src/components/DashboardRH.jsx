import React from 'react';
import { Link } from 'react-router-dom';

const DashboardRH = ({ user }) => {
  // Données simulées pour le responsable RH
  const leaveStats = {
    totalEmployees: 45,
    employeesOnLeave: 8,
    pendingRequests: 12,
    approvedRequests: 320,
    rejectedRequests: 15
  };
  
  const recentActivities = [
    { id: 1, action: 'Demande approuvée', employee: 'Jean Dupont', date: '2023-02-15', type: 'Congé annuel' },
    { id: 2, action: 'Demande rejetée', employee: 'Marie Lambert', date: '2023-02-14', type: 'Congé exceptionnel' },
    { id: 3, action: 'Nouvelle demande', employee: 'Pierre Dubois', date: '2023-02-14', type: 'Congé maladie' },
    { id: 4, action: 'Congé commencé', employee: 'Sophie Martin', date: '2023-02-13', type: 'Congé maternité' }
  ];

  return (
    <div>
      <h1>Tableau de bord RH</h1>
      
      <div className="dashboard-grid">
        <div className="card">
          <h2>Vue globale entreprise</h2>
          <div className="summary-stats">
            <div className="stat-item">
              <span>Employés:</span>
              <strong>{leaveStats.totalEmployees}</strong>
            </div>
            <div className="stat-item">
              <span>En congé:</span>
              <strong>{leaveStats.employeesOnLeave}</strong>
            </div>
            <div className="stat-item">
              <span>Demandes en attente:</span>
              <strong>{leaveStats.pendingRequests}</strong>
            </div>
            <div className="stat-item">
              <span>Taux d'absentéisme:</span>
              <strong>17.8%</strong>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2>Statistiques congés</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>Demandes approuvées</h3>
              <p className="stat-number">{leaveStats.approvedRequests}</p>
            </div>
            <div className="stat-box">
              <h3>Demandes rejetées</h3>
              <p className="stat-number">{leaveStats.rejectedRequests}</p>
            </div>
          </div>
          <Link to="/leave-management" className="btn btn-primary" style={{ marginTop: '1rem' }}>Voir détails</Link>
        </div>
        
        <div className="card">
          <h2>Activités récentes</h2>
          <ul className="activity-list">
            {recentActivities.map(activity => (
              <li key={activity.id} className="activity-item">
                <div>
                  <strong>{activity.action}</strong><br />
                  <span className="text-muted">{activity.employee} - {activity.type}</span>
                </div>
                <small>{new Date(activity.date).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
          <Link to="/leave-management" className="btn btn-secondary">Voir tout</Link>
        </div>
        
        <div className="card">
          <h2>Actions RH</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/leave-management" className="btn btn-secondary">Gérer les demandes</Link>
            <Link to="/calendar" className="btn btn-secondary">Calendrier global</Link>
            <button className="btn btn-secondary">Exporter données (PDF)</button>
            <button className="btn btn-secondary">Exporter données (Excel)</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRH;