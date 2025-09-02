import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // optional, if you want tables
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
          headers: { Authorization: `Bearer ${token}` },
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

  const handleViewImage = (url) => {
    window.open(url, '_blank');
  };

  const handleDownloadPDF = async (scan) => {
    const { patientName, patientId, scanType, region, uploadDate, imageUrl } = scan;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Patient Scan Report', 14, 20);

    doc.setFontSize(12);
    doc.text(`Patient Name: ${patientName}`, 14, 40);
    doc.text(`Patient ID: ${patientId}`, 14, 48);
    doc.text(`Scan Type: ${scanType}`, 14, 56);
    doc.text(`Region: ${region}`, 14, 64);
    doc.text(`Uploaded on: ${new Date(uploadDate).toLocaleDateString()}`, 14, 72);

    // Load image and embed it in PDF
    const imgProps = await new Promise((resolve) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const width = 170;
        const ratio = img.width / img.height;
        const height = width / ratio;
        resolve({ img, width, height });
      };
    });

    doc.addImage(imgProps.img, 'JPEG', 14, 85, imgProps.width, imgProps.height);

    doc.save(`scan-report-${patientId}.pdf`);
  };

  if (loading) return <div className="loading">Loading scans...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (scans.length === 0) return <div className="no-scans">No scans found.</div>;

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
              <p><strong>Uploaded on:</strong> {new Date(scan.uploadDate).toLocaleDateString()}</p>
            </div>
            <div className="scan-actions">
              <button
                className="btn btn-primary"
                onClick={() => handleViewImage(scan.imageUrl)}
              >
                View Full Image
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleDownloadPDF(scan)}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DentistScans;
