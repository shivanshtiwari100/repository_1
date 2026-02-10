const express = require('express');
const cors = require('cors');
const { fibonacci, getPrimes, getLCM, getHCF } = require('./functions');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini AI setup
let model = null;

function initGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('⚠ GEMINI_API_KEY not set (AI endpoint will not work)');
    return;
  }
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    console.log('✓ Gemini API initialized');
  } catch (err) {
    console.log('⚠ Gemini not available:', err.message);
  }
}

initGemini();

const OFFICIAL_EMAIL = 'YOUR CHITKARA EMAIL';

// GET /health
app.get('/health', (req, res) => {
  try {
    res.json({
      is_success: true,
      official_email: OFFICIAL_EMAIL
    });
  } catch (err) {
    res.status(500).json({ is_success: false, official_email: OFFICIAL_EMAIL });
  }
});

// POST /bhfl
app.post('/bhfl', async (req, res) => {
  try {
    const body = req.body || {};
    const { fibonacci: fibNum, prime: primeArr, lcm: lcmArr, hcf: hcfArr, AI: aiQuestion } = body;

    // Count how many operations are provided
    let count = 0;
    if (fibNum !== undefined && fibNum !== null) count++;
    if (primeArr !== undefined && primeArr !== null) count++;
    if (lcmArr !== undefined && lcmArr !== null) count++;
    if (hcfArr !== undefined && hcfArr !== null) count++;
    if (aiQuestion !== undefined && aiQuestion !== null) count++;

    if (count === 0 || count > 1) {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL
      });
    }

    // Fibonacci
    if (fibNum !== undefined && fibNum !== null) {
      if (typeof fibNum !== 'number' || fibNum < 0) {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      const result = fibonacci(fibNum);
      return res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data: result });
    }

    // Prime
    if (primeArr !== undefined && primeArr !== null) {
      if (!Array.isArray(primeArr)) {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      const result = getPrimes(primeArr);
      return res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data: result });
    }

    // LCM
    if (lcmArr !== undefined && lcmArr !== null) {
      if (!Array.isArray(lcmArr) || lcmArr.length === 0) {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      const result = getLCM(lcmArr);
      return res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data: result });
    }

    // HCF
    if (hcfArr !== undefined && hcfArr !== null) {
      if (!Array.isArray(hcfArr) || hcfArr.length === 0) {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      const result = getHCF(hcfArr);
      return res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data: result });
    }

    // AI (Gemini)
    if (aiQuestion !== undefined && aiQuestion !== null) {
      if (typeof aiQuestion !== 'string') {
        return res.status(400).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      if (!model) {
        return res.status(500).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
      try {
        const response = await model.generateContent(aiQuestion);
        const aiResponse = response.response.text();
        const firstWord = aiResponse.split(' ')[0];
        return res.json({ is_success: true, official_email: OFFICIAL_EMAIL, data: firstWord });
      } catch (aiErr) {
        console.error('Gemini error:', aiErr.message);
        return res.status(500).json({ is_success: false, official_email: OFFICIAL_EMAIL });
      }
    }
  } catch (err) {
    console.error('POST /bhfl error:', err.message);
    res.status(500).json({ is_success: false, official_email: OFFICIAL_EMAIL });
  }
});

app.listen(PORT, () => {
  console.log(`✓ API Server running on http://localhost:${PORT}`);
  console.log(`✓ GET http://localhost:${PORT}/health`);
  console.log(`✓ POST http://localhost:${PORT}/bhfl`);
});
