import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Gestion des Congés RH. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;