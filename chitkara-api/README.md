# Chitkara REST API – Backend Only

## Overview
A pure REST API with Node.js + Express that implements 5 mathematical and AI functions:
- **Fibonacci**: Generate first N Fibonacci numbers
- **Prime**: Extract primes from an array
- **LCM**: Calculate least common multiple
- **HCF**: Calculate highest common factor (GCD)
- **AI**: Integrate Google Gemini API for question answering

Test with **Postman**, **ThunderClient**, **curl**, or any HTTP client.

## API Endpoints

### GET /health
Returns success response to confirm server is running.

**Response:**
```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL"
}
```

### POST /bhfl
Universal endpoint for all 5 functions. Send exactly ONE of these keys in the body:

| Key | Input Type | Output |
|-----|-----------|--------|
| `fibonacci` | Integer (N) | Array of first N Fibonacci numbers |
| `prime` | Integer array | Filtered array of primes (sorted) |
| `lcm` | Integer array | Single LCM value |
| `hcf` | Integer array | Single HCF value |
| `AI` | String (question) | Single-word AI response |

**Response Format (Success):**
```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": <result>
}
```

**Error Response:**
```json
{
  "is_success": false,
  "official_email": "YOUR CHITKARA EMAIL"
}
```

## Setup & Run

### Installation
```powershell
cd "c:\Users\Shivansh Tiwari\Desktop\Project\chitkara-api\server"
npm install
```

### Start Server
```powershell
npm start
```

Server will run on: **http://localhost:3000**

### With Gemini AI (Optional)
To enable the AI endpoint, set the `GEMINI_API_KEY` environment variable first:

```powershell
$env:GEMINI_API_KEY="your-api-key-here"
npm start
```

## Testing with Postman / ThunderClient / curl

### 1. Health Check
```
GET http://localhost:3000/health
```

### 2. Fibonacci (7 terms)
```
POST http://localhost:3000/bhfl
Content-Type: application/json

{
  "fibonacci": 7
}
```

**Expected Response:**
```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

### 3. Prime Numbers
```
POST http://localhost:3000/bhfl
Content-Type: application/json

{
  "prime": [2, 4, 7, 9, 11]
}
```

**Expected Response:**
```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": [2, 7, 11]
}
```

### 4. LCM (Least Common Multiple)
```
POST http://localhost:3000/bhfl
Content-Type: application/json

{
  "lcm": [12, 18, 24]
}
```

**Expected Response:**
```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": 72
}
```

### 5. HCF (Highest Common Factor / GCD)
```
POST http://localhost:3000/bhfl
Content-Type: application/json

{
  "hcf": [24, 36, 60]
}
```

**Expected Response:**
```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": 12
}
```

### 6. AI Question (Requires Gemini API Key)
```
POST http://localhost:3000/bhfl
Content-Type: application/json

{
  "AI": "What is the capital city of Maharashtra?"
}
```

**Expected Response:**
```json
{
  "is_success": true,
  "official_email": "YOUR CHITKARA EMAIL",
  "data": "Mumbai"
}
```

## curl Examples (PowerShell)

```powershell
# Health check
Invoke-WebRequest -Uri "http://localhost:3000/health" -Method GET

# Fibonacci
$body = @{ fibonacci = 7 } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/bhfl" -Method POST -Body $body -ContentType "application/json"

# Prime numbers
$body = @{ prime = @(2, 4, 7, 9, 11) } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/bhfl" -Method POST -Body $body -ContentType "application/json"

# LCM
$body = @{ lcm = @(12, 18, 24) } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/bhfl" -Method POST -Body $body -ContentType "application/json"

# HCF
$body = @{ hcf = @(24, 36, 60) } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/bhfl" -Method POST -Body $body -ContentType "application/json"

# AI (with Gemini key set)
$body = @{ AI = "What is the capital of Maharashtra?" } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:3000/bhfl" -Method POST -Body $body -ContentType "application/json"
```

## Get Google Gemini API Key
1. Visit https://aistudio.google.com
2. Sign in with your Google account
3. Click **Get API Key** in left sidebar
4. Create API key in project
5. Copy the key and set as environment variable before running the server

## Project Structure
```
chitkara-api/
└── server/
    ├── package.json       (dependencies)
    ├── index.js           (Express API server)
    ├── functions.js       (Business logic: fibonacci, prime, lcm, hcf)
    └── README.md
```

## Error Handling
- Invalid input: Returns `is_success: false` with HTTP 400
- More than one function per request: Returns error
- Gemini key not set: AI endpoint returns HTTP 500

## Notes
- All successful responses include `official_email` field
- Request must contain exactly ONE function key
- Error responses do NOT include `data` field
