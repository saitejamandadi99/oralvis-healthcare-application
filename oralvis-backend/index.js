const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createUserTable } = require('./models/userModels');
const {createScansTable} = require('./models/scanModel');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Initialize DB tables before server start
createUserTable().catch(err => {
  console.error('Failed to initialize database tables:', err);
  process.exit(1);
});
createScansTable().catch(err => {
  console.error('Failed to initialize database tables:', err);
  process.exit(1);
});

// check root route
app.get('/', (req, res) => {
  res.send('OralVis Backend is running.');
});

// auth routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/scansview',require('./routes/viewScansRoute'));
app.use('/api/technician', require('./routes/technicianUpload'));


// 404 handler (for unmatched routes)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
