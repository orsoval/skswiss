import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    if (onLogin(formData.email, formData.password)) {
      setError('');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="card">
      <h2>Connexion</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Se connecter</button>
      </form>
      
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        <p>Comptes de test :</p>
        <ul style={{ paddingLeft: '1rem' }}>
          <li>Employé : employee@example.com / password</li>
          <li>Manager : manager@example.com / password</li>
          <li>RH : rh@example.com / password</li>
          <li>Admin : admin@example.com / password</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;