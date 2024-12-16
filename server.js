const express = require('express');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables
require('dotenv').config();

// Connect to PostgreSQL (Neon.tech)
const client = new Client({
  connectionString: process.env.postgresql://test_owner:YCGHDBngd5w7@ep-sparkling-water-a103x2tc.ap-southeast-1.aws.neon.tech/test?sslmode=require,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Sample endpoint to get clinics (no coordinates, just return all clinics)
app.get('/api/vets', async (req, res) => {
  try {
    const result = await client.query('SELECT name, address, services, ratings FROM clinics');
    res.json(result.rows);  // Return the clinics data
  } catch (err) {
    console.error('Error fetching data', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
