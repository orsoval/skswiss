import React from 'react';
import { Link } from 'react-router-dom';

const DashboardEmployee = ({ user }) => {
  // Données simulées pour l'employé
  const leaveBalance = {
    annual: 25,
    sick: 8,
    exceptional: 3,
    unpaid: 0
  };
  
  const upcomingLeaves = [
    { id: 1, startDate: '2023-06-15', endDate: '2023-06-22', type: 'Congé annuel', status: 'approved' },
    { id: 2, startDate: '2023-08-10', endDate: '2023-08-15', type: 'Congé exceptionnel', status: 'pending' }
  ];
  
  const leaveHistory = [
    { id: 3, startDate: '2023-02-01', endDate: '2023-02-05', type: 'Congé annuel', status: 'approved' },
    { id: 4, startDate: '2023-03-15', endDate: '2023-03-17', type: 'Congé maladie', status: 'approved' }
  ];

  return (
    <div>
      <h1>Tableau de bord Employé</h1>
      
      <div className="dashboard-grid">
        <div className="card">
          <h2>Solde de congés</h2>
          <div className="leave-balance">
            <div className="balance-item">
              <span>Congé annuel:</span>
              <span className="balance-value">{leaveBalance.annual} jours</span>
            </div>
            <div className="balance-item">
              <span>Congé maladie:</span>
              <span className="balance-value">{leaveBalance.sick} jours</span>
            </div>
            <div className="balance-item">
              <span>Congé exceptionnel:</span>
              <span className="balance-value">{leaveBalance.exceptional} jours</span>
            </div>
            <div className="balance-item">
              <span>Congé sans solde:</span>
              <span className="balance-value">{leaveBalance.unpaid} jours</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2>Demande de congé</h2>
          <Link to="/leave-request" className="btn btn-primary">Faire une demande</Link>
        </div>
        
        <div className="card">
          <h2>Congés à venir</h2>
          {upcomingLeaves.length > 0 ? (
            <ul className="leave-list">
              {upcomingLeaves.map(leave => (
                <li key={leave.id} className="leave-item">
                  <div>
                    <strong>{leave.type}</strong><br />
                    Du {new Date(leave.startDate).toLocaleDateString()} au {new Date(leave.endDate).toLocaleDateString()}
                  </div>
                  <span className={`status status-${leave.status}`}>
                    {leave.status === 'approved' ? 'Approuvé' : 
                     leave.status === 'rejected' ? 'Rejeté' : 'En attente'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun congé à venir</p>
          )}
        </div>
        
        <div className="card">
          <h2>Historique des demandes</h2>
          <ul className="leave-list">
            {leaveHistory.map(leave => (
              <li key={leave.id} className="leave-item">
                <div>
                  <strong>{leave.type}</strong><br />
                  Du {new Date(leave.startDate).toLocaleDateString()} au {new Date(leave.endDate).toLocaleDateString()}
                </div>
                <span className={`status status-${leave.status}`}>
                  {leave.status === 'approved' ? 'Approuvé' : 
                   leave.status === 'rejected' ? 'Rejeté' : 'En attente'}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/calendar" className="btn btn-secondary">Voir le calendrier</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployee;