import React, { useState } from 'react';

const LeaveRequestForm = ({ user }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    type: 'annual',
    reason: '',
    attachment: null
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const leaveTypes = [
    { value: 'annual', label: 'Congé annuel' },
    { value: 'sick', label: 'Congé maladie' },
    { value: 'exceptional', label: 'Congé exceptionnel' },
    { value: 'maternity', label: 'Congé maternité / paternité' },
    { value: 'unpaid', label: 'Congé sans solde' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachment: e.target.files[0]
    });
  };

  const calculateDays = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return diffDays;
    }
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.startDate || !formData.endDate) {
      setErrorMessage('Veuillez sélectionner les dates de début et de fin');
      return;
    }
    
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setErrorMessage('La date de fin doit être postérieure à la date de début');
      return;
    }
    
    // Ici, dans une vraie application, on enverrait la requête au serveur
    console.log('Demande de congé soumise:', { ...formData, userId: user.id, days: calculateDays() });
    
    setSuccessMessage('Votre demande de congé a été soumise avec succès. Elle est en attente de validation.');
    setErrorMessage('');
    
    // Réinitialiser le formulaire après soumission réussie
    if (successMessage) {
      setTimeout(() => {
        setFormData({
          startDate: '',
          endDate: '',
          type: 'annual',
          reason: '',
          attachment: null
        });
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <div className="card">
      <h2>Faire une demande de congé</h2>
      
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate" className="form-label">Date de début</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="form-input"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="endDate" className="form-label">Date de fin</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="form-input"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="type" className="form-label">Type de congé</label>
          <select
            id="type"
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
            required
          >
            {leaveTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="reason" className="form-label">Commentaire (facultatif)</label>
          <textarea
            id="reason"
            name="reason"
            className="form-input"
            rows="3"
            placeholder="Expliquez brièvement la raison de votre demande..."
            value={formData.reason}
            onChange={handleChange}
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="attachment" className="form-label">Justificatif (facultatif)</label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            className="form-input"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
        </div>
        
        <div className="form-group">
          <p>
            <strong>Nombre de jours:</strong> {calculateDays()}
          </p>
        </div>
        
        <button type="submit" className="btn btn-primary">Soumettre la demande</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;