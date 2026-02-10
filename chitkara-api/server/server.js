const express = require('express');
const cors = require('cors');
const { fibonacci, getPrimes, getLCM, getHCF } = require('./functions');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

const OFFICIAL_EMAIL = 'YOUR CHITKARA EMAIL';

// GET /health
app.get('/health', (req, res) => {
  res.json({ is_success: true, official_email: OFFICIAL_EMAIL });
});

// POST /bhfl
app.post('/bhfl', (req, res) => {
  try {
    const { fibonacci: fibNum, prime: primeArr, lcm: lcmArr, hcf: hcfArr, AI: aiQuestion } = req.body || {};

    let count = 0;
    if (fibNum !== undefined && fibNum !== null) count++;
    if (primeArr !== undefined && primeArr !== null) count++;
    if (lcmArr !== undefined && lcmArr !== null) count++;
    if (hcfArr !== undefined && hcfArr !== null) count++;
    if (aiQuestion !== undefined && aiQuestion !== null) count++;

    if (count !== 1) {
      return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
    }

    if (fibNum !== undefined && fibNum !== null) {
      if (typeof fibNum !== 'number' || fibNum < 0) {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      return res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data: fibonacci(fibNum) });
    }

    if (primeArr !== undefined && primeArr !== null) {
      if (!Array.isArray(primeArr)) {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      return res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data: getPrimes(primeArr) });
    }

    if (lcmArr !== undefined && lcmArr !== null) {
      if (!Array.isArray(lcmArr) || lcmArr.length === 0) {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      return res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data: getLCM(lcmArr) });
    }

    if (hcfArr !== undefined && hcfArr !== null) {
      if (!Array.isArray(hcfArr) || hcfArr.length === 0) {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      return res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data: getHCF(hcfArr) });
    }

    if (aiQuestion !== undefined && aiQuestion !== null) {
      if (typeof aiQuestion !== 'string') {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      return res.status(500).json({ is_success: false, official_email: OFFICIAL_EMAIL });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ is_success: false, official_email: OFFICIAL_EMAIL });
  }
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('REJECTION:', reason);
  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ GET /health`);
  console.log(`✓ POST /bhfl`);
});

server.on('error', (err) => {
  console.error('SERVER ERROR:', err);
});

// Keep server alive
setInterval(() => {}, 1000);
