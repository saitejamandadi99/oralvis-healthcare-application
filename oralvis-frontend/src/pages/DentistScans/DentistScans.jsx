import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import './DentistScans.css';

const DentistScans = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScans = async () => {
      setLoading(true);
      setError(null);

      const token = cookie.get('token');
      if (!token) {
        setError('You are not authenticated.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/scansview/viewScans', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setScans(response.data.scans);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch scans.');
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  if (loading) {
    return <div className="loading">Loading scans...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (scans.length === 0) {
    return <div className="no-scans">No scans found.</div>;
  }

  return (
    <div className="dentist-scans-container">
      <h2>Dentist Scans</h2>
      <div className="scans-grid">
        {scans.map((scan, index) => (
          <div className="scan-card" key={scan.id || index}>
            <img
              src={scan.imageUrl}
              alt={`Scan of ${scan.patientName}`}
              className="scan-image"
              loading="lazy"
            />
            <div className="scan-info">
              <p><strong>Patient Name:</strong> {scan.patientName}</p>
              <p><strong>Patient ID:</strong> {scan.patientId}</p>
              <p><strong>Scan Type:</strong> {scan.scanType}</p>
              <p><strong>Region:</strong> {scan.region}</p>
              <p><strong>Uploaded on:</strong> {new Date(scan.uploadDate).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DentistScans;
