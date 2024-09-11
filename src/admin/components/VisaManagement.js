import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/VisaManagement.css';

const VisaManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5000/api/admin/visa-applications', {
        headers: { 'x-auth-token': token }
      });
      setApplications(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching visa applications:', err);
      setError('Error fetching visa applications');
      setLoading(false);
    }
  };

  const handleStatusChange = async (caseId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5000/api/admin/visa-applications/${caseId}`, 
        { status: newStatus },
        { headers: { 'x-auth-token': token } }
      );
      fetchApplications(); // Refresh the list after updating
    } catch (err) {
      console.error('Error updating visa application status:', err);
      setError('Error updating visa application status');
    }
  };

  const viewDocuments = (app) => {
    setSelectedApp(app);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="visa-management">
      <h2>Visa Applications Management</h2>
      <table>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Applicant Name</th>
            <th>Visa Type</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.caseId}>
              <td>{app.caseId}</td>
              <td>{`${app.firstName} ${app.lastName}`}</td>
              <td>{app.visaType}</td>
              <td>{new Date(app.submissionDate).toLocaleDateString()}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => handleStatusChange(app.caseId, 'approved')} 
                        disabled={app.status === 'approved'}>
                  Approve
                </button>
                <button onClick={() => handleStatusChange(app.caseId, 'rejected')}
                        disabled={app.status === 'rejected'}>
                  Reject
                </button>
                <button onClick={() => viewDocuments(app)}>View Documents</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApp && (
        <div className="document-modal">
          <div className="document-modal-content">
            <h3>Documents for {selectedApp.firstName} {selectedApp.lastName}</h3>
            <ul>
              {selectedApp.passportCopy && (
                <li><a href={`http://localhost:5000/${selectedApp.passportCopy}`} target="_blank" rel="noopener noreferrer">Passport Copy</a></li>
              )}
              {selectedApp.photo && (
                <li><a href={`http://localhost:5000/${selectedApp.photo}`} target="_blank" rel="noopener noreferrer">Photo</a></li>
              )}
              {selectedApp.invitationLetter && (
                <li><a href={`http://localhost:5000/${selectedApp.invitationLetter}`} target="_blank" rel="noopener noreferrer">Invitation Letter</a></li>
              )}
              {selectedApp.financialProof && (
                <li><a href={`http://localhost:5000/${selectedApp.financialProof}`} target="_blank" rel="noopener noreferrer">Financial Proof</a></li>
              )}
            </ul>
            <button onClick={() => setSelectedApp(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaManagement;