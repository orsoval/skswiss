import React, { useState } from 'react';

const LeaveManagement = ({ user }) => {
  // Données simulées de demandes de congé
  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 1, 
      employee: 'Jean Dupont', 
      employeeId: 1, 
      department: 'IT', 
      startDate: '2023-06-15', 
      endDate: '2023-06-22', 
      type: 'annual', 
      status: 'pending', 
      reason: 'Vacances annuelles',
      days: 6
    },
    { 
      id: 2, 
      employee: 'Marie Lambert', 
      employeeId: 2, 
      department: 'Marketing', 
      startDate: '2023-07-01', 
      endDate: '2023-07-05', 
      type: 'exceptional', 
      status: 'pending', 
      reason: 'Mariage d\'un proche',
      days: 4
    },
    { 
      id: 3, 
      employee: 'Pierre Dubois', 
      employeeId: 3, 
      department: 'Finance', 
      startDate: '2023-02-20', 
      endDate: '2023-02-24', 
      type: 'sick', 
      status: 'approved', 
      reason: 'Consultation médicale',
      days: 4
    },
    { 
      id: 4, 
      employee: 'Sophie Martin', 
      employeeId: 4, 
      department: 'RH', 
      startDate: '2023-03-01', 
      endDate: '2023-03-10', 
      type: 'maternity', 
      status: 'approved', 
      reason: 'Congé maternité',
      days: 8
    }
  ]);

  // États pour le filtrage et le tri
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    type: 'all',
    employee: ''
  });

  const [sortConfig, setSortConfig] = useState({ key: 'startDate', direction: 'asc' });

  // Types de congé
  const leaveTypes = [
    { value: 'annual', label: 'Congé annuel' },
    { value: 'sick', label: 'Congé maladie' },
    { value: 'exceptional', label: 'Congé exceptionnel' },
    { value: 'maternity', label: 'Congé maternité/paternité' },
    { value: 'unpaid', label: 'Congé sans solde' }
  ];

  // Filtre des demandes
  const filteredRequests = leaveRequests.filter(request => {
    return (
      (filters.status === 'all' || request.status === filters.status) &&
      (filters.department === 'all' || request.department === filters.department) &&
      (filters.type === 'all' || request.type === filters.type) &&
      (filters.employee === '' || request.employee.toLowerCase().includes(filters.employee.toLowerCase()))
    );
  });

  // Tri des demandes
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Gestion du tri
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Fonctions de traitement des demandes
  const approveRequest = (id) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const rejectRequest = (id) => {
    setLeaveRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  // Gestion des filtres
  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  // Déterminer les actions possibles selon le rôle
  const canApproveReject = user.role === 'manager' || user.role === 'rh';

  return (
    <div className="card">
      <h2>Gestion des demandes de congé</h2>
      
      {/* Filtres */}
      <div className="filters">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Statut</label>
            <select 
              className="form-select" 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvés</option>
              <option value="rejected">Rejetés</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Département</label>
            <select 
              className="form-select" 
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
            >
              <option value="all">Tous les départements</option>
              <option value="IT">IT</option>
              <option value="RH">RH</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Type de congé</label>
            <select 
              className="form-select" 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">Tous les types</option>
              {leaveTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Employé</label>
            <input
              type="text"
              className="form-input"
              placeholder="Rechercher un employé..."
              value={filters.employee}
              onChange={(e) => handleFilterChange('employee', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Tableau des demandes */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => requestSort('employee')} className="sortable">
                Employé {sortConfig.key === 'employee' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : null}
              </th>
              <th onClick={() => requestSort('department')} className="sortable">
                Département {sortConfig.key === 'department' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : null}
              </th>
              <th onClick={() => requestSort('type')} className="sortable">
                Type {sortConfig.key === 'type' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : null}
              </th>
              <th onClick={() => requestSort('startDate')} className="sortable">
                Dates {sortConfig.key === 'startDate' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : null}
              </th>
              <th onClick={() => requestSort('days')} className="sortable">
                Jours {sortConfig.key === 'days' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : null}
              </th>
              <th onClick={() => requestSort('status')} className="sortable">
                Statut {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : null}
              </th>
              <th>Raison</th>
              {canApproveReject && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedRequests.length > 0 ? (
              sortedRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.employee}</td>
                  <td>{request.department}</td>
                  <td>
                    {leaveTypes.find(t => t.value === request.type)?.label || request.type}
                  </td>
                  <td>
                    {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                  </td>
                  <td>{request.days}</td>
                  <td>
                    <span className={`status status-${request.status}`}>
                      {request.status === 'approved' ? 'Approuvé' : 
                       request.status === 'rejected' ? 'Rejeté' : 'En attente'}
                    </span>
                  </td>
                  <td>{request.reason}</td>
                  {canApproveReject && (
                    <td>
                      {request.status === 'pending' ? (
                        <div className="action-buttons">
                          <button 
                            onClick={() => approveRequest(request.id)} 
                            className="btn btn-success"
                            disabled={user.role !== 'manager' && user.role !== 'rh'}
                          >
                            Approuver
                          </button>
                          <button 
                            onClick={() => rejectRequest(request.id)} 
                            className="btn btn-danger"
                            disabled={user.role !== 'manager' && user.role !== 'rh'}
                          >
                            Rejeter
                          </button>
                        </div>
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={canApproveReject ? 8 : 7}>Aucune demande de congé trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Résumé des statistiques */}
      <div className="summary-stats">
        <div className="stat-item">
          <span>Total demandes:</span>
          <strong>{leaveRequests.length}</strong>
        </div>
        <div className="stat-item">
          <span>En attente:</span>
          <strong>{leaveRequests.filter(r => r.status === 'pending').length}</strong>
        </div>
        <div className="stat-item">
          <span>Approuvées:</span>
          <strong>{leaveRequests.filter(r => r.status === 'approved').length}</strong>
        </div>
        <div className="stat-item">
          <span>Rejetées:</span>
          <strong>{leaveRequests.filter(r => r.status === 'rejected').length}</strong>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;