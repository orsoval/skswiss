import React, { useState } from 'react';

const LeaveCalendar = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, year
  
  // Données simulées de congés
  const leaveData = [
    { id: 1, employee: 'Jean Dupont', startDate: '2023-02-15', endDate: '2023-02-20', type: 'annual', status: 'approved' },
    { id: 2, employee: 'Marie Lambert', startDate: '2023-02-18', endDate: '2023-02-25', type: 'exceptional', status: 'pending' },
    { id: 3, employee: 'Pierre Dubois', startDate: '2023-02-22', endDate: '2023-02-24', type: 'sick', status: 'approved' },
    { id: 4, employee: 'Sophie Martin', startDate: '2023-03-01', endDate: '2023-03-10', type: 'maternity', status: 'approved' }
  ];

  // Navigation dans le calendrier
  const goToPrevious = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    } else if (view === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - 7);
      setCurrentDate(newDate);
    } else {
      setCurrentDate(new Date(currentDate.getFullYear() - 1, 1, 1));
    }
  };

  const goToNext = () => {
    if (view === 'month') {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    } else if (view === 'week') {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + 7);
      setCurrentDate(newDate);
    } else {
      setCurrentDate(new Date(currentDate.getFullYear() + 1, 1, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Générer les jours du mois
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Ajouter les jours du mois précédent qui sont visibles dans le calendrier
    const firstDayOfWeek = date.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      days.push({
        date: new Date(year, month - 1, day),
        isCurrentMonth: false
      });
    }
    
    // Ajouter les jours du mois courant
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Ajouter les jours du mois suivant qui sont visibles dans le calendrier
    const remainingDays = 42 - days.length; // 6 lignes x 7 jours
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  // Obtenir les congés pour une date spécifique
  const getLeavesForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return leaveData.filter(leave => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      return date >= start && date <= end;
    });
  };

  // Afficher le calendrier mensuel
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = getDaysInMonth(year, month);
    const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="calendar-weekdays">
            {weekdays.map(day => (
              <div key={day} className="calendar-weekday">{day}</div>
            ))}
          </div>
        </div>
        
        <div className="calendar-grid">
          {days.map((day, index) => {
            const leaves = getLeavesForDate(day.date);
            const isToday = day.date.toDateString() === new Date().toDateString();
            
            return (
              <div 
                key={index} 
                className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
              >
                <div className="day-number">{day.date.getDate()}</div>
                <div className="day-leaves">
                  {leaves.slice(0, 2).map(leave => (
                    <div 
                      key={leave.id} 
                      className={`leave-indicator ${leave.status}`}
                      title={`${leave.employee} - ${leave.type}`}
                    ></div>
                  ))}
                  {leaves.length > 2 && (
                    <div className="more-indicator">+{leaves.length - 2}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Filtres
  const [filters, setFilters] = useState({
    employee: '',
    department: '',
    type: '',
    status: ''
  });

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  return (
    <div className="card">
      <h2>Calendrier des congés</h2>
      
      {/* Contrôles du calendrier */}
      <div className="calendar-controls">
        <div className="calendar-nav">
          <button onClick={goToPrevious} className="btn btn-secondary">&lt;</button>
          <button onClick={goToToday} className="btn btn-secondary">Aujourd'hui</button>
          <button onClick={goToNext} className="btn btn-secondary">&gt;</button>
        </div>
        
        <div className="calendar-title">
          {currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}
        </div>
        
        <div className="calendar-view-selector">
          <button 
            className={`btn ${view === 'month' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('month')}
          >
            Mois
          </button>
          <button 
            className={`btn ${view === 'week' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('week')}
          >
            Semaine
          </button>
          <button 
            className={`btn ${view === 'year' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setView('year')}
          >
            Année
          </button>
        </div>
      </div>
      
      {/* Filtres */}
      <div className="filters">
        <div className="form-group">
          <label className="form-label">Employé</label>
          <select 
            className="form-select" 
            value={filters.employee}
            onChange={(e) => handleFilterChange('employee', e.target.value)}
          >
            <option value="">Tous les employés</option>
            <option value="Jean Dupont">Jean Dupont</option>
            <option value="Marie Lambert">Marie Lambert</option>
            <option value="Pierre Dubois">Pierre Dubois</option>
            <option value="Sophie Martin">Sophie Martin</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Département</label>
          <select 
            className="form-select" 
            value={filters.department}
            onChange={(e) => handleFilterChange('department', e.target.value)}
          >
            <option value="">Tous les départements</option>
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
            <option value="">Tous les types</option>
            <option value="annual">Congé annuel</option>
            <option value="sick">Congé maladie</option>
            <option value="exceptional">Congé exceptionnel</option>
            <option value="maternity">Congé maternité/paternité</option>
            <option value="unpaid">Congé sans solde</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Statut</label>
          <select 
            className="form-select" 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="approved">Approuvé</option>
            <option value="pending">En attente</option>
            <option value="rejected">Rejeté</option>
          </select>
        </div>
      </div>
      
      {/* Affichage du calendrier */}
      <div className="calendar">
        {view === 'month' && renderMonthView()}
        {view === 'week' && <div className="calendar-week-view">Affichage hebdomadaire</div>}
        {view === 'year' && <div className="calendar-year-view">Affichage annuel</div>}
      </div>
    </div>
  );
};

export default LeaveCalendar;