import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ currentUser, onLogout }) => {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo">Gestion des Congés RH</div>
        
        <nav>
          <ul className="nav-menu">
            {currentUser ? (
              <>
                <li><Link to="/">Accueil</Link></li>
                <li><Link to="/leave-request">Demander un congé</Link></li>
                <li><Link to="/calendar">Calendrier</Link></li>
                {(currentUser.role === 'manager' || currentUser.role === 'rh') && (
                  <li><Link to="/leave-management">Gestion des congés</Link></li>
                )}
              </>
            ) : (
              <li><Link to="/login">Connexion</Link></li>
            )}
          </ul>
        </nav>
        
        {currentUser && (
          <div className="user-info">
            <span>Bonjour, {currentUser.name}</span>
            <button onClick={onLogout} className="btn btn-danger">Déconnexion</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;