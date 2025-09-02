const express = require('express');
const { authenticateTechnician } = require('../middleware/authMiddleware');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const db = require('../config/database'); // Turso client

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post('/upload', authenticateTechnician, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image file uploaded.' });

    // Cloudinary upload
    const uploadResult = await new Promise((resolve, reject) =>
      cloudinary.uploader.upload_stream(
        { folder: 'oralvis_scans', resource_type: 'image' },
        (error, result) => (error ? reject(error) : resolve(result))
      ).end(req.file.buffer)
    );

    const { patientName, patientId, scanType, region } = req.body;
    const imageUrl = uploadResult.secure_url;

    // Insert scan into Turso
    await db.execute({
      sql: `
        INSERT INTO scans (patientName, patientId, scanType, region, imageUrl, uploadDate)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `,
      args: [patientName, patientId, scanType, region, imageUrl],
    });

    res.status(201).json({ message: 'Scan uploaded successfully.', imageUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error during scan upload.' });
  }
});

module.exports = router;
