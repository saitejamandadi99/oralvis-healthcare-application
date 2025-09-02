import { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import "./TechnicianDashboard.css";

const TechnicianDashboard = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    scanType: "",
    region: "",
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!file) {
      setMessage("Please choose an image file.");
      return;
    }
    setIsLoading(true);
    try {
      const token = cookie.get("token");
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));
      data.append("image", file);

      const response = await axios.post(
        "http://localhost:5000/api/technician/upload",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Upload successful!");
      setFormData({
        patientName: "",
        patientId: "",
        scanType: "",
        region: "",
      });
      setFile(null);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Upload failed or not authorized."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tech-upload-container">
      <h2>Upload Patient Scan</h2>
      <form className="tech-upload-form" onSubmit={handleSubmit}>
        <label>Patient Name</label>
        <input
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
        />

        <label>Patient ID</label>
        <input
          name="patientId"
          value={formData.patientId}
          onChange={handleChange}
          required
        />

        <label>Scan Type</label>
        <select
          name="scanType"
          value={formData.scanType}
          onChange={handleChange}
          required
        >
          <option value="">Select Scan Type</option>
          <option value="MRI">MRI</option>
          <option value="CT">CT</option>
          <option value="X-Ray">X-Ray</option>
        </select>

        <label>Region</label>
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        >
          <option value="">Select Region</option>
          <option value="Head">Head</option>
          <option value="Neck">Neck</option>
          <option value="Teeth">Teeth</option>
        </select>

        <label>Scan Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </button>

        {message && <div className="message">{message}</div>}
      </form>
    </div>
  );
};

export default TechnicianDashboard;
