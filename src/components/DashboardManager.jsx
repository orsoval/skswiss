import React from 'react';
import { Link } from 'react-router-dom';

const DashboardManager = ({ user }) => {
  // Données simulées pour le manager
  const pendingRequests = [
    { id: 1, employee: 'Jean Dupont', startDate: '2023-06-15', endDate: '2023-06-22', type: 'Congé annuel', days: 6 },
    { id: 2, employee: 'Marie Lambert', startDate: '2023-07-01', endDate: '2023-07-05', type: 'Congé exceptionnel', days: 4 }
  ];
  
  const teamAvailability = [
    { employee: 'Jean Dupont', status: 'available', nextLeave: '2023-06-15' },
    { employee: 'Marie Lambert', status: 'available', nextLeave: '2023-07-01' },
    { employee: 'Pierre Dubois', status: 'on_leave', returnDate: '2023-02-20' },
    { employee: 'Sophie Martin', status: 'available', nextLeave: '-' }
  ];

  return (
    <div>
      <h1>Tableau de bord Manager</h1>
      
      <div className="dashboard-grid">
        <div className="card">
          <h2>Demandes en attente</h2>
          {pendingRequests.length > 0 ? (
            <ul className="leave-list">
              {pendingRequests.map(request => (
                <li key={request.id} className="leave-item">
                  <div>
                    <strong>{request.employee}</strong><br />
                    {request.type} - {request.days} jours<br />
                    Du {new Date(request.startDate).toLocaleDateString()} au {new Date(request.endDate).toLocaleDateString()}
                  </div>
                  <div>
                    <Link to={`/leave-management`} className="btn btn-primary">Traiter</Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucune demande en attente</p>
          )}
        </div>
        
        <div className="card">
          <h2>Disponibilité de l'équipe</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Employé</th>
                <th>Statut</th>
                <th>Prochain congé</th>
              </tr>
            </thead>
            <tbody>
              {teamAvailability.map((member, index) => (
                <tr key={index}>
                  <td>{member.employee}</td>
                  <td>
                    <span className={`status ${member.status === 'on_leave' ? 'status-rejected' : 'status-approved'}`}>
                      {member.status === 'on_leave' ? 'En congé' : 'Disponible'}
                    </span>
                  </td>
                  <td>
                    {member.nextLeave !== '-' ? new Date(member.nextLeave).toLocaleDateString() : '-'}
                    {member.returnDate && ` (retour: ${new Date(member.returnDate).toLocaleDateString()})`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="card">
          <h2>Vue synthétique</h2>
          <div className="summary-stats">
            <div className="stat-item">
              <span>Total équipe:</span>
              <strong>12 personnes</strong>
            </div>
            <div className="stat-item">
              <span>En congé actuellement:</span>
              <strong>2 personnes</strong>
            </div>
            <div className="stat-item">
              <span>Demandes en attente:</span>
              <strong>{pendingRequests.length}</strong>
            </div>
            <div className="stat-item">
              <span>Taux d'occupation:</span>
              <strong>85%</strong>
            </div>
          </div>
          <Link to="/leave-management" className="btn btn-primary" style={{ marginTop: '1rem' }}>Gérer les congés</Link>
        </div>
        
        <div className="card">
          <h2>Actions rapides</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/leave-management" className="btn btn-secondary">Voir toutes les demandes</Link>
            <Link to="/calendar" className="btn btn-secondary">Calendrier équipe</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;